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
import { useDispatch } from "react-redux";

const OtherView = (props) => {
    const { selectedAnswer } = props;
    const userlist = ["댕댕이1", "댕댕이2", "댕댕이3", "댕댕이4", "댕댕이5"];
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(changePhase({ phaseType: "Wait" }));
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
