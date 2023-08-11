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
import { gameActions } from "../../store/gameSlice";
function Dance() {
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { penaltyUser } = game;
    const { session, owner, mySessionId } = openvidu;
    const roomId = mySessionId;
    const [showNotification, setShowNotification] = useState(true);
    const danceInfo = useDanceUrl();
    const { fetchPenaltyUser } = usePenaltyUser(roomId);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
            fetchPenaltyUser();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [penaltyUser]);

    const nonPenaltyUsers = session.streamManagers.filter((user) => {
        return user.stream.connection.data !== penaltyUser;
    });

    return (
        <Container>
            <Timer />
            <PenaltyBox>
                <LeftItem>
                    <Video>
                        <iframe
                            width="330"
                            height="587"
                            src={`https://www.youtube.com/embed/${danceInfo.videoId}?autoplay=1&loop=1&playlist=${danceInfo.videoId}`}
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
