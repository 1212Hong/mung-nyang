import React, { useState, useEffect } from "react";
import {
    Container,
    HeaderBox,
    VideoBox,
    StateBox,
    Footer,
    AnswerBox,
    FooterBox,
    ErrorBox,
} from "../../components/layout/topbottomvideo";
import VideoComponent from "../../components/VideoComponent";
import Quiz from "../../components/Quiz";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { fetchQuizInfo } from "../../hooks/quiz";
import { useDispatch, useSelector } from "react-redux";
import ChooseModal from "../../components/modal/ChooseModal";
import { changePhase } from "../../store/phaseSlice";
import { SubText } from "../../components/layout/common";
import { closeModal } from "../../store/modalSlice";

function TopBottomVideo() {
    const phase = useSelector((state) => state.phase);
    const { phaseType } = phase;
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { gameId, answerer } = game;
    const { publisher, subscribers, myUserName, session, owner } = openvidu;
    const [quizInfo, setQuizInfo] = useState(null);
    const dispatch = useDispatch();

    const title = "제시어 카테고리";
    const list = ["음식", "스포츠", "과일", "카", "테", "고", "리"]; // 카테고리는 고정이므로 여기서 카테고리 다 넣어줌
    const upside_list = [
        ...subscribers.slice(0, Math.min(subscribers.length, 2)),
    ];
    const downside_list = subscribers;

    useEffect(() => {
        if (session) {
            session.on("startDesc", () => {
                dispatch(changePhase({ phaseType: "Desc" }));
            });
            console.log(session.on("category", () => {}));
        }
    }, [session]);

    useEffect(() => {
        async function fetchAndSetQuizInfo() {
            const info = await fetchQuizInfo(gameId);
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
                    phaseType === "Quiz" ? (
                        <Quiz
                            title={quizInfo.question}
                            text1={quizInfo.answer1}
                            text2={quizInfo.answer2}
                        />
                    ) : phaseType === "Category" ? (
                        answerer === myUserName ? (
                            <Select list={list} title={title} />
                        ) : (
                            <SubText>정답자가 카테고리 선정중</SubText>
                        )
                    ) : phaseType === "EmgAns" ? (
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
                    ) : (
                        <ErrorBox>view접근이 잘못됨</ErrorBox>
                    )
                ) : (
                    <ErrorBox>퀴즈 정보가 없음</ErrorBox>
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
