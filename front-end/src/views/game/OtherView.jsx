import React, { useState, useEffect } from "react";
import VideoComponent from "../../components/VideoComponent";
import Card from "../../components/Card";
import imageSrc from "../../assets/img/clock.png";
import Timer from "../../components/Timer";
import { Container, OtherUsers } from "../../components/layout/common";
import {
    AnswerBox,
    AnswerItem,
    UserBox,
} from "../../components/layout/otherView";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";

const OtherView = () => {
    const text = "지목된 사람이 정답을 선택 중입니다.";
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, publisher } = openvidu;

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(changePhase({ phaseType: "OpenLiar" }));
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
                <Card imageSrc={imageSrc} description={text} />
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
