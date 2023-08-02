import React, { useState, useEffect } from "react";
import VideoComponent from "../../components/VideoBoxing";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import {
    SettingIcon,
    CameraIcon,
    CameraOffIcon,
    TestSound,
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
    Entrance,
} from "../../components/layout/connectionTest";

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
