import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./Timer";
import { useEffect } from "react";
import { fetchQuizResult, submitAnswer } from "../hooks/quiz";
import { gameActions } from "../store/gameSlice";
import { Container, Content, FlexBox, Title } from "./layout/quiz";

const Quiz = (props) => {
    const { title, text1, text2 } = props;
    const openvidu = useSelector((state) => state.openvidu);
    const { session, mySessionId, myUserName, owner } = openvidu;
    const [answered, setAnswered] = useState(false);
    const [userChoice, setUserChoice] = useState(null);
    const dispatch = useDispatch();
    const roomId = mySessionId;
    const playerNickname = myUserName;

    const handleUserChoice = (isPositive) => {
        setUserChoice(isPositive ? "positive" : "negative");
    };

    useEffect(() => {
        const postAnswer = async () => {
            try {
                console.log(myUserName, playerNickname);
                console.log(roomId, playerNickname, userChoice);
                await submitAnswer(roomId, playerNickname, userChoice);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        const getQuizRes = async () => {
            const quizResultResponse = await fetchQuizResult(roomId);

            dispatch(gameActions.saveAnswerer(quizResultResponse.answerer));
            session.signal({
                data: quizResultResponse.answerer,
                to: [],
                type: "answerer",
            });
        };

        const handleAnswerSubmission = () => {
            postAnswer();
            owner && getQuizRes();
        };
        if (answered) {
            handleAnswerSubmission();
        }
    }, [answered, userChoice]);

    return (
        <Container>
            <Timer time={7} onTimerEnd={() => setAnswered(true)} />
            <Title>{title}</Title>
            <FlexBox>
                <Content
                    onClick={() => handleUserChoice(true)}
                    className={
                        "btn" + (userChoice === "positive" ? " active" : "")
                    }
                >
                    {text1}
                </Content>
                <Content
                    onClick={() => handleUserChoice(false)}
                    className={
                        "btn" + (userChoice === "negative" ? " active" : "")
                    }
                >
                    {text2}
                </Content>
            </FlexBox>
        </Container>
    );
};

export default Quiz;
