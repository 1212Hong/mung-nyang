import React, { useEffect, useState, useRef } from "react";
import {
    ButtonBox,
    FormBox,
    HeaderBox,
    HomeContainer,
    LeftBox,
    RightBox,
} from "../components/layout/home";
import Button from "../components/Button";
import { MainText, SubText } from "../components/layout/common";
import Input from "../components/Input";
import { makeRoom, enterRoom } from "../hooks/home";
import { useNavigate } from "react-router-dom";
import { ovActions } from "../store/openviduSlice";
import { useDispatch, useSelector } from "react-redux";
import mainBgm from "../assets/audio/mainBgm.wav";
import BackgroundImg from "../assets/img/mungnyangImg.png";
import { ReactComponent as VolumeOnIcon } from "../assets/img/volume_on.svg";
import { ReactComponent as VolumeMuteIcon } from "../assets/img/volume_mute.svg";

const Home = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [view, setView] = useState(false);
    const [roomInfo, setRoomInfo] = useState({
        roomId: "",
        roomPw: "",
    });
    const [inputChecker, setInputChecker] = useState(false);
    const { roomId, roomPw } = roomInfo;
    const roomIdCheck = useRef();
    const roomPwCheck = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { session, mySessionPw } = openvidu;

    const handleChange = (e) => {
        setRoomInfo({
            ...roomInfo,
            [e.target.id]: e.target.value,
        });
        if (
            roomIdCheck.current.value !== "" &&
            roomPwCheck.current.value !== ""
        )
            setInputChecker(true);
        else setInputChecker(false);
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            view ? handleMakeRoom() : handleJoinRoom();
        }
    };

    const changeView = () => {
        setRoomInfo({ roomId: "", roomPw: "" });
        setView(!view);
    };

    const handleMakeRoom = async () => {
        if (!inputChecker) {
            return false;
        }
        await makeRoom(roomInfo).catch((err) => navigate("/error"));

        dispatch(ovActions.saveSessionPw(roomPw));
        navigate("/test");
    };

    const handleJoinRoom = async () => {
        if (!inputChecker) {
            return false;
        }
        const joinRoomResponse = await enterRoom(roomInfo);
        joinRoomResponse && joinRoomResponse.error
            ? console.log("Error:", joinRoomResponse.error)
            : navigate("/test");

        dispatch(ovActions.saveSessionPw(roomInfo.roomPw));
        session &&
            session.signal({
                data: mySessionPw,
                to: [],
                type: "savePw",
            });
    };

    const audioElement = document.getElementById("bgm");
    useEffect(() => {
        if (audioElement) {
            audioElement.volume = 0.07; // 음량 조절
            audioElement.play(); // 재생
        }
    }, []);

    function toggleVolume() {
        if (audioElement) {
            audioElement.volume = 0.07;
            if (isMuted) {
                audioElement.muted = false;
            } else {
                audioElement.volume = 0.07;
                audioElement.muted = true;
            }
        }
        setIsMuted((prevState) => !prevState);
        console.log(isMuted);
    }

    return (
        <HomeContainer>
            <audio id="bgm" muted={isMuted} autoPlay loop>
                <source src={mainBgm} type="audio/wav" />
            </audio>
            <LeftBox className="leftbox">
                <HeaderBox>
                    <MainText>멍 마을의 냥</MainText>
                </HeaderBox>
                <HeaderBox>
                    <SubText>
                        {view
                            ? "화상 서비스로 제시어를 몸으로 설명하고 맞추는 라이어게임"
                            : "방장에게 받은 방 아이디와 비밀번호를 입력하세요!"}
                    </SubText>
                </HeaderBox>
                <FormBox>
                    <Input
                        id="roomId"
                        width="250px"
                        placeholder="방제목"
                        value={roomId}
                        onChange={handleChange}
                        ref={roomIdCheck}
                    />
                    <Input
                        id="roomPw"
                        width="250px"
                        type="password"
                        value={roomPw}
                        onChange={handleChange}
                        onKeyPress={handleOnKeyPress}
                        ref={roomPwCheck}
                    />
                    {inputChecker ? (
                        ""
                    ) : (
                        <p style={{ color: "rgba(255, 0, 0, 0.5)" }}>
                            방 제목과 비밀번호를 입력해주세요.
                        </p>
                    )}
                </FormBox>
                <ButtonBox>
                    {isMuted ? (
                        <Button
                            key="mute"
                            type="icon"
                            width="45px"
                            height="40px"
                            margin="30px"
                            background={`var(--beige-dark)`}
                            onClick={toggleVolume}
                        >
                            <VolumeMuteIcon width="23" height="23" />
                        </Button>
                    ) : (
                        <Button
                            key="on"
                            type="icon"
                            width="45px"
                            height="40px"
                            margin="30px"
                            background={`var(--beige-dark)`}
                            onClick={toggleVolume}
                        >
                            <VolumeOnIcon width="23" height="23" />
                        </Button>
                    )}
                    {view ? (
                        <Button
                            text={"방생성"}
                            width="100px"
                            margin="20px"
                            onClick={() => {
                                handleMakeRoom();
                            }}
                        />
                    ) : (
                        <Button
                            text="입장하기"
                            width="100px"
                            margin="20px"
                            onClick={() => {
                                handleJoinRoom();
                            }}
                        />
                    )}

                    <Button
                        text={view ? "입장하러가기" : "방생성하러가기"}
                        onClick={changeView}
                        background="brown-white"
                        hovercolor="dusty-pink-white"
                        hoverbgcolor="brown"
                        width="100px"
                        margin="20px"
                    />
                </ButtonBox>
            </LeftBox>
            <RightBox className="rightbox">
                <img
                    src={BackgroundImg}
                    width="840px"
                    height="720px"
                    alt="홈배경"
                />
            </RightBox>
        </HomeContainer>
    );
};

export default Home;
