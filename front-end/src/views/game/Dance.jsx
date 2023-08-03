import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import VideoComponent from "../../components/VideoBoxing";
import { Box, Container } from "../../components/layout/common";
import Timer from "../../components/Timer";
import {
    NotificationContainer,
    Overlay,
} from "../../components/layout/selectAnswer";
import {
    Body,
    Left,
    Right,
    Video,
    Btn,
    Users,
} from "../../components/layout/dance";

const Dance = (props) => {
    const { userlist } = props;
    const [showNotification, setShowNotification] = useState(true);
    const url = "https://www.youtube.com/embed/8vPs-hdMGWQ";
    const penalty = "허스키";

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
            <Timer />
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
