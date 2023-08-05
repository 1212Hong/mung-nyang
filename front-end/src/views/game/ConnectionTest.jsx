import React, { useState, useEffect } from "react";
import VideoComponent from "../../components/VideoBoxing";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import {
    Container,
    ContainerBody,
    HeaderBox,
    LeftBox,
    RightBox,
    MicBar,
    MicBox,
    VolumeSlider,
    CameraIconWrapper,
    EmptyScreen,
    FooterBox,
    NickName,
    TestButtonWrapper,
    SettingIcon,
    CameraIcon,
    CameraOffIcon,
} from "../../components/layout/connectionTest";
import { useDispatch, useSelector } from "react-redux";
import { changePhase } from "../../store/phaseSlice";
import { OpenVidu } from "openvidu-browser";
import Error from "../Error";

const TestSound = require("../../assets/audio/test_sound.mp3");

function Switch({ isOn, onToggle }) {
    return (
        <motion.div layout onClick={onToggle}>
            <AnimatePresence initial={false} mode="wait">
                <CameraIconWrapper>
                    {isOn ? (
                        <CameraIcon width="100" height="100" />
                    ) : (
                        <CameraOffIcon width="100" height="100" />
                    )}
                </CameraIconWrapper>
            </AnimatePresence>
        </motion.div>
    );
}

function ConnectionTest() {
    const [micVolumeValue, setMicVolumeValue] = useState(0);
    const [outputVolumeValue, setOutputVolumeValue] = useState(50); // 출력 볼륨 상태 추가
    const [isOn, setIsOn] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const {
        // OV,
        session,
        subscribers,
        myUserName,
        mySessionId,
        mainStreamManager,
        currentVideoDevice,
        token,
    } = openvidu;
    // console.log(openvidu);
    const [OV, setOV] = useState();
    const [state, setState] = useState({
        mySessionId: mySessionId,
        myUserName: myUserName,
        session: session,
        mainStreamManager: mainStreamManager, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
        publisher: undefined,
        subscribers: [],
    });

    const joinSession = () => {
        const newOV = new OpenVidu();
        newOV.enableProdMode();

        const newSession = newOV.initSession();

        setOV(newOV);
        setState({
            ...state,
            OV: newOV,
            session: newSession,
        });

        const connection = () => {
            if (token) {
                // 1. connection 메소드 내부에 이벤트 수신 처리
                // 1-1 session에 참여한 사용자 추가
                console.log(token);
                newSession.on("streamCreated", (event) => {
                    const newSubscriber = newSession.subscribe(
                        event.stream,
                        JSON.parse(event.stream.connection.data).clientData,
                    );

                    const newSubscribers = subscribers;
                    newSubscribers.push(newSubscriber);
                    console.log(newSubscriber);
                    setState({
                        ...state,
                        subscribers: [...newSubscribers],
                    });
                });
                // 1-2 session에서 disconnect한 사용자 삭제
                // newSession.on("streamDestroyed", (event) => {
                //     if (event.stream.typeOfVideo === "CUSTOM") {
                //         deleteSubscriber(event.stream.streamManager);
                //     } else {
                //         setDestroyedStream(event.stream.streamManager);
                //         setCheckMyScreen(true);
                //     }
                // });
                // 1-3 예외처리
                newSession.on("exception", (exception) => {
                    console.warn(exception);
                });
                newSession
                    .connect(token, {
                        clientData: myUserName,
                    })
                    .then(async () => {
                        newOV
                            .getUserMedia({
                                audioSource: false,
                                videoSource: undefined,
                                resolution: "1280x720",
                                frameRate: 10,
                            })
                            .then((mediaStream) => {
                                var videoTrack =
                                    mediaStream.getVideoTracks()[0];
                                // Obtain the current video device in use

                                var newPublisher = newOV.initPublisher(
                                    myUserName,
                                    {
                                        audioSource: undefined,
                                        videoSource: videoTrack,
                                        publishAudio: true,
                                        publishVideo: true,
                                        // resolution: '1280x720',
                                        // frameRate: 10,
                                        insertMode: "APPEND",
                                        mirror: true,
                                    },
                                );
                                // 4-c publish
                                newPublisher.once("accessAllowed", () => {
                                    newSession.publish(newPublisher);
                                    setState({
                                        ...state,
                                        publisher: newPublisher,
                                    });
                                });
                            })
                            .catch((error) => {
                                console.warn(
                                    "There was an error connecting to the session:",
                                    error.code,
                                    error.message,
                                );
                            });
                    });
            }
        };
        connection();
    };

    const handleGoWaitingRoom = () => {
        dispatch(changePhase({ phaseType: "Wait" }));
        joinSession();
        console.log(mySessionId);
    };

    const audioRef = React.createRef();
    const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

    function handleTestButtonClick() {
        setIsPlaying(true);
        audioRef.current.play();

        if (audioContext.state === "suspended") {
            audioContext.resume().then(() => {
                console.log("AudioContext is resumed!");
            });
        }
    }

    function handleToggle() {
        setIsOn(!isOn);
    }

    useEffect(() => {
        updateMicVolume();
    }, []);

    function updateMicVolume() {
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);

                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                function update() {
                    analyser.getByteFrequencyData(dataArray);
                    let sum = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        sum += dataArray[i];
                    }
                    let micVolume = sum / dataArray.length;
                    micVolume = Math.min(Math.max(micVolume, 0), 100);
                    micVolume = Math.round(micVolume);
                    micVolume = micVolume || 1;
                    setMicVolumeValue(micVolume);
                    requestAnimationFrame(update);
                }

                update();
            })
            .catch((error) => {
                console.error("마이크 접근 에러:", error);
            });
    }

    useEffect(() => {
        function requestMicPermission() {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    updateMicVolume();
                })
                .catch((error) => {
                    console.error("마이크 접근 에러:", error);
                });
        }
        requestMicPermission();
    }, []);

    function updateOutputVolume(newVolume) {
        setOutputVolumeValue(newVolume);

        const audioElement = document.querySelector("audio");
        if (audioElement) {
            const volume = newVolume / 100;
            audioElement.volume = volume;
        } else {
            console.error("스피커 접근 에러");
        }
    }

    function handleVolumeChange(event) {
        const newOutputVolume = parseInt(event.target.value);
        updateOutputVolume(newOutputVolume);
    }
    return (
        <>
            {mySessionId ? (
                <Container>
                    <HeaderBox>
                        <SettingIcon width="50" height="50" />
                    </HeaderBox>
                    <ContainerBody>
                        <LeftBox className="LeftBox">
                            {isOn ? (
                                <EmptyScreen />
                            ) : (
                                <VideoComponent width="450" height="450" />
                            )}
                            <br />
                            <Switch isOn={isOn} onToggle={handleToggle} />
                        </LeftBox>
                        <RightBox>
                            <h3>마이크 선택</h3>
                            <MicBox />
                            <h3>입력확인</h3>
                            <MicBar volume={micVolumeValue / 100} />
                            <h3>스피커</h3>
                            <MicBox />
                            <h3>출력조절 : {outputVolumeValue}</h3>
                            <VolumeSlider
                                type="range"
                                min="0"
                                max="100"
                                value={outputVolumeValue}
                                onChange={handleVolumeChange}
                                color="black"
                            />
                            <TestButtonWrapper>
                                <Button
                                    text="테스트"
                                    width="200px"
                                    onClick={handleTestButtonClick}
                                    className="testBtn"
                                    background={`var(--dusty-pink-white)`}
                                    fontColor={`var(--black)`}
                                />
                            </TestButtonWrapper>
                            <h3>소리변조 테스트</h3>
                            {/* <Button
                        isOn={isOn}
                        onToggle={handleToggle}
                        text="임시"
                        width="100px"
                    /> */}
                            <FooterBox>
                                <NickName />
                                <Button
                                    width="150px"
                                    height="80px"
                                    onClick={() => {
                                        handleGoWaitingRoom();
                                    }}
                                    background={`var(--dusty-pink-white)`}
                                    fontColor={`var(--black)`}
                                >
                                    입장
                                </Button>
                            </FooterBox>
                        </RightBox>
                        <audio ref={audioRef} src={TestSound} loop={false} />
                    </ContainerBody>
                </Container>
            ) : (
                <Error />
            )}
        </>
    );
}

export default ConnectionTest;
