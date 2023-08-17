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
} from "../../components/layout/selectLiar";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLiar, selectedLiar, Result } from "../../api/game";
import { gameActions } from "../../store/gameSlice";
import { MidText, SubText, MainText } from "../../components/layout/common";
import { ModalContainer } from "../../components/layout/modal";
import { Overlay } from "../../components/layout/selectAnswer";

const LiarVote = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { session, owner, myUserName, subscribers, publisher } = openvidu;
    const setId = useSelector((state) => state.game.setId);
    const [showNotification, setShowNotification] = useState(true);
    const text = "고양이라고 의심되는 강아지를 선택하세요.";
    const imgSrc = foot;
    const dispatch = useDispatch();
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const answerer = useSelector((state) => state.game.answerer);
    const [answered, setAnswered] = useState(false);
    const [activeBox, setActiveBox] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const streams = session.streamManagers;
    const newOtherStreams = streams.filter(
        (streamManager) => streamManager.stream.connection.data !== answerer,
    );
    const handleBoxClick = (name) => {
        setActiveBox(name === activeBox ? null : name);
    };

    const signalDupLiar = async (joinedStrDupLiars) => {
        session.signal({
            data: joinedStrDupLiars,
            to: [],
            type: "startDupLiar",
        });
    };

    const signalVotedLiar = async (mostVotedNickname) => {
        session.signal({
            data: mostVotedNickname,
            to: [],
            type: "VotedLiar",
        });
    };

    const signalNoLiar = async () => {
        session.signal({
            data: "고양이 승리",
            to: [],
            type: "noLiar",
        });
    };

    useEffect(() => {
        const postLiar = async () => {
            try {
                if (activeBox) {
                    const response = await selectLiar(setId, activeBox);
                    console.log(setId);
                    console.log(response);
                }
            } catch (error) {
                console.error("Error", error);
            }
        };
        const handleResult = async () => {
            try {
                const selectedLiarResponse = await selectedLiar(setId);
                console.log(selectedLiarResponse);
                const data = selectedLiarResponse.data;
                if (data.gameProcessType === "LiarVote") {
                    const dupliars = data.mostVotedNicknames;
                    console.log(dupliars);
                    dispatch(gameActions.updateDupLiars(dupliars));
                    const strDupLiars = dupliars.map((str) => str + ",");
                    const joinedStrDupLiars = strDupLiars.join("");
                    console.log(
                        "동점자들 스트링으로 합친거 ",
                        joinedStrDupLiars,
                    );
                    signalDupLiar(joinedStrDupLiars);
                    dispatch(changePhase("DupLiar"));
                } else if (data.gameProcessType === "SelectAns") {
                    const mostVotedNickname = data.mostVotedNicknames[0];
                    console.log(mostVotedNickname);
                    dispatch(gameActions.saveLiar(mostVotedNickname));

                    signalVotedLiar(mostVotedNickname);

                    myUserName === mostVotedNickname
                        ? dispatch(changePhase("SelectAns"))
                        : dispatch(changePhase("OtherView"));
                } else {
                    const response = await Result(setId, roomId, "", "");
                    console.log(response);
                    dispatch(gameActions.updateResult("고양이 승리"));
                    signalNoLiar();
                    dispatch(changePhase("MidScore"));
                }
            } catch (error) {
                console.error("Error", error);
            }
        };
        const handleVoteSubmit = () => {
            postLiar();
            setShowLoading(true);
            if (owner) {
                setTimeout(() => {
                    handleResult();
                }, 2000);
            }
        };

        if (answered) {
            handleVoteSubmit();
        }
    }, [answered, activeBox]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Container>
            {!showNotification && (
                <Timer time={8} onTimerEnd={() => setAnswered(true)} />
            )}
            <Box>
                {publisher.stream.connection.data !== answerer && (
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
                        if (subscriber.stream.connection.data !== answerer) {
                            return (
                                <React.Fragment key={i}>
                                    <Item
                                        onClick={() =>
                                            handleBoxClick(
                                                subscriber.stream.connection
                                                    .data,
                                            )
                                        }
                                    >
                                        <ImageOverlay
                                            active={
                                                activeBox ===
                                                subscriber.stream.connection
                                                    .data
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <img
                                                src={imgSrc}
                                                alt="사진"
                                                width="100%"
                                            />
                                        </ImageOverlay>
                                        <SubText>
                                            {subscriber.stream.connection.data}
                                        </SubText>
                                        <VideoComponent
                                            width="350px"
                                            height="300px"
                                            streamManager={subscriber}
                                        />
                                    </Item>
                                </React.Fragment>
                            );
                        }
                    })}
            </Box>
            <Overlay show={showNotification} />
            <NotificationContainer show={showNotification}>
                {text}
            </NotificationContainer>
            <Overlay show={showLoading} />
            <NotificationContainer show={showLoading}>
                집계중 입니다. 잠시만 기다려 주세요.
            </NotificationContainer>
        </Container>
    );
};

export default LiarVote;
