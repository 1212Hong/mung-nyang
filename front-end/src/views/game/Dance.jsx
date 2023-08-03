import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import VideoComponent from "../../components/VideoBoxing";
import { Box } from "../../components/layout/common";
import Timer from "../../components/Timer";
import {
    NotificationContainer,
    Overlay,
} from "../../components/layout/selectAnswer";

const Container = styled.div``;
const Body = styled.div`
    margin-top: 10px;
    display: flex;
`;
const Left = styled.div`
    flex: 1;
`;
const Right = styled.div`
    flex: 3;
    margin-left: 10px;
    display: flex;
`;
const Video = styled.div`
    margin-left: 30px;
    width: 253px;
    height: 450px;
    iframe {
        border-radius: 1.5rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const Btn = styled.div`
    margin-left: 20px;
    margin-right: 5px;
    margin-top: 10px;
`;
const Users = styled.div`
    margin-top: 20px;
`;

const Dance = (props) => {
    const { url, userlist, penalty } = props;
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

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
                </Left>
                <Right>
                    <VideoComponent
                        width="800px"
                        height="450px"
                    ></VideoComponent>
                    <Btn>
                        <Button
                            width="100px"
                            height="150px"
                            margin="40px 0px"
                            color="black"
                            fontSize="32px"
                        >
                            PASS
                        </Button>
                        <Button
                            width="100px"
                            height="150px"
                            color="black"
                            fontSize="32px"
                        >
                            FAIL
                        </Button>
                    </Btn>
                </Right>
            </Body>
            <Users>
                {userlist.map((user, index) => (
                    <Box key={index}>
                        <VideoComponent width="200" height="200" />
                    </Box>
                ))}
            </Users>
            <Overlay show={showNotification} />
            <NotificationContainer show={showNotification}>
                벌칙자 : {penalty}
            </NotificationContainer>
        </Container>
    );
};
export default Dance;
