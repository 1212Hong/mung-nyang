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
import { fetchQuizInfo } from "../../hooks/quiz";
import { useSelector } from "react-redux";

function TopBottomVideo() {
    const title = "카테고리제목";
    const list = ["임", "시", "카", "테", "고", "리"];
    const [quizInfo, setQuizInfo] = useState(null);
    const openvidu = useSelector((state) => state.openvidu);
    const { publisher, subscribers, roomId } = openvidu;
    const [view, setView] = useState("Quiz");
    const upside_list = [
        ...subscribers.slice(0, Math.min(subscribers.length, 2)),
    ];
    const downside_list = subscribers.slice(Math.min(subscribers.length, 2));
    const handleViewChange = (newView) => {
        setView(newView);
    };
    useEffect(() => {
        async function fetchAndSetQuizInfo() {
            const info = await fetchQuizInfo(roomId);
            setQuizInfo(info);
        }
        fetchAndSetQuizInfo();
    }, []);

    return (
        <Container className="Container">
            <HeaderBox className="HeaderBox">
                {publisher && (
                    <VideoBox className="Pub">
                        <VideoComponent
                            width={"280px"}
                            height={"150px"}
                            streamManager={publisher}
                        />
                    </VideoBox>
                )}
                {upside_list.map((sub, index) => (
                    <VideoBox key={index} className="Sub">
                        <VideoComponent
                            width={"280px"}
                            height={"150px"}
                            streamManager={sub}
                        />
                    </VideoBox>
                ))}
            </HeaderBox>
            <StateBox>
                {quizInfo ? (
                    view === "Quiz" ? (
                        <Quiz
                            title={quizInfo.question}
                            text1={quizInfo.answer1}
                            text2={quizInfo.answer2}
                            onViewChange={handleViewChange}
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
                    ) : null
                ) : (
                    <div>퀴즈 정보를 불러오는 중...</div>
                )}
            </StateBox>
            <FooterBox className="FooterBox">
                {downside_list !== undefined
                    ? downside_list.map((sub, index) => (
                          <VideoBox key={index}>
                              <VideoComponent
                                  width={"280px"}
                                  height={"150px"}
                                  streamManger={sub}
                              />
                          </VideoBox>
                      ))
                    : null}
            </FooterBox>
        </Container>
    );
}

export default TopBottomVideo;
