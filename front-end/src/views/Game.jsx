import React, { useState, useEffect } from "react";
import WaitingRoom from "./game/WaitingRoom";
import TopBottomVideo from "./game/TopBottomVideo";
import { useDispatch, useSelector } from "react-redux";
import { ovActions } from "../store/openviduSlice";
import { useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import SelectLiar from "../views/game/SelectLiar";
import SelectAnswer from "../views/game/SelectAnswer";
import OtherView from "../views/game/OtherView";
import OpenLiar from "../views/game/OpenLiar";
import { outRoom } from "../api/room";

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

const roomId = 3;
const selectAnswerText = "지목된 사람이 정답을 선택 중입니다.";
const selectedAnswer = "축구공";

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
        type: PHASES.LiarVote,
        component: <SelectLiar roomId={roomId} />,
    },
    {
        type: PHASES.SelectAns,
        component: <SelectAnswer />,
    },
    {
        type: PHASES.OtherView,
        component: <OtherView text={selectAnswerText} />,
    },
    {
        type: PHASES.OpenLiar,
        component: <OpenLiar selectedAnswer={selectedAnswer} />,
    },
];

const Game = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, myUserName, token, mySessionId, playerId } = openvidu;
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
                const subscriber = newSession.subscribe(
                    event.stream,
                    undefined,
                );
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

                console.log(currentVideoDevice);
                console.log("success connect to the session");
            } catch (error) {
                console.log(
                    "There was an error connecting to the session:",
                    error,
                );
            }

            setSession(newSession); // 세션 객체 업데이트
            console.log(session);
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
