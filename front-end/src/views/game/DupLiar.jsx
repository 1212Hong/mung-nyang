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

const DupLiar = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { session, publisher, owner } = openvidu;
    const setId = useSelector((state) => state.game.setId);
    const [showNotification, setShowNotification] = useState(true);
    const text = "중복 투표가 나왔습니다. 라이어를 다시 선택하세요.";
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
                const mostVotedNickname =
                    selectedLiarResponse.data.mostVotedNicknames[0];
                console.log(mostVotedNickname);
                dispatch(gameActions.saveLiar(mostVotedNickname));
                const signalLiard = async () => {
                    session.signal({
                        data: mostVotedNickname,
                        to: [],
                        type: "dupVotedLiar",
                    });
                };
                signalLiard();

                if (publisher.stream.connection.data === mostVotedNickname) {
                    dispatch(changePhase("SelectAns"));
                } else {
                    dispatch(changePhase("OtherView"));
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
            <Timer onTimerEnd={() => setAnswered(true)} />
            <Box>
                {session.streamManagers &&
                    session.streamManagers.map((subscriber, i) => {
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
                                        <VideoComponent
                                            width="350px"
                                            height="320px"
                                            streamManager={subscriber}
                                        />
                                    </Item>
                                </React.Fragment>
                            );
                        }

                        return null;
                    })}
                {session.streamManagers &&
                    session.streamManagers.map((subscriber, i) => {
                        const nickname = subscriber.stream.connection.data;
                        const isDisplayed = updatedDupLiars.includes(nickname);

                        if (!isDisplayed) {
                            return (
                                <React.Fragment key={i}>
                                    <Item>
                                        <VideoComponent
                                            width="350px"
                                            height="320px"
                                            streamManager={subscriber}
                                        />
                                    </Item>
                                </React.Fragment>
                            );
                        }

                        return null;
                    })}
            </Box>
            <NotificationContainer show={showNotification}>
                {text}
            </NotificationContainer>
        </Container>
    );
};

export default DupLiar;
