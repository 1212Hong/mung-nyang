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

    const changeView = () => {
        setRoomInfo({ roomId: "", roomPw: "" });
        setView(!view);
        console.log(roomInfo);
    };
    const makeRoom = () => {
        console.log("방생성 api호출");
        console.log(roomInfo);
        // createRoom(); api 테스트필요
    };
    const joinRoom = () => {
        console.log("방입장 api");
        console.log(roomInfo);
    };

    return (
        <HomeContainer>
            <LeftBox className="leftbox">
                {view ? <createRoom /> : <joinRoom />}
                <ButtonBox>
                    <Button
                        text={view ? "방생성" : "입장하기"}
                        width="100px"
                        margin="20px"
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
