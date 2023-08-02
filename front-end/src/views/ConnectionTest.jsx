import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideoComponent from "../components/VideoBoxing";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import { ReactComponent as SettingIcon } from "../assets/img/setting.svg";
import { ReactComponent as CameraIcon } from "../assets/img/camera_on.svg";
import { ReactComponent as CameraOffIcon } from "../assets/img/camera_off.svg";

const TestSound = require("../assets/audio/test_sound.mp3");

const Container = styled.div`
    background-color: var(--beige-dark);
    border-radius: 20px;
`;

const ContainerBody = styled.div`
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
const MicBar = styled.div.attrs((props) => ({
    style: {
        width: `${Math.min(props.volume * 500, 500)}px`,
    },
}))`
    border: 1px solid black;
    background: var(--beige-dark);
    height: 50px;
    margin: 10px;
`;
const VolumeSlider = styled.input`
    width: 500px;
    height: 30px;
    appearance: none;
    background: var(--beige-dark);
    outline: none;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        background: var(--macciato);
        border-radius: 50%;
        cursor: pointer;
    }
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
const FooterBox = styled.div`
    width: 500px;
    display: flex;
    flex-direction: row;
    margin: 10px;
    justify-content: space-evenly;
`;

const NickName = styled.div`
    width: 300px;
    height: 80px;
    background-color: var(--beige-dark);
    border-radius: 20px;
`;

const Entrance = styled.div`
    width: 100px;
    height: 80px;
    background-color: var(--beige-dark);
    border-radius: 20px;
`;

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
                    />
                    <Button
                        text="테스트"
                        width="50"
                        onClick={handleTestButtonClick}
                    />
                    <h3>소리변조 테스트</h3>
                    <Button isOn={isOn} onToggle={handleToggle} text="임시" />
                    <FooterBox>
                        <NickName />
                        <Entrance />
                    </FooterBox>
                </RightBox>
                <audio ref={audioRef} src={TestSound} loop={false} />
            </ContainerBody>
        </Container>
    );
}

export default ConnectionTest;
