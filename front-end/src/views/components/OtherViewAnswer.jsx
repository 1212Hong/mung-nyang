import React from "react";
import styled from "styled-components";
import VideoComponent from "../../components/VideoBoxing";
import Card from "../../components/Card";
import imageSrc from "../../assets/img/clock.png";

const Container = styled.div`
    margin: 5px;
    padding-left: 20px;
`;
const Box = styled.div`
    margin-left: 40px;
    float: left;
`;
const Head = styled.div`
    display: grid;
    grid-template-columns: 830px 800px;
`;
const Answer = styled.div`
    background-color: ${`var(--beige-dark)`};
    width: 500px;
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
    const { text } = props;
    const width = "250px";
    const height = "200px";
    return (
        <Container>
            <Head>
                <Answer>
                    <VideoComponent
                        width="500px"
                        height="400px"
                    ></VideoComponent>
                </Answer>

                <Card imageSrc={imageSrc} description={text}></Card>
            </Head>
            <Box>
                <VideoComponent width={width} height={height}></VideoComponent>
            </Box>
            <Box>
                <VideoComponent width={width} height={height}></VideoComponent>
            </Box>
            <Box>
                <VideoComponent width={width} height={height}></VideoComponent>
            </Box>
            <Box>
                <VideoComponent width={width} height={height}></VideoComponent>
            </Box>
            <Box>
                <VideoComponent width={width} height={height}></VideoComponent>
            </Box>
        </Container>
    );
};
export default OtherViewAnswer;
