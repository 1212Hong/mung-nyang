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
import { Result } from "../../api/game";
import { gameActions } from "../../store/gameSlice";

const OpenLiar = () => {
    const setId = useSelector((state) => state.game.setId);
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const pickedLiar = useSelector((state) => state.game.selectedLiar);
    console.log(pickedLiar);
    const selectedAnswer = useSelector((state) => state.game.selectedAnswer);
    console.log(selectedAnswer);
    const dispatch = useDispatch();

    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, publisher } = openvidu;

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const response = await Result(
                    setId,
                    roomId,
                    pickedLiar,
                    selectedAnswer,
                );
                const result = response.data;
                console.log(result);

                dispatch(gameActions.updateResult(result));
                dispatch(changePhase({ phaseType: "MidScore" }));
            } catch (error) {
                console.error(error);
            }
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Container>
            <Timer />
            <AnswerBox>
                {publisher && (
                    <AnswerItem>
                        <VideoComponent
                            width="500px"
                            height="400px"
                            streamManager={publisher}
                        />
                    </AnswerItem>
                )}
                <Card description={selectedAnswer} />
            </AnswerBox>
            <UserBox>
                {subscribers &&
                    subscribers.map((sub, i) => (
                        <React.Fragment key={i}>
                            <OtherUsers>
                                <VideoComponent
                                    width="232px"
                                    height="235px"
                                    streamManager={sub}
                                />
                            </OtherUsers>
                        </React.Fragment>
                    ))}
            </UserBox>
        </Container>
    );
};

export default OpenLiar;
