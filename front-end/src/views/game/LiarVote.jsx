import React, { useState, useEffect } from "react";
import VideoComponent from "../../components/VideoComponent";
import foot from "../../assets/img/foot.png";
import Timer from "../../components/Timer";
import { Container } from "../../components/layout/common";
import {
    Box,
    Item,
    NotificationContainer,
    ImageOverlay,
} from "../../components/layout/selectLiar";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLiar, selectedLiar, Result } from "../../api/game";
import { gameActions } from "../../store/gameSlice";

const LiarVote = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { session, owner, myUserName } = openvidu;
    const setId = useSelector((state) => state.game.setId);
    const [showNotification, setShowNotification] = useState(true);
    const text = "라이어를 선택하세요.";
    const imgSrc = foot;
    const dispatch = useDispatch();
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const answerer = useSelector((state) => state.game.answerer);
    const [answered, setAnswered] = useState(false);
    const [activeBox, setActiveBox] = useState(null);
    const [showLoading, setShowLoading] = useState(false);

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
            data: "라이어 승리",
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
                    dispatch(gameActions.updateResult("라이어 승리"));
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
                }, 3000);
            }
        };

        if (answered) {
            handleVoteSubmit();
        }
    }, [answered, activeBox]);

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
            <Timer time={10} onTimerEnd={() => setAnswered(true)} />
            <Box>
                {session.streamManagers &&
                    session.streamManagers.map((subscriber, i) => {
                        if (subscriber.stream.connection.data === answerer) {
                            return (
                                <React.Fragment key={i}>
                                    <Item>
                                        정답자 : {answerer}
                                        <VideoComponent
                                            width="350px"
                                            height="320px"
                                            streamManager={subscriber}
                                        />
                                    </Item>
                                </React.Fragment>
                            );
                        }
                    })}

                {session.streamManagers &&
                    session.streamManagers.map((subscriber, i) => {
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
                                        {subscriber.stream.connection.data}
                                        <VideoComponent
                                            width="350px"
                                            height="320px"
                                            streamManager={subscriber}
                                        />
                                    </Item>
                                </React.Fragment>
                            );
                        }
                    })}
            </Box>
            <NotificationContainer show={showNotification}>
                {text}
            </NotificationContainer>
            <NotificationContainer show={showLoading}>
                집계중 입니다. 잠시만 기다려 주세요.
            </NotificationContainer>
        </Container>
    );
};

export default LiarVote;
