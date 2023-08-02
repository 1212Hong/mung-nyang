import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import VideoComponent from "../../components/VideoBoxing";
import { Box } from "../../components/layout/common";
import Timer from "../../components/Timer";

const Container = styled.div`
    margin-top: 20px;
`;
const Body = styled.div`
    margin-top: 10px;
    display: flex;
`;
const Left = styled.div`
    flex: 1;
    display: flex;
`;
const Right = styled.div`
    flex: 2;
`;
const Video = styled.div`
    margin-left: 30px;
    width: 253px;
    height: 450px;
    iframe {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const Btn = styled.div`
    margin-left: 20px;
    margin-top: 10px;
`;
const Users = styled.div`
    margin-top: 10px;
`;

const Dance = (props) => {
    const { url, userlist, penalty } = props;
    return (
        <Container>
            <Timer></Timer>
            <Body>
                <Left>
                    <Video>
                        <iframe
                            width="330"
                            height="587"
                            src={url}
                            title="벌칙영상"
                            allow="autoplay"
                        ></iframe>
                    </Video>
                    <Btn>
                        <Button width="50px">PASS</Button>
                        <Button width="50px">FAIL</Button>
                    </Btn>
                </Left>
                <Right>
                    <VideoComponent
                        width="830px"
                        height="450px"
                    ></VideoComponent>
                </Right>
            </Body>
            <Users>
                {userlist.map((user, index) => (
                    <Box key={index}>
                        <VideoComponent width="200" height="200" />
                    </Box>
                ))}
            </Users>
        </Container>
    );
};
export default Dance;
