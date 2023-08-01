import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideoComponent from "../components/VideoBoxing";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import { ReactComponent as SettingIcon } from "../assets/img/setting.svg";
import { ReactComponent as CameraIcon } from "../assets/img/camera_on.svg";
import { ReactComponent as CameraOffIcon } from "../assets/img/camera_off.svg";

const TestSound = require("../assets/bgm/test_sound.mp3");

const Container = styled.div`
    background-color: var(--beige-dark);
    border-radius: 20px;
`;

const ContainerBody = styled.div`
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const HeaderBox = styled.div`
    width: 1250px;
    height: 50px;
    background-color: var(--beige-dark);
    border-radius: 10px;
`;
const LeftBox = styled.div`
    width: 600px;
    height: 650px;
    background-color: var(--beige);
    border-radius: 10px;
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const RightBox = styled.div`
    width: 600px;
    height: 650px;
    background-color: var(--beige);
    border-radius: 10px;
    margin: 20px;
    color: var(--black);
`;

const MicBox = styled.div`
    background: var(--white);
    width: 500px;
    height: 50px;
    margin: 10px;
`;
const MicBar = styled.div`
    border: 1px solid black;
    background: var(--beige-dark);
    width: ${(props) => props.volume}%;
    height: 50px;
    margin: 10px;
`;

const CameraIconWrapper = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    transform: ${(props) => (props.isOn ? "scale(1.1)" : "scale(1)")};
`;
const EmptyScreen = styled.div`
    width: 450px;
    height: 450px;
    background-color: var(--black);
    border-radius: 20px;
`;

function Switch({ isOn, onToggle }) {
    return (
        <motion.div layout onClick={onToggle}>
            <AnimatePresence initial={false} mode="wait">
                <CameraIconWrapper isOn={isOn}>
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
    const [isOn, setIsOn] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = React.createRef();

    function handleTestButtonClick() {
        setIsPlaying(true);
        audioRef.current.play();
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

    return (
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
                    <h3>입력조절</h3>
                    <MicBar volume={micVolumeValue} />
                    <h3>스피커</h3>
                    <MicBox />
                    <h3>출력조절</h3>
                    <MicBox />
                    <Button
                        text="테스트"
                        width="50"
                        onClick={handleTestButtonClick}
                    />
                    <h3>소리변조 테스트</h3>
                </RightBox>
                <audio ref={audioRef} src={TestSound} loop={false} />
            </ContainerBody>
        </Container>
    );
}

export default ConnectionTest;
