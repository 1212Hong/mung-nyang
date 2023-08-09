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
    // const roomId = useSelector((state) => state.openvidu.mySessionId);
    const roomId = "테스트";
    const pickedLiar = useSelector((state) => state.openvidu.selectedLiar);
    console.log(pickedLiar);
    const selectedAnswer = "사과";
    const userlist = ["댕댕이1", "댕댕이2", "댕댕이3", "댕댕이4", "댕댕이5"];
    const dispatch = useDispatch();

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
                <AnswerItem>
                    <VideoComponent width="500px" height="400px" />
                </AnswerItem>
                <Card description={selectedAnswer} />
            </AnswerBox>
            <UserBox>
                {userlist.map((index) => (
                    <OtherUsers key={index}>
                        <VideoComponent width="232px" height="235px" />
                    </OtherUsers>
                ))}
            </UserBox>
        </Container>
    );
};

export default OtherView;
