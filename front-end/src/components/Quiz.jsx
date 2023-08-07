import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Timer from "./Timer";
import { submitAnswer } from "../hooks/quiz";
import { useSelector } from "react-redux";

const Container = styled.div`
    padding: 20px;
    padding-bottom: 40px;
    width: 600px;
    height: 300px;
    background: ${`var(--macciato)`};
    text-align: center;
    border-radius: 5px;
`;

const Title = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 32px;
    color: ${`var(--dusty-pink-dark)`};
`;

const Box = styled.div`
    display: flex;
`;

const Content = styled.button`
    background-color: ${`var(--white)`};
    margin-right: 10px;
    margin-left: 10px;
    width: 350px;
    height: 150px;
    border-radius: 5px;
    font-size: 32px;
    color: ${`var(--beige-dark)`};
`;

const Quiz = (props) => {
    const { title, text1, text2 } = props;
    const [userChoice, setUserChoice] = useState(null);
    const [answered, setAnswered] = useState(false);
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const playerNickname = useSelector((state) => state.openvidu.myUserName);
    const handleUserChoice = (isPositive) => {
        setUserChoice(isPositive ? "positive" : "negative");
    };

    useEffect(() => {
        if (answered) {
            console.log(userChoice);
            submitAnswer(roomId, playerNickname, userChoice);
        }
    }, [answered, roomId, playerNickname, userChoice]);

    // useEffect(() => {
    //     console.log(userChoice); // 여기에서 로그 찍기
    // }, [userChoice]);
    return (
        <Container>
            <Timer
                onTimerEnd={() => setAnswered(true)}
                roomId={roomId}
                playerNickname={playerNickname}
            />
            <Title>{title}</Title>
            <Box>
                <Content onClick={() => handleUserChoice(true)}>
                    {text1}
                </Content>
                <Content onClick={() => handleUserChoice(false)}>
                    {text2}
                </Content>
            </Box>
        </Container>
    );
};

export default Quiz;
