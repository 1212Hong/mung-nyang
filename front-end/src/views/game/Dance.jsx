import React, { useState, useEffect } from "react";
import store from "../../store";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import VideoComponent from "../../components/VideoComponent";
import { OtherUsers, Container } from "../../components/layout/common";
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
    const { passCnt } = game;
    const penaltyUser = "깊은 치와와";
    const { session, owner, mySessionId, myUserName } = openvidu;
    const roomId = mySessionId;
    const [showNotification, setShowNotification] = useState(true);
    const [videoId, setVideoId] = useState("");
    const [complete, setComplete] = useState(false);
    const dispatch = useDispatch();

    const sendVideoId = async (videoId) => {
        session.signal({
            data: videoId,
            to: [],
            type: "videoData",
        });
    };
    const sendGameEnd = async () => {
        session.signal({
            data: "",
            to: [],
            type: "resetInfo",
        });
    };
    const signalPassVote = async (passCnt) => {
        await session.signal({
            data: `${String(Number(passCnt) + 1)}`,
            to: [],
            type: "addPassCnt",
        });
    };
    const passVoteEnd = async () => {
        owner && (await InitializedData(roomId));
        owner && sendGameEnd();
        session.on("signal:resetInfo", () => {
            dispatch(gameActions.reset());
            dispatch(changePhase("Wait"));
        });
    };
    const addCount = async (passCnt) => {
        session.on("signal:addPassCnt", (event) => {
            dispatch(gameActions.updatePassCnt(event.data));
        });
    };
    useEffect(() => {
        const fetchDanceUrl = async () => {
            const info = await getDanceUrl();
            console.log(info);
            const newVideoId = info.danceUrl.split("/shorts/")[1];
            sendVideoId(newVideoId);
        };

        owner && fetchDanceUrl();
        session.on("signal:videoData", (event) => {
            setVideoId(event.data);
        });

        // const fetchPenaltyUser = async (roomId) => {
        //     await getPenaltyUser(roomId);
        //     store.dispatch(gameActions.updatePenaltyUser(penaltyUser));
        // };
        // fetchPenaltyUser(roomId);
    }, []);

    useEffect(() => {
        console.log("비교 :", session.streamManagers.length - 1, passCnt);
        if (Number(passCnt) === session.streamManagers.length - 1) {
            passVoteEnd();
        }
        addCount(passCnt);
    }, [passCnt]);

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
    console.log(nonPenaltyUsers);
    return (
        <Container>
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
                        disabled={myUserName === penaltyUser || complete}
                        onClick={async () => {
                            if (myUserName !== penaltyUser && !complete) {
                                setComplete(true);
                                await signalPassVote(passCnt);
                                addCount(passCnt);
                            }
                        }}
                    >
                        {complete ? "완료" : "PASS"}
                    </Button>
                    <Button
                        width="100px"
                        height="150px"
                        color="black"
                        fontSize="32px"
                        disabled={true}
                    >
                        찬성 {passCnt}/{session.streamManagers.length - 1}
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
