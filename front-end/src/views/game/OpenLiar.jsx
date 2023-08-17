import React, { useState, useEffect } from "react";
import VideoComponent from "../../components/VideoComponent";
import Card from "../../components/Card";
import Timer from "../../components/Timer";
import { Container, OtherUsers } from "../../components/layout/common";
import {
    AnswerBox,
    AnswerItem,
    UserBox,
} from "../../components/layout/otherView";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Result, deleteLiar } from "../../api/game";
import { gameActions } from "../../store/gameSlice";
import { MidText, SubText, MainText } from "../../components/layout/common";
import { Overlay } from "../../components/layout/selectAnswer";
import { NotificationContainer } from "../../components/layout/selectLiar";

const OpenLiar = () => {
    const setId = useSelector((state) => state.game.setId);
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const pickedLiar = useSelector((state) => state.game.selectedLiar);
    console.log(pickedLiar);
    const selectedAnswer = useSelector((state) => state.game.selectedAnswer);
    console.log(selectedAnswer);
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
            setShowNotification(true);
            setNote(true);
        };
        if (answered) {
            handlescore();
        }
    }, [answered]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(changePhase("MidScore"));
        }, 3000);

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
                                    <VideoComponent
                                        width="500px"
                                        height="400px"
                                        streamManager={sub}
                                    />
                                </AnswerItem>
                            )}
                        </React.Fragment>
                    ))}
                <MainText>
                    <Card description={selectedAnswer} />
                </MainText>
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
