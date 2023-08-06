import React from "react";
import VideoComponent from "../../components/VideoBoxing";
import Card from "../../components/Card";
import imageSrc from "../../assets/img/clock.png";
import Timer from "../../components/Timer";
import { Container, OtherUsers } from "../../components/layout/common";
import {
    AnswerBox,
    AnswerItem,
    UserBox,
} from "../../components/layout/otherView";

const OtherView = (props) => {
    const { text, userlist } = props;
    return (
        <Container>
            <Timer />
            <AnswerBox>
                <AnswerItem>
                    <VideoComponent width="500px" height="400px" />
                </AnswerItem>
                <Card imageSrc={imageSrc} description={text} />
            </AnswerBox>
            <UserBox>
                {userlist.map((index) => (
                    <OtherUsers key={index}>
                        <VideoComponent width="235px" height="235px" />
                    </OtherUsers>
                ))}
            </UserBox>
        </Container>
    );
};

export default OtherView;
