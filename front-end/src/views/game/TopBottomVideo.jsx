import React, { useState, useEffect } from "react";
import {
    Container,
    HeaderBox,
    VideoBox,
    StateBox,
    Footer,
    AnswerBox,
    FooterBox,
} from "../../components/layout/topbottomvideo";
import VideoComponent from "../../components/VideoComponent";
import Quiz from "../../components/Quiz";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { fetchQuizInfo, submitAnswer, fetchQuizResult } from "../../hooks/quiz";
import ChooseModal from "../../components/modal/ChooseModal";
import { useSelector } from "react-redux";
function TopBottomVideo() {
    const title = "카테고리제목";
    const list = ["임", "시", "카", "테", "고", "리"];
    const [quizInfo, setQuizInfo] = useState(null);
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const playerNickname = useSelector((state) => state.openvidu.myUserName);
    const [view, setView] = useState("Quiz");
    const gameId = "gameId";
    const [showChooseModal, setShowChooseModal] = useState(false);
    const [answerer, setAnswerer] = useState("");
    const user_list = [
        "권영재",
        "김대홍",
        "손임현",
        "이민규",
        "홍주영",
        "이현우",
    ];
    const upside =
        user_list.length % 2 === 1
            ? parseInt(user_list.length / 2) + 1
            : user_list.length / 2;

    const upside_list = user_list.slice(0, upside);
    const downside_list = user_list.slice(upside, user_list.length);

    useEffect(() => {
        async function fetchAndSetQuizInfo() {
            const info = await fetchQuizInfo(roomId);
            setQuizInfo(info);
        }
        fetchAndSetQuizInfo();
    }, []);

    const handleQuizEnd = async (isPositive) => {
        const result = await fetchQuizResult(roomId, gameId);
        setAnswerer(result.answerer);
        setShowChooseModal(true);
    };

    useEffect(() => {
        if (showChooseModal) {
            const modalTimer = setTimeout(() => {
                setShowChooseModal(false);
                setView("Category");
            }, 10000); // 10 seconds

            return () => clearTimeout(modalTimer);
        }
    }, [showChooseModal]);

    return (
        <Container className="Container">
            <HeaderBox className="HeaderBox">
                {upside_list.map((user, index) => (
                    <VideoBox key={index}>
                        <VideoComponent width={"280px"} height={"150px"} />
                    </VideoBox>
                ))}
            </HeaderBox>
            <StateBox>
                {view === "Quiz" ? (
                    <Quiz
                        // title={quizInfo.question}
                        // text1={quizInfo.answer1}
                        // text2={quizInfo.answer2}
                        title="타이틀"
                        text1="답1"
                        text2="답2"
                        onQuizEnd={handleQuizEnd}
                    />
                ) : view === "Category" ? (
                    <Select list={list} title={title} />
                ) : view === "EmgAns" ? (
                    <AnswerBox>
                        <h3>정답을 입력해 주세요.</h3>
                        <br />
                        <Footer>
                            <Input width={"300px"}></Input>
                            <Button width={"150px"} height={"50px"}>
                                확인
                            </Button>
                        </Footer>
                    </AnswerBox>
                ) : null}
            </StateBox>
            <FooterBox className="FooterBox">
                {downside_list.map((user, index) => (
                    <VideoBox key={index}>
                        <VideoComponent width={"280px"} height={"150px"} />
                    </VideoBox>
                ))}
            </FooterBox>
            {showChooseModal && <ChooseModal answerer={answerer} />}
        </Container>
    );
}

export default TopBottomVideo;
