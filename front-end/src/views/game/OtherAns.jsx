import React from "react";
import VideoComponent from "../../components/VideoBoxing";
import Card from "../../components/Card";
import imageSrc from "../../assets/img/clock.png";
import Timer from "../../components/Timer";
import { Container, User } from "../../components/layout/common";
import {
    AnswerBox,
    AnswerItem,
    UserBox,
} from "../../components/layout/otherAns";

const OtherViewAnswer = (props) => {
    const { user_list } = props;
    const text = "정답자가 정답을 입력 중입니다.";

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
                {user_list.map((index) => (
                    <User key={index}>
                        <VideoComponent width="235px" height="235px" />
                    </User>
                ))}
            </UserBox>
        </Container>
    );
};

export default OtherViewAnswer;
