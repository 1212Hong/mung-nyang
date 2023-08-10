import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import VideoComponent from "../../components/VideoComponent";
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
import { usePenaltyUser, useDanceUrl } from "../../hooks/dance";

function Dance() {
    const openvidu = useSelector((state) => state.openvidu);
    const { publisher, subscribers, mySessionId } = openvidu;
    const roomId = mySessionId;
    const [showNotification, setShowNotification] = useState(true);
    const danceUrl = useDanceUrl();
    const { fetchPenaltyUser, penaltyUser } = usePenaltyUser(openvidu.roomId);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
            fetchPenaltyUser();
            console.log(penaltyUser);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [fetchPenaltyUser, penaltyUser]);

    const nonPenaltyUsers = [...subscribers, publisher].filter(
        (user) => user !== penaltyUser,
    );

    return (
        <Container>
            <Timer />
            <PenaltyBox>
                <LeftItem>
                    <Video>
                        <iframe
                            width="330"
                            height="587"
                            src={danceUrl}
                            title="벌칙영상"
                            allow="autoplay"
                        ></iframe>
                    </Video>
                </LeftItem>
                <RightItem>
                    <VideoComponent width="800px" height="450px">
                        {penaltyUser && (
                            <iframe
                                width="100%"
                                height="100%"
                                src={penaltyUser.videoUrl}
                                title="Penalty Video"
                                allow="autoplay"
                            ></iframe>
                        )}
                    </VideoComponent>
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
                {nonPenaltyUsers.map((index) => (
                    <OtherUsers key={index}>
                        <VideoComponent width="230" height="200" />
                    </OtherUsers>
                ))}
            </UsersBox>
            <Overlay show={showNotification} />
            <NotificationContainer show={showNotification}>
                벌칙자 : {penaltyUser}
            </NotificationContainer>
        </Container>
    );
}
export default Dance;
