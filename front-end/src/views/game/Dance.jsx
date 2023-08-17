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
import { InitializedData, RecordStart, RecordStop } from "../../api/game";

function Dance() {
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { penaltyUser, passCnt, gameId } = game;
    const { session, owner, mySessionId, myUserName } = openvidu;
    const roomId = mySessionId;
    const [showNotification, setShowNotification] = useState(true);
    const [videoId, setVideoId] = useState("");
    const [complete, setComplete] = useState(false);
    const dispatch = useDispatch();
    const streams = session.streamManagers;

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

        const fetchPenaltyUser = async (roomId) => {
            await getPenaltyUser(roomId);
        };
        fetchPenaltyUser(roomId);
        const startRecord = async (roomId, gameId) => {
            await RecordStart(roomId, gameId);
        };
        owner && startRecord(roomId, gameId);
    }, []);

    useEffect(() => {
        console.log("비교 :", streams.length - 1, passCnt);
        if (Number(passCnt) === streams.length - 1) {
            const stopRecord = async (roomId, gameId) => {
                await RecordStop(roomId, gameId);
            };
            owner && stopRecord(roomId, gameId);
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
    const nonPenaltyUsers = streams.filter((user) => {
        return user.stream.connection.data !== penaltyUser;
    });
    const penaltyStreamer = streams.find((user) => {
        return user.stream.connection.data === penaltyUser;
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
                    {penaltyUser && (
                        <VideoComponent
                            width="800px"
                            height="450px"
                            streamManager={penaltyStreamer}
                        />
                    )}
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
                        찬성 {passCnt} / {streams.length - 1}
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
