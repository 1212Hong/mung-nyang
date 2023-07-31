import React from "react";
import styled from "styled-components";
import VideoComponent from "../../components/VideoBoxing";
import Card from "../../components/Card";
import imageSrc from "../../assets/img/clock.png";
import Timer from "../../components/Timer";
import { Box } from "../../components/layout";

const Head = styled.div`
    margin-top: 40px;
    display: grid;
    grid-template-columns: 700px 600px;
`;
const Answer = styled.div`
    background-color: ${`var(--beige-dark)`};
    width: 400px;
    height: 400px;
    margin-left: 150px;
    margin-right: 150px;
    margin-bottom: 30px;
    float: left;
    color: ${`var(--brown-dark)`};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 32px;
`;

const OtherViewAnswer = (props) => {
    const { text, user_list } = props;
    const width = "200px";
    const height = "200px";

    return (
        <>
            <Timer />
            <Head>
                <Answer>
                    <VideoComponent width="500px" height="400px" />
                </Answer>
                <Card imageSrc={imageSrc} description={text} />
            </Head>
            {user_list.map((user, index) => (
                <Box key={index}>
                    <VideoComponent width={width} height={height} />
                </Box>
            ))}
        </>
    );
};

export default OtherViewAnswer;
