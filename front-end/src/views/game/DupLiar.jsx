import React, { useState, useEffect } from "react";
import VideoComponent from "../../components/VideoComponent";
import foot from "../../assets/img/foot.png";
import Timer from "../../components/Timer";
import { Container, ModalMainText } from "../../components/layout/common";
import {
    Box,
    Item,
    NotificationContainer,
    ImageOverlay,
    ExItem,
    RedColor,
    ExRedText,
} from "../../components/layout/selectLiar";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLiar, selectedLiar, Result } from "../../api/game";
import { gameActions } from "../../store/gameSlice";
import { MidText, SubText, MainText } from "../../components/layout/common";
import { Overlay } from "../../components/layout/selectAnswer";

const DupLiar = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { session, publisher, owner, subscribers } = openvidu;
    const setId = useSelector((state) => state.game.setId);
    const [showNotification, setShowNotification] = useState(true);
    const text = "중복 투표가 나왔습니다. 고양이를 다시 선택하세요.";
    const imgSrc = foot;
    const dispatch = useDispatch();
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const answerer = useSelector((state) => state.game.answerer);
    const [answered, setAnswered] = useState(false);
    const [activeBox, setActiveBox] = useState(null);
    const [next, setNext] = useState(false);
    const updatedDupLiars = useSelector((state) => state.game.dupLiars);
    console.log(updatedDupLiars);

    const handleBoxClick = (name) => {
        setActiveBox(name === activeBox ? null : name);
    };

    useEffect(() => {
        const handleSubmission = async () => {
            try {
                const response = await selectLiar(setId, activeBox);

                console.log(setId);
                console.log(response);
            } catch (error) {
                console.error("Error", error);
            }
        };
        if (answered) {
            handleSubmission();
            setNext(true);
        }
    }, [answered]);

    useEffect(() => {
        const handleResult = async () => {
            try {
                const selectedLiarResponse = await selectedLiar(setId);
                console.log(selectedLiarResponse);
                if (selectedLiarResponse.data.gameProcessType === "LiarVote") {
                    const dupliars =
                        selectedLiarResponse.data.mostVotedNicknames;
                    console.log(dupliars);
                    const randomLiar =
                        dupliars[Math.floor(Math.random() * dupliars.length)];

                    console.log(randomLiar);
                    dispatch(gameActions.saveLiar(randomLiar));
                    const signalVotedLiar = async () => {
                        session.signal({
                            data: randomLiar,
                            to: [],
                            type: "VotedLiar",
                        });
                    };
                    signalVotedLiar();
                    if (publisher.stream.connection.data === randomLiar) {
                        dispatch(changePhase("SelectAns"));
                    } else {
                        dispatch(changePhase("OtherView"));
                    }
                } else if (
                    selectedLiarResponse.data.gameProcessType === "SelectAns"
                ) {
                    const mostVotedNickname =
                        selectedLiarResponse.data.mostVotedNicknames[0];
                    console.log(mostVotedNickname);
                    dispatch(gameActions.saveLiar(mostVotedNickname));
                    const signalVotedLiar = async () => {
                        session.signal({
                            data: mostVotedNickname,
                            to: [],
                            type: "VotedLiar",
                        });
                    };
                    signalVotedLiar();
                    if (
                        publisher.stream.connection.data === mostVotedNickname
                    ) {
                        dispatch(changePhase("SelectAns"));
                    } else {
                        dispatch(changePhase("OtherView"));
                    }
                } else {
                    const response = await Result(setId, roomId, "", "");
                    console.log(response);
                    dispatch(gameActions.updateResult("고양이 승리"));
                    const signalNoLiar = async () => {
                        session.signal({
                            data: "고양이 승리",
                            to: [],
                            type: "noLiar",
                        });
                    };
                    signalNoLiar();
                    dispatch(changePhase("MidScore"));
                }
            } catch (error) {
                console.error("Error", error);
            }
        };
        if (next) {
            owner && handleResult();
        }
    }, [next]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Container>
            {!showNotification && (
                <Timer time={10} onTimerEnd={() => setAnswered(true)} />
            )}
            <Box>
                {publisher.stream.connection.data !== answerer &&
                updatedDupLiars.includes(publisher.stream.connection.data) ? (
                    <ExItem>
                        <ExRedText>
                            나 : {publisher.stream.connection.data}
                        </ExRedText>
                        <VideoComponent
                            width="350px"
                            height="300px"
                            streamManager={publisher}
                        />
                    </ExItem>
                ) : (
                    publisher.stream.connection.data !== answerer && (
                        <ExItem>
                            <SubText>
                                나 : {publisher.stream.connection.data}
                            </SubText>
                            <VideoComponent
                                width="350px"
                                height="300px"
                                streamManager={publisher}
                            />
                        </ExItem>
                    )
                )}
                {session.streamManagers &&
                    session.streamManagers.map((subscriber, i) => {
                        if (subscriber.stream.connection.data === answerer) {
                            return (
                                <React.Fragment key={i}>
                                    <ExItem>
                                        <SubText>
                                            탐정 강아지 : {answerer}
                                        </SubText>
                                        <VideoComponent
                                            width="350px"
                                            height="300px"
                                            streamManager={subscriber}
                                        />
                                    </ExItem>
                                </React.Fragment>
                            );
                        }
                    })}
                {subscribers &&
                    subscribers.map((subscriber, i) => {
                        const nickname = subscriber.stream.connection.data;
                        const isDisplayed = updatedDupLiars.includes(nickname);

                        if (isDisplayed) {
                            return (
                                <React.Fragment key={i}>
                                    <Item
                                        onClick={() => handleBoxClick(nickname)}
                                    >
                                        <ImageOverlay
                                            active={activeBox === nickname}
                                        >
                                            <img
                                                src={imgSrc}
                                                alt="사진"
                                                width="100%"
                                            />
                                        </ImageOverlay>
                                        <ExRedText>
                                            투표 대상자:
                                            {subscriber.stream.connection.data}
                                        </ExRedText>
                                        <VideoComponent
                                            width="350px"
                                            height="300px"
                                            streamManager={subscriber}
                                        />
                                    </Item>
                                </React.Fragment>
                            );
                        }

                        return null;
                    })}
                {subscribers &&
                    subscribers.map((subscriber, i) => {
                        const nickname = subscriber.stream.connection.data;
                        const isDisplayed = updatedDupLiars.includes(nickname);

                        if (!isDisplayed) {
                            if (
                                subscriber.stream.connection.data !== answerer
                            ) {
                                return (
                                    <React.Fragment key={i}>
                                        <ExItem>
                                            <SubText>
                                                {
                                                    subscriber.stream.connection
                                                        .data
                                                }
                                            </SubText>
                                            <VideoComponent
                                                width="350px"
                                                height="300px"
                                                streamManager={subscriber}
                                            />
                                        </ExItem>
                                    </React.Fragment>
                                );
                            }

                            return null;
                        }
                    })}
            </Box>
            <Overlay show={showNotification} />
            <NotificationContainer show={showNotification}>
                <ModalMainText> {text}</ModalMainText>
            </NotificationContainer>
        </Container>
    );
};

export default DupLiar;
