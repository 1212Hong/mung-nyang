import React, { useState } from "react";
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
import { makeRoom, joinRoom } from "../hooks/home";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [view, setView] = useState(false);
    const [roomInfo, setRoomInfo] = useState({
        roomId: "",
        roomPw: "",
    });
    const { roomId, roomPw } = roomInfo;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRoomInfo({
            ...roomInfo,
            [e.target.id]: e.target.value,
        });
    };

    const changeView = () => {
        setRoomInfo({ roomId: "", roomPw: "" });
        setView(!view);
        console.log(roomInfo);
    };

    const handleJoinRoom = async () => {
        const joinRoomResponse = await joinRoom(roomInfo);
        if (joinRoomResponse && joinRoomResponse.error) {
            // If joinRoomResponse contains an error message, show an error window or message
            console.log("Error:", joinRoomResponse.error);
            // You can show an error window or message here using a state variable and a conditional rendering
        } else {
            // Room joined successfully, navigate to the game page
            navigate("/test");
        }
    };

    return (
        <HomeContainer>
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
                    />
                    <Input
                        id="roomPw"
                        width="250px"
                        type="password"
                        value={roomPw}
                        onChange={handleChange}
                    />
                </FormBox>
                <ButtonBox>
                    {view ? (
                        <Button
                            text={"방생성"}
                            width="100px"
                            margin="20px"
                            onClick={() => {
                                makeRoom(roomInfo);
                                navigate("/test");
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
                        width="100px"
                        margin="20px"
                    />
                </ButtonBox>
            </LeftBox>
            <RightBox className="rightbox" />
        </HomeContainer>
    );
};

export default Home;
