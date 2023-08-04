import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import VideoComponent from "../../components/VideoBoxing";
import { OtherUsers, Container } from "../../components/layout/common";
import Timer from "../../components/Timer";
import {
    NotificationContainer,
    Overlay,
} from "../../components/layout/selectAnswer";
import {
    PenaltyBox,
    LeftItem,
    RightItem,
    Video,
    Buttons,
    UsersBox,
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
            <PenaltyBox>
                <LeftItem>
                    <Video>
                        <iframe
                            width="330"
                            height="587"
                            src={url}
                            title="벌칙영상"
                            allow="autoplay"
                        ></iframe>
                    </Video>
                </LeftItem>
                <RightItem>
                    <VideoComponent
                        width="800px"
                        height="450px"
                    ></VideoComponent>
                </RightItem>
                <Buttons>
                    <Button
                        width="100px"
                        height="150px"
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
                </Buttons>
            </PenaltyBox>
            <UsersBox>
                {userlist.map((index) => (
                    <OtherUsers key={index}>
                        <VideoComponent width="230" height="200" />
                    </OtherUsers>
                ))}
            </UsersBox>
            <Overlay show={showNotification} />
            <NotificationContainer show={showNotification}>
                벌칙자 : {penalty}
            </NotificationContainer>
        </Container>
    );
};
export default Dance;
