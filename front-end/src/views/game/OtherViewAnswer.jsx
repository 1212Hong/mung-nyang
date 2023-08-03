import React from "react";
import styled from "styled-components";
import VideoComponent from "../../components/VideoBoxing";
import Card from "../../components/Card";
import imageSrc from "../../assets/img/clock.png";
import Timer from "../../components/Timer";
import { Box } from "../../components/layout/common";

const Container = styled.div``;
const AnswerBox = styled.div`
    margin-top: 40px;
    display: grid;
    grid-template-columns: 690px 600px;
`;
const Answer = styled.div`
    margin-left: 150px;
    margin-right: 150px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
`;
const Content = styled.div``;

const OtherViewAnswer = (props) => {
    const { text, user_list } = props;

    return (
        <Container>
            <Timer />
            <AnswerBox>
                <Answer>
                    <VideoComponent width="500px" height="400px" />
                </Answer>
                <Card imageSrc={imageSrc} description={text} />
            </AnswerBox>
            <Content>
                {user_list.map((index) => (
                    <Box key={index}>
                        <VideoComponent width="230px" height="200px" />
                    </Box>
                ))}
            </Content>
        </Container>
    );
};

export default OtherViewAnswer;
