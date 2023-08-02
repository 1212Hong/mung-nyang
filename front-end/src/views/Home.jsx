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
import { createRoom } from "../api/room";
import { MainText, SubText } from "../components/layout/common";
import Input from "../components/Input";

const Home = () => {
    const [view, setView] = useState(false);
    const [roomInfo, setRoomInfo] = useState({
        roomId: "",
        roomPw: "",
    });

    const { roomId, roomPw } = roomInfo;

    const handleChange = (e) => {
        setRoomInfo({
            ...roomInfo,
            [e.target.id]: e.target.value,
        });
    };

    const reset = () => {
        setRoomInfo({
            roomId: "",
            roomPw: "",
        });
    };

    const changeView = () => {
        setRoomInfo({ roomId: "", roomPw: "" });
        setView(!view);
        // if (view) {
        //     setRoomInfo({ roomId: "", roomPw: "" });
        //     window.location.reload();
        // }
        console.log(roomInfo);
    };
    const makeRoom = () => {
        console.log("방생성 api호출");
        createRoom();
    };
    const joinRoom = () => {
        console.log("방입장 api");
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
                    <Button
                        text={view ? "방생성" : "입장하기"}
                        width="100px"
                        margin="20px"
                        onClick={view ? makeRoom : joinRoom}
                    />
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
