import React, { useState, useEffect } from "react";
import WaitingRoom from "./game/WaitingRoom";
import TopBottomVideo from "./game/TopBottomVideo";
import WordDescription from "./game/WordDescription";
import { useDispatch, useSelector } from "react-redux";
import { ovActions } from "../store/openviduSlice";
import { useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import ScoreTotal from "../views/game/ScoreTotal";
import SelectLiar from "../views/game/SelectLiar";
import SelectAnswer from "../views/game/SelectAnswer";
import OtherView from "../views/game/OtherView";
import OpenLiar from "../views/game/OpenLiar";
import { outRoom } from "../api/room";
import Loading from "./Loading";
import { gameActions } from "../store/gameSlice";
import { closeModal, openModal } from "../store/modalSlice";
import { deleteVote } from "../api/game";

const PHASES = {
    // Test: "Test", // 테스트단계에서는 세션아이디는 받아오지만 실제 방에 들어가진 않도록 함
    Wait: "Wait",
    GameVote: "GameVote",
    Quiz: "Quiz",
    Category: "Category",
    Desc: "Desc",
    QnA: "QnA",
    Ans: "Ans",
    EmgAns: "EmgAns",
    LiarVote: "LiarVote",
    SelectAns: "SelectAns",
    OtherView: "OtherView",
    OpenLiar: "OpenLiar",
    MidScore: "MidScore",
    FinScore: "FinScore",
    DupVote: "DupVote", // 최하위플레이어가 동점일때
    Dance: "Dance",
    Paint: "Paint",
};

const PHASE_COMPONENTS = [
    {
        type: PHASES.Wait,
        component: <WaitingRoom />,
    },
    {
        type: PHASES.Quiz,
        component: <TopBottomVideo />,
    },
    {
        type: PHASES.Category,
        component: <TopBottomVideo />,
    },
    {
        type: PHASES.MidScore,
        component: <ScoreTotal />,
    },
    {
        type: PHASES.LiarVote,
        component: <SelectLiar />,
    },
    {
        type: PHASES.SelectAns,
        component: <SelectAnswer />,
    },
    {
        type: PHASES.OtherView,
        component: <OtherView />,
    },
    {
        type: PHASES.OpenLiar,
        component: <OpenLiar />,
    },
    {
        type: PHASES.Desc,
        component: <WordDescription />,
    },
];

const Game = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { subscribers, myUserName, token, mySessionId, playerId, owner } =
        openvidu;
    const { gameVoteCnt } = game;
    // State 업데이트를 더 잘 다루기 위해 여러 useState를 사용합니다.
    const [OV, setOV] = useState(new OpenVidu());
    const [session, setSession] = useState(OV.initSession());
    const [mainStreamManager, setMainStreamManager] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [subscribersList, setSubscribersList] = useState([]);

    const phaseType = useSelector((state) => state.phase.phaseType);
    const dispatch = useDispatch(); //dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    const navigate = useNavigate();

    useEffect(() => {
        const initializeSession = async () => {
            const newSession = session;

            newSession.on("streamCreated", (event) => {
                const subscriber = newSession.subscribe(event.stream, {
                    nickname: myUserName,
                });
                console.log(subscriber);
                dispatch(
                    ovActions.updateSubscribers(...subscribersList, subscriber),
                );
                setSubscribersList(subscribers);
            });

            newSession.on("streamDestroyed", (event) => {
                console.log("파괴");
                console.log(session);
                deleteSubscriber(event.stream.streamManager);
            });

            newSession.on("exception", (exception) => {
                console.warn(exception);
            });

            try {
                await newSession.connect(token, myUserName);
                const publisher = await OV.initPublisherAsync(undefined, {
                    audioSource: undefined,
                    videoSource: undefined,
                    publishAudio: true,
                    publishVideo: true,
                    resolution: "640x480",
                    frameRate: 30,
                    insertMode: "APPEND",
                    mirror: false,
                });

                console.log(publisher);
                newSession.publish(publisher);
                dispatch(ovActions.savePublisher(publisher)); // Save the publisher to the state

                newSession.on("signal:startGameVote", () => {
                    dispatch(
                        openModal({
                            modalType: "ReadyModal",
                            isOpen: true,
                        }),
                    );
                });

                newSession.on("signal:gameId", (event) => {
                    const gameId = event.data;
                    dispatch(gameActions.saveGameId(gameId));
                });

                newSession.on("signal:agree", (event) => {
                    const newCnt = event.data;
                    console.log(newCnt);
                    // 발도장 찍어야함 -> 찬성 수 리덕스로 저장하고 조회해갈까?
                    dispatch(gameActions.saveGameVoteCnt(newCnt + 1));
                });

                newSession.on("signal:disagree", (event) => {
                    console.log("disagree");
                    dispatch(closeModal());
                });

                // // 투표 수락 or 거절 post to openvidu -> check에 찬성에 대한 state(agree)보내서 찬성 인원 수 표현
                // export const signalVote = async (check, sessionId, cnt) => {
                //     OPENVIDU.post(`/openvidu/api/signal`, {
                //         session: sessionId,
                //         to: [],
                //         type: check === "T" ? "agree" : "disagree",
                //         data: `${cnt + 1}`,
                //     })
                //         .then((data) => console.log(data))
                //         .catch((err) => console.log(err));
                // };

                var devices = await OV.getDevices();

                var videoDevices = devices.filter(
                    (device) => device.kind === "videoinput",
                );

                var currentVideoDeviceId = publisher.stream
                    .getMediaStream()
                    .getVideoTracks()[0]
                    .getSettings().deviceId;

                var currentVideoDevice = videoDevices.find(
                    (device) => device.deviceId === currentVideoDeviceId,
                );
                dispatch(ovActions.saveCurrentVideoDevice(currentVideoDevice));
                dispatch(ovActions.saveMainStreamManager(publisher));

                setPublisher(publisher);

                session.signal({});
                console.log(currentVideoDevice);
                console.log("success connect to the session");

                newSession.on("signal:chat", (event) => {
                    const userName = event.from.data;
                    const userMessage = event.data;
                    const messageData = { userName, userMessage };
                    dispatch(ovActions.updateMessage(messageData));
                });
            } catch (error) {
                console.log(
                    "There was an error connecting to the session:",
                    error,
                );
            }

            setSession(newSession); // 세션 객체 업데이트
            console.log(session);
            dispatch(ovActions.saveSession(session));
            console.log(subscribers);
            setSubscribersList(subscribers);
            console.log(subscribersList);
        };

        initializeSession();
    }, [OV, token]);

    useEffect(() => {
        // componentDidMount
        console.log("didmount");

        setSession(OV.initSession());

        if (!mySessionId) navigate("/error");
        window.addEventListener("beforeunload", leaveSession);

        // componentWillUnmount
        return () => {
            console.log("willunmount");
            window.removeEventListener("beforeunload", onbeforeunload);
        };
    }, []);

    const deleteSubscriber = (streamManager) => {
        console.log("delete 호출");
        console.log(streamManager);
        console.log(subscribersList);
        const updatedSubscribers = subscribersList.filter(
            (sub) => sub.stream.streamId !== streamManager.stream.streamId,
        );
        console.log(updatedSubscribers);
        setSubscribersList(updatedSubscribers);
        dispatch(ovActions.saveSubscribers(updatedSubscribers));
        outRoom(mySessionId, playerId);
        console.log(subscribersList);
    };
    const leaveSession = () => {
        const mySession = session;
        console.log(mySession);
        if (mySession) {
            mySession.disconnect();
        }

        // 모든 state 업데이트 초기화
        setOV(null);
        setSession(undefined);
        setMainStreamManager(undefined);
        setPublisher(undefined);
        setSubscribersList([]);
        dispatch(ovActions.leaveSession());
    };
    const findPhase = PHASE_COMPONENTS.find(
        (phase) => phase.type === phaseType,
    );

    if (!findPhase) {
        // 해당 phaseType에 맞는 컴포넌트를 찾지 못한 경우 오류 처리
        return <h1>Invalid phaseType: {phaseType}</h1>;
    }

    const renderPhase = () => {
        return <>{findPhase.component}</>;
    };

    return <>{renderPhase()}</>;
};

export default Game;
