import React, { useState, useEffect } from "react";
import VideoComponent from "../../components/VideoComponent";
import Card from "../../components/Card";
import Timer from "../../components/Timer";
import { Container, OtherUsers } from "../../components/layout/common";
import {
    AnswerBox,
    AnswerItem,
    UserBox,
    Center,
    NickName,
    Notification,
} from "../../components/layout/otherView";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Result, deleteLiar } from "../../api/game";
import { gameActions } from "../../store/gameSlice";
import { SubText } from "../../components/layout/common";

const OpenLiar = () => {
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const pickedLiar = useSelector((state) => state.game.selectedLiar);
    const game = useSelector((state) => state.game);
    const { setId, liarName, selectedAnswer } = game;
    console.log(pickedLiar);
    console.log(liarName);
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { session, owner, subscribers, publisher } = openvidu;
    const [answered, setAnswered] = useState(false);
    const [note, setNote] = useState(false);
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const getRes = async () => {
            try {
                const response = await Result(
                    setId,
                    roomId,
                    pickedLiar,
                    selectedAnswer,
                );
                const result = response.data.resultReturn;
                console.log(result);
                if (result === "LiarWin_Success") {
                    dispatch(gameActions.updateResult("고양이 승리"));
                } else if (result === "LiarLose_Fail") {
                    dispatch(gameActions.updateResult("강아지 승리"));
                } else if (result === "LiarWin_NotLiar") {
                    dispatch(gameActions.updateResult("고양이 승리"));
                }

                const signalResult = async () => {
                    session.signal({
                        data: result,
                        to: [],
                        type: "getresult",
                    });
                };
                signalResult();

                await deleteLiar(setId);
            } catch (error) {
                console.error(error);
            }
        };
        owner && getRes();

        subscribers.map((item) => {
            item.subscribeToAudio(true);
        });
        publisher.publishAudio(true);
    }, []);

    useEffect(() => {
        const handlescore = () => {
            setShowNotification(false);
            setNote(true);
        };
        if (answered) {
            handlescore();
        }
    }, [answered]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(changePhase("MidScore"));
        }, 6000);

        return () => {
            clearTimeout(timer);
        };
    }, [note]);

    return (
        <Container>
            <Timer time={5} onTimerEnd={() => setAnswered(true)} />

            <AnswerBox>
                {session.streamManagers &&
                    session.streamManagers.map((sub, i) => (
                        <React.Fragment key={i}>
                            {sub.stream.connection.data === pickedLiar && (
                                <AnswerItem>
                                    <Center>
                                        <SubText>
                                            의심받은 강아지 : {pickedLiar}
                                        </SubText>
                                        <VideoComponent
                                            width="500px"
                                            height="400px"
                                            streamManager={sub}
                                        />
                                    </Center>
                                </AnswerItem>
                            )}
                        </React.Fragment>
                    ))}
                {showNotification ? (
                    <Card
                        description={`지목된 사람이 고른 정답은 ${selectedAnswer}입니다`}
                    />
                ) : (
                    session.streamManagers &&
                    session.streamManagers.map((sub, i) => (
                        <React.Fragment key={i}>
                            {sub.stream.connection.data === liarName && (
                                <OtherUsers>
                                    <SubText>고양이 : {liarName}</SubText>
                                    <VideoComponent
                                        width="500px"
                                        height="400px"
                                        streamManager={sub}
                                    />
                                </OtherUsers>
                            )}
                        </React.Fragment>
                    ))
                )}
            </AnswerBox>
            <UserBox>
                {session.streamManagers &&
                    session.streamManagers.map((sub, i) => (
                        <React.Fragment key={i}>
                            {sub.stream.connection.data !== pickedLiar && (
                                <OtherUsers>
                                    <VideoComponent
                                        width="232px"
                                        height="200px"
                                        streamManager={sub}
                                    />
                                    <NickName>
                                        <SubText>
                                            {sub.stream.connection.data}
                                        </SubText>
                                    </NickName>
                                </OtherUsers>
                            )}
                        </React.Fragment>
                    ))}
            </UserBox>
            <Notification show={showNotification}>
                잠시후 고양이가 공개됩니다.
            </Notification>
        </Container>
    );
};

export default OpenLiar;
