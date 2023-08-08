import React, { useState, useEffect, useRef } from "react";
import VideoComponent from "../../components/VideoComponent";
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../Error";
import Input from "../../components/Input";
import VideoDeviceSelector from "../../components/deviceSelect/VideoDeviceSelector";

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
    const mySessionId = useSelector((state) => state.openvidu.mySessionId);
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    // 사용자 제스처와 연관된 플래그
    const [userGesturePerformed, setUserGesturePerformed] = useState(false);

    const handleGoWaitingRoom = () => {
        navigate("/game");
        console.log(mySessionId);
    };

    function handleToggle() {
        setIsOn(!isOn);
    }

    useEffect(() => {
        // AudioContext 생성
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        // 마이크 볼륨 업데이트
        updateMicVolume();

        return () => {
            // 컴포넌트가 언마운트될 때 AudioContext 정리
            audioContext.close().then(() => {
                console.log("AudioContext is closed!");
            });
        };
    }, []);

    function updateMicVolume() {
        const analyser = audioContextRef.current.createAnalyser();
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const source =
                    audioContextRef.current.createMediaStreamSource(stream);
                source.connect(analyser);

                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                function update() {
                    analyser.getByteFrequencyData(dataArray);
                    let sum = dataArray.reduce((acc, val) => acc + val, 0);
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

    function handleTestButtonClick() {
        setIsPlaying(true);
        audioRef.current.play();

        // 사용자 제스처와 연관된 부분에서 AudioContext 생성
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        audioRef.current.play().then(() => {
            // 사용자 제스처와 연관된 부분에서 setUserGesturePerformed를 true로 설정
            setUserGesturePerformed(true);

            // 사용자 제스처와 연관된 부분에서 AudioContext가 이미 시작되어 있을 수 있으므로 상태를 확인합니다.
            if (audioContext.state === "suspended") {
                audioContext.resume().then(() => {
                    console.log("AudioContext is resumed!");
                });
            }
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
                            <VideoDeviceSelector
                                onDeviceSelected={(selectedDevice) =>
                                    console.log(selectedDevice)
                                }
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
                                <NickName></NickName>
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
