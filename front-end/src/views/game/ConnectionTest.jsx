import React, { useState, useEffect, useRef } from "react";
import VideoComponent from "../../components/VideoComponent";
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
    EmptyScreen,
    NickName,
    FlexRowBox,
    SettingIcon,
    RefreshIcon,
    RightItem,
    DescBox,
} from "../../components/layout/connectionTest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../Error";
import Input from "../../components/Input";
import VideoDeviceSelector from "../../components/test/VideoDeviceSelector";
import { getNickname } from "../../api/room";
import Switch from "../../components/test/Switch";
import { MidText } from "../../components/layout/common";
import { ovActions } from "../../store/openviduSlice";
import { enterGameRoom } from "../../hooks/testView";
import Loading from "../Loading";
import { ReactComponent as RefreshIconO } from "../../assets/img/icon _refresh_circle_.svg";
import { ReactComponent as RightImg } from "../../assets/img/cat-travel-bag-svgrepo-com 1.svg";

const TestSound = require("../../assets/audio/test_sound.mp3");

function ConnectionTest() {
    const [micVolumeValue, setMicVolumeValue] = useState(0);
    const [outputVolumeValue, setOutputVolumeValue] = useState(50); // 출력 볼륨 상태 추가
    const [isOn, setIsOn] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const openvidu = useSelector((state) => state.openvidu);
    const { mySessionId, myUserName } = openvidu;
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    const [userName, setUserName] = useState(myUserName);
    const [ready, setReady] = useState(true);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUserName(e.target.value);
    };
    // 사용자 제스처와 연관된 플래그 -> 이거 쓰나?
    const [userGesturePerformed, setUserGesturePerformed] = useState(false);

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            handleGoWaitingRoom();
        }
    };

    const handleGoWaitingRoom = async () => {
        console.log(mySessionId);
        await enterGameRoom(mySessionId, userName);
        navigate("/game");
    };

    function handleToggle() {
        setIsOn(!isOn);
    }

    const refreshName = async () => {
        try {
            const nickname = await getNickname(mySessionId);
            console.log(nickname);
            setUserName(nickname);
            dispatch(ovActions.saveUserName(nickname));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // didmount

        setTimeout(() => {
            setReady(false);
        }, 1000);
        // 방정보 없으면 에러로
        if (!mySessionId) navigate("/Error");

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
            {ready ? (
                <Loading />
            ) : (
                <Container>
                    <ContainerBody>
                        <LeftBox className="LeftBox">
                            <HeaderBox>
                                <SettingIcon width="30" height="30" />
                            </HeaderBox>
                            {isOn ? (
                                <EmptyScreen />
                            ) : (
                                <VideoComponent width="450" height="450" />
                            )}
                            <br />
                            <Switch isOn={isOn} onToggle={handleToggle} />
                        </LeftBox>
                        <RightBox className="RgihtBox">
                            <RightImg />
                            <RightItem>
                                <MidText>입력확인</MidText>
                                <MicBar volume={micVolumeValue / 100} />
                            </RightItem>

                            <RightItem>
                                <MidText>
                                    출력조절 : {outputVolumeValue}
                                </MidText>
                                <VolumeSlider
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={outputVolumeValue}
                                    onChange={handleVolumeChange}
                                    color="black"
                                />
                            </RightItem>
                            <RightItem>
                                <VideoDeviceSelector
                                    onDeviceSelected={(selectedDevice) =>
                                        console.log(selectedDevice)
                                    }
                                />
                            </RightItem>
                            <FlexRowBox>
                                <DescBox>
                                    <MidText>소리 출력 테스트</MidText>
                                </DescBox>
                                <Button
                                    text="테스트"
                                    shadow="none"
                                    width="100px"
                                    onClick={handleTestButtonClick}
                                    className="testBtn"
                                    color="black"
                                />
                            </FlexRowBox>

                            <FlexRowBox>
                                <NickName>
                                    <Input
                                        value={userName}
                                        disabled="disabled"
                                        onChange={handleChange}
                                        onKeyPress={handleOnKeyPress}
                                    />
                                </NickName>
                                <Button
                                    onClick={refreshName}
                                    width="45px"
                                    type="icon"
                                    background="dusty-pink-white"
                                    shadow="none"
                                >
                                    {/* 리롤버튼 css안깨지는거로 수정 필요 */}
                                    <RefreshIconO width="45" height="45" />
                                </Button>
                                <Button
                                    width="100px"
                                    height="60px"
                                    onClick={() => {
                                        handleGoWaitingRoom();
                                    }}
                                    background={`var(--dusty-pink-white)`}
                                    color="black"
                                >
                                    입장
                                </Button>
                            </FlexRowBox>
                        </RightBox>
                        <audio ref={audioRef} src={TestSound} loop={false} />
                    </ContainerBody>
                </Container>
            )}
        </>
    );
}

export default ConnectionTest;
