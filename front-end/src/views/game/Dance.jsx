import React, { useState, useEffect } from "react";
import store from "../../store";
import { useSelector, useDispatch } from "react-redux";
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
import { getPenaltyUser, getDanceUrl } from "../../hooks/dance";
import { gameActions } from "../../store/gameSlice";
import { changePhase } from "../../store/phaseSlice";
import { InitializedData } from "../../api/game";

function Dance() {
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { penaltyUser } = game;
    const { session, owner, mySessionId } = openvidu;
    const roomId = mySessionId;
    const [showNotification, setShowNotification] = useState(true);
    const [videoId, setVideoId] = useState("");
    const dispatch = useDispatch();

    const sendVideoId = async (videoIdToSend) => {
        session.signal({
            data: JSON.stringify({ type: "videoId", value: videoIdToSend }),
            to: [],
            type: "videoData",
        });
    };
    const handleTimerEnd = async () => {
        // setGameEnd(true);
        await InitializedData(roomId);
        dispatch(gameActions.reset());
        console.log("초기화 확인 : ", game);
        dispatch(changePhase("Wait"));
    };
    useEffect(() => {
        const fetchDanceUrl = async () => {
            try {
                const info = await getDanceUrl();
                console.log(info);
                const newVideoId = info.danceUrl.split("/shorts/")[1];
                setVideoId(newVideoId);
                sendVideoId(newVideoId);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        owner && fetchDanceUrl();

        const fetchPenaltyUser = async (roomId) => {
            try {
                await getPenaltyUser(roomId);
                store.dispatch(gameActions.updatePenaltyUser(penaltyUser));
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchPenaltyUser(roomId);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const nonPenaltyUsers = session.streamManagers.filter((user) => {
        return user.stream.connection.data !== penaltyUser;
    });

    useEffect(() => {
        const handleSignalEvent = (event) => {
            const { type, data } = event;
            if (type === "signal:videoData") {
                const message = JSON.parse(data);
                if (message.type === "videoId") {
                    setVideoId(message.value);
                    console.log("Received videoId:", videoId);
                }
            }
        };

        session.on("signal", handleSignalEvent);

        return () => {
            session.off("signal", handleSignalEvent);
        };
    }, [session, videoId]);

    return (
        <Container>
            <Timer onTimerEnd={handleTimerEnd} />
            <PenaltyBox>
                <LeftItem>
                    <Video>
                        {videoId && (
                            <iframe
                                width="330"
                                height="587"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`}
                                title="벌칙영상"
                                allow="autoplay"
                            ></iframe>
                        )}
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
                {nonPenaltyUsers.map((user) => (
                    <OtherUsers key={user.stream.connection.data}>
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
