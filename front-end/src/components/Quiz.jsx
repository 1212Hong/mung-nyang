import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./Timer";
import { useEffect } from "react";
import { fetchQuizResult, submitAnswer } from "../hooks/quiz";
import { gameActions } from "../store/gameSlice";
import { Container, Content, FlexBox, Title } from "./layout/quiz";

const Quiz = (props) => {
    const { title, text1, text2, onViewChange, ChooseModal } = props;
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { answerer } = game;
    const { session, mySessionId, myUserName, owner } = openvidu;
    const [showChooseModal, setShowChooseModal] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [userChoice, setUserChoice] = useState("");
    const [quizResultFetched, setQuizResultFetched] = useState(false);
    const dispatch = useDispatch();
    const roomId = mySessionId;
    const playerNickname = myUserName;

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

                dispatch(gameActions.saveAnswerer(quizResultResponse.answerer));
                session.signal({
                    data: quizResultResponse.answerer,
                    to: [],
                    type: "answerer",
                });
                setShowChooseModal(true);
                setQuizResultFetched(true);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (answered) {
            owner && handleAnswerSubmission();
        }
    }, [answered, userChoice]);

    useEffect(() => {
        if (quizResultFetched && showChooseModal) {
            const modalTimer = setTimeout(() => {
                setShowChooseModal(false);
                onViewChange("Category");
            }, 5000);

            return () => clearTimeout(modalTimer);
        }
    }, [onViewChange, showChooseModal]);
    return (
        <Container>
            <Timer onTimerEnd={() => setAnswered(true)} />
            <Title>{title}</Title>
            <FlexBox>
                <Content
                    onClick={() => handleUserChoice(true)}
                    clicked={userChoice === "positive" ? true : false}
                >
                    {text1}
                </Content>
                <Content
                    onClick={() => handleUserChoice(false)}
                    clicked={userChoice === "negative" ? true : false}
                >
                    {text2}
                </Content>
            </FlexBox>
            {quizResultFetched && <ChooseModal answerer={answerer} />}
        </Container>
    );
};

export default Quiz;
