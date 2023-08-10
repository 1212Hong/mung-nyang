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

const OtherView = (props) => {
    const { text } = props;
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, publisher } = openvidu;
    console.log(subscribers);

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
