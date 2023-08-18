import React, { useEffect, useState, useRef } from "react";
import VideoComponent from "../../components/VideoComponent";
import Card from "../../components/Card";
import clockImg from "../../assets/img/clock.png";
import aCatInDogsImg from "../../assets/img/a_cat_in_dogs_up.png";
import Timer from "../../components/Timer";
import Input from "../../components/Input";
import {
    Container,
    OtherUsers,
    SmallText,
    SubText,
} from "../../components/layout/common";
import {
    AnswerBox,
    AnswerItem,
    NickName,
    UserBox,
} from "../../components/layout/otherView";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, ColBox, ImgBox, InputBox } from "../../components/layout/finAns";
import Button from "../../components/Button";
import { finalAnswer } from "../../api/game";
import { gameActions } from "../../store/gameSlice";

const FinAns = () => {
    const [ans, setAns] = useState("");
    const [resReturn, setResReturn] = useState("");
    const [nextPhase, setNextPhase] = useState("");
    const timer = useRef(null);
    const text = "정답자가 정답을 입력중입니다.";
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { session, mySessionId } = openvidu; // roomId가 mySessionId
    const game = useSelector((state) => state.game);
    const { answerer, setId } = game;
    const streams = session.streamManagers;
    const userInput = useRef();
    const handleChange = (e) => {
        setAns(e.target.value);
    };

    const signalFinAns = async (resReturn, phase) => {
        session.signal({
            data: phase,
            to: [],
            type: resReturn,
        });
    };

    const submitAnswer = async () => {
        await finalAnswer(setId, mySessionId, userInput.current.value)
            .then((res) => {
                console.log(res); // 올바른 반환값 : resultReturn, gameProcessType 담긴 객체
                setResReturn(res.data.resReturn);
                setNextPhase(res.data.gameProcessType);

                // 비동기에러 생각해서 우선 데이터 받기 성공하면 시그널 전송

                // signalFinAns(resReturn, nextPhase);

                // "LiarLose_Final"
                if (res.data.resultReturn === "LiarLose_Final") {
                    signalFinAns(res.data.resultReturn, "MidScore");
                    dispatch(gameActions.updateResult("강아지 승리"));
                    const signalResult = async () => {
                        session.signal({
                            data: res.data.resultReturn,
                            to: [],
                            type: "getresult",
                        });
                    };
                    signalResult();
                    dispatch(changePhase("MidScore"));
                } else {
                    signalFinAns(
                        res.data.resultReturn,
                        res.data.gameProcessType,
                    );
                    dispatch(changePhase(res.data.gameProcessType));
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        timer.current = setTimeout(() => {
            session.on("signal:startFinAns", (event) => {
                dispatch(changePhase("LiarVote"));
            });
        }, 10000);

        return () => {
            clearTimeout(timer.current);
        };
    });

    return (
        <Container>
            <Timer
                time={10}
                onTimerEnd={() => {
                    dispatch(changePhase("LiarVote"));
                }}
            />
            <AnswerBox>
                {streams &&
                    streams.map((user, i) => (
                        <React.Fragment key={i}>
                            {user.stream.connection.data === answerer && (
                                <AnswerItem>
                                    <ColBox>
                                        <SmallText>
                                            {user.stream.connection.data}
                                        </SmallText>
                                        <VideoComponent
                                            width="500px"
                                            height="384px"
                                            streamManager={user}
                                        />
                                    </ColBox>
                                </AnswerItem>
                            )}
                        </React.Fragment>
                    ))}
                {session.connection.data === answerer ? (
                    <Box>
                        <ImgBox>
                            <img
                                src={aCatInDogsImg}
                                alt="a cat in dogs img"
                                width="90%"
                            />
                        </ImgBox>
                        <InputBox>
                            <Input
                                value={ans}
                                ref={userInput}
                                onChange={handleChange}
                            />
                            <Button
                                onClick={() => submitAnswer()}
                                width="155px"
                                height="40px"
                            >
                                최종 정답 제출
                            </Button>
                        </InputBox>
                    </Box>
                ) : (
                    <Card imageSrc={clockImg} description={text} />
                )}
            </AnswerBox>
            <UserBox>
                {streams &&
                    streams.map((user, i) => (
                        <React.Fragment key={i}>
                            {user.stream.connection.data !== answerer && (
                                <OtherUsers>
                                    <VideoComponent
                                        width="232px"
                                        height="200px"
                                        streamManager={user}
                                    />
                                    <NickName>
                                        <SubText>
                                            {user.stream.connection.data}
                                        </SubText>
                                    </NickName>
                                </OtherUsers>
                            )}
                        </React.Fragment>
                    ))}
            </UserBox>
        </Container>
    );
};

export default FinAns;
