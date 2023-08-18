import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import VideoComponent from "../../components/VideoComponent";
import {
    OtherUsers,
    Container,
    SmallText,
    SubText,
} from "../../components/layout/common";
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
    VideoBox,
    NameBox,
} from "../../components/layout/dance";
import { getPenaltyUser, getDanceUrl } from "../../hooks/dance";
import { gameActions } from "../../store/gameSlice";
import { changePhase } from "../../store/phaseSlice";
import { InitializedData, RecordStart, RecordStop } from "../../api/game";
import { Videobox, VideoUserName } from "../../components/layout/waiting";
import { NickName } from "../../components/layout/otherView";

function Dance() {
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { penaltyUser, passCnt, gameId, videoId } = game;
    const { session, owner, mySessionId, myUserName } = openvidu;
    const roomId = mySessionId;
    const [showNotification, setShowNotification] = useState(true);
    // const [videoId, setVideoId] = useState("");
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
    const addCount = async () => {
        session.on("signal:addPassCnt", (event) => {
            dispatch(gameActions.updatePassCnt(event.data));
        });
    };
    useEffect(() => {
        const fetchDanceUrl = async () => {
            const info = await getDanceUrl();
            console.log(info);
            const newVideoId = info.danceUrl.split("/shorts/")[1];
            await sendVideoId(newVideoId);
        };

        owner && fetchDanceUrl();

        const fetchPenaltyUser = async (roomId) => {
            const pUser = await getPenaltyUser(roomId);
            console.log(pUser);
            dispatch(gameActions.updatePenaltyUser(pUser.data));
            await session.signal({
                data: pUser.data,
                to: [],
                type: "penaltyUser",
            });
        };
        owner && fetchPenaltyUser(roomId);
        console.log(penaltyUser);

        const startRecord = async (roomId, gameId) => {
            await RecordStart(roomId, gameId);
        };
        owner && startRecord(roomId, gameId);
    }, []);

    useEffect(() => {
        session.on("signal:videoData", (event) => {
            dispatch(gameActions.updateVideoId(event.data));
        });
        session.on("signal:penaltyUser", (e) => {
            console.log(e.data);
            dispatch(gameActions.updatePenaltyUser(e.data));
        });
    }, [videoId]);

    useEffect(() => {
        console.log("비교 :", streams.length - 1, passCnt);
        if (Number(passCnt) === streams.length - 1) {
            const stopRecord = async (roomId, gameId) => {
                await RecordStop(roomId, gameId);
            };
            owner && stopRecord(roomId, gameId);
            passVoteEnd();
        }
        addCount();
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
    console.log(penaltyUser);

    console.log(penaltyStreamer);
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
                        <OtherUsers>
                            <NickName>
                                <SubText>{penaltyUser}</SubText>
                            </NickName>
                            <VideoComponent
                                width="800px"
                                height="425px"
                                streamManager={penaltyStreamer}
                            />
                        </OtherUsers>
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
                        height="200px"
                        color="black"
                        fontSize="20px"
                        disabled
                        shadow="none"
                    >
                        찬성 {passCnt} <br /> 잔여 {streams.length - 1}
                    </Button>
                </Buttons>
            </PenaltyBox>
            <UsersBox>
                {nonPenaltyUsers.map((user, i) => (
                    <VideoBox key={user.stream.connection.data}>
                        <VideoComponent
                            width="230"
                            height="200"
                            streamManager={user}
                        />
                        <NameBox>
                            <VideoUserName>
                                {user.stream.connection.data}
                            </VideoUserName>
                        </NameBox>
                    </VideoBox>
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
