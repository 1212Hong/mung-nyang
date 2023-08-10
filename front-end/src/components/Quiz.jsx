import React, { useState } from "react";
import styled from "styled-components";
import Timer from "./Timer";
import { useEffect } from "react";
import { fetchQuizResult, submitAnswer } from "../hooks/quiz";

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
    const {
        title,
        text1,
        text2,
        onViewChange,
        ChooseModal,
        roomId,
        myUserName,
    } = props;
    const [showChooseModal, setShowChooseModal] = useState(false);
    const [answerer, setAnswerer] = useState("");
    const [answered, setAnswered] = useState(false);
    const [userChoice, setUserChoice] = useState("");
    const [quizResultFetched, setQuizResultFetched] = useState(false);
    const handleUserChoice = (isPositive) => {
        setUserChoice(isPositive ? "positive" : "negative");
    };

    useEffect(() => {
        const handleAnswerSubmission = async () => {
            try {
                console.log("1단계", userChoice);

                // Submit answer
                await submitAnswer(roomId, myUserName, userChoice);

                console.log("2단계", roomId, myUserName, userChoice);

                const quizResultResponse = await fetchQuizResult(roomId);

                setAnswerer(quizResultResponse.answerer);
                console.log("3단계", answerer);
                setShowChooseModal(true);
                setQuizResultFetched(true);
            } catch (error) {
                console.error("Error:", error);
                // 에러 처리
            }
        };

        if (answered) {
            handleAnswerSubmission();
        }
    }, [
        answered,
        roomId,
        myUserName,
        userChoice,
        setAnswerer,
        setShowChooseModal,
        answerer,
    ]);

    useEffect(() => {
        if (showChooseModal) {
            const modalTimer = setTimeout(() => {
                setShowChooseModal(false);
                onViewChange("Category");
            }, 5000);

            return () => clearTimeout(modalTimer);
        }
    }, [setShowChooseModal, onViewChange, showChooseModal]);
    return (
        <Container>
            <Timer
                onTimerEnd={() => setAnswered(true)}
                roomId={roomId}
                myUserName={myUserName}
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
            {quizResultFetched && <ChooseModal answerer={answerer} />}
        </Container>
    );
};

export default Quiz;
