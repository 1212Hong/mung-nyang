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
} from "../../components/layout/otherView";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Result, deleteLiar } from "../../api/game";
import { gameActions } from "../../store/gameSlice";
import { SubText } from "../../components/layout/common";
import { Overlay } from "../../components/layout/selectAnswer";
import { NotificationContainer } from "../../components/layout/selectLiar";

const OpenLiar = () => {
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const pickedLiar = useSelector((state) => state.game.selectedLiar);
    const game = useSelector((state) => state.game);
    const { setId, liarName, selectedAnswer } = game;
    console.log(pickedLiar);
    console.log(liarName);
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { session, owner } = openvidu;
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
                    dispatch(gameActions.updateResult("라이어 승리"));
                } else if (result === "LiarLose_Fail") {
                    dispatch(gameActions.updateResult("시민 승리"));
                } else if (result === "LiarWin_NotLiar") {
                    dispatch(gameActions.updateResult("라이어 승리"));
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
        }, 8000);

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
                                            지목된 사람 : {pickedLiar}
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
                    <Card description={selectedAnswer} />
                ) : (
                    session.streamManagers &&
                    session.streamManagers.map((sub, i) => (
                        <React.Fragment key={i}>
                            {sub.stream.connection.data === liarName && (
                                <OtherUsers>
                                    <SubText>라이어 : {liarName}</SubText>
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
                                        height="235px"
                                        streamManager={sub}
                                    />
                                </OtherUsers>
                            )}
                        </React.Fragment>
                    ))}
            </UserBox>
            <Overlay show={showNotification} />
            <NotificationContainer show={showNotification}>
                잠시후 라이어가 공개됩니다.
            </NotificationContainer>
        </Container>
    );
};

export default OpenLiar;
