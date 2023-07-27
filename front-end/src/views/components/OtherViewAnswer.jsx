import React from "react";
import styled from "styled-components";
import VideoComponent from "../../components/VideoBoxing";

const Container = styled.div`
    margin: 5px;
`;
const Box = styled.div`
    margin-left: 45px;
    float: left;
`;
const Head = styled.div``;
const Answer = styled.div`
    background-color: ${`var(--beige-dark)`};
    width: 400px;
    height: 400px;
    margin-left: 120px;
    margin-right: 100px;
    margin-bottom: 30px;
    float: left;
    color: ${`var(--brown-dark)`};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 32px;
`;
const Comment = styled.div`
    background-color: ${`var(--beige-dark)`};
    width: 400px;
    height: 400px;
    margin-left: 120px;
    margin-right: 100px;
    margin-bottom: 30px;
    float: left;
    color: ${`var(--brown-dark)`};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 32px;
    padding-left: 30px;
`;
const OtherViewAnswer = (props) => {
    const { text } = props;
    const width = "200px";
    const height = "200px";

    return (
        <Container>
            <Head>
                <Answer>
                    <VideoComponent
                        width="400px"
                        height="400px"
                    ></VideoComponent>
                </Answer>
                <Comment>{text}</Comment>
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
