import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Timer from "./Timer";
import { useEffect } from "react";
import { fetchQuizResult, submitAnswer } from "../hooks/quiz";
import { gameActions } from "../store/gameSlice";

const Container = styled.div`
    padding: 20px;
    padding-bottom: 40px;
    width: 600px;
    height: 300px;
    background: var(--macciato);
    text-align: center;
    border-radius: 5px;
`;

const Title = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 32px;
    color: var(--dusty-pink-dark);
`;

const Box = styled.div`
    display: flex;
`;

const Content = styled.button`
    background-color: var(--white);
    margin-right: 10px;
    margin-left: 10px;
    width: 350px;
    height: 150px;
    border-radius: 5px;
    font-size: 32px;
    color: var(--beige-dark);
    box-shadow: 3px 3px 3px var(--blacks);
    transition-duration: 0.3s;
    :active {
        margin-left: 15px;
        margin-top: 15px;
        box-shadow: none;
    }
    :hover {
        cursor: pointer;
    }
`;

const Quiz = (props) => {
    const { title, text1, text2, onViewChange, ChooseModal } = props;
    const [showChooseModal, setShowChooseModal] = useState(false);
    const [answerer, setAnswerer] = useState("");
    const [answered, setAnswered] = useState(false);
    const [userChoice, setUserChoice] = useState("");
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { mySessionId, myUserName, owner } = openvidu;
    const roomId = mySessionId;
    const playerNickname = myUserName;
    const [quizResultFetched, setQuizResultFetched] = useState(false);
    const handleUserChoice = (isPositive) => {
        setUserChoice(isPositive ? "positive" : "negative");
    };

    useEffect(() => {
        const handleAnswerSubmission = async () => {
            try {
                console.log(myUserName, playerNickname);
                console.log(roomId, playerNickname, userChoice);
                await submitAnswer(roomId, playerNickname, userChoice);
                const quizResultResponse = await fetchQuizResult(roomId);

                setAnswerer(quizResultResponse.answerer);
                dispatch(gameActions.saveAnswerer(answerer));
                setShowChooseModal(true);
                setQuizResultFetched(true);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (answered) {
            handleAnswerSubmission();
        }
    }, [
        answered,
        roomId,
        playerNickname,
        myUserName,
        userChoice,
        showChooseModal,
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
                <Content
                    onClick={() => handleUserChoice(true)}
                    clicked={userChoice}
                >
                    {text1}
                </Content>
                <Content
                    onClick={() => handleUserChoice(false)}
                    clicked={userChoice}
                >
                    {text2}
                </Content>
            </Box>
            {quizResultFetched && <ChooseModal answerer={answerer} />}
        </Container>
    );
};

export default Quiz;
