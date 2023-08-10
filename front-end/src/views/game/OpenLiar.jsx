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
import { liarAnswer } from "../../api/game";
import { openviduSlice } from "../../store/openviduSlice";

const OtherView = () => {
    const setId = useSelector((state) => state.openvidu.setId);
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const pickedLiar = useSelector((state) => state.openvidu.selectedLiar);
    console.log(pickedLiar);
    const selectedAnswer = "사과";
    const dispatch = useDispatch();

    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, publisher } = openvidu;
    console.log(publisher);
    console.log(publisher.session.connection.data);
    console.log(subscribers);
    console.log(subscribers[0].stream.connection.data);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const response = await liarAnswer(
                    setId,
                    roomId,
                    pickedLiar,
                    selectedAnswer,
                );
                console.log(response);
                const result = response.data;
                console.log(result);

                dispatch(openviduSlice.actions.updateResult(result));
                dispatch(changePhase({ phaseType: "Wait" }));
            } catch (error) {
                console.error("Error submitting liar answer:", error);
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

export default OtherView;
