import React, { useState, useEffect } from "react";
import WaitingRoom from "./game/WaitingRoom";
import TopBottomVideo from "./game/TopBottomVideo";
import { useDispatch, useSelector } from "react-redux";
import { ovActions } from "../store/openviduSlice";
import { useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";

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
];

const Game = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, myUserName, token, mySessionId } = openvidu;
    const [state, setState] = useState({
        OV: new OpenVidu(),
        mySessionId: mySessionId,
        myUserName: myUserName,
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: subscribers,
    });
    console.log("sessiontest", state.session);
    const phaseType = useSelector((state) => state.phase.phaseType);
    const dispatch = useDispatch(); //dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    useEffect(() => {
        const initializeSession = async () => {
            const session = state.OV.initSession();

            session.on("streamCreated", (event) => {
                const subscriber = session.subscribe(event.stream, undefined);
                dispatch(
                    ovActions.updateSubscribers([
                        ...state.subscribers,
                        subscriber,
                    ]),
                );
                console.log("stream", event.stream);
                console.log(subscriber);
                setState((prevState) => ({
                    ...prevState,
                    subscribers: subscribers,
                }));
            });

            session.on("streamDestroyed", (event) => {
                event.preventDefault();
                deleteSubscriber(event.stream.streamManager);
            });

            session.on("exception", (exception) => {
                console.warn(exception);
            });

            setState((prevState) => ({
                ...prevState,
                session,
            }));

            try {
                await session.connect(token, "User 1");
                const publisher = await state.OV.initPublisherAsync(undefined, {
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
                session.publish(publisher);
                dispatch(ovActions.savePublisher(publisher)); // Save the publisher to the state
                console.log(1);
                var devices = await state.OV.getDevices();
                console.log(2);
                var videoDevices = devices.filter(
                    (device) => device.kind === "videoinput",
                );
                console.log(3);
                var currentVideoDeviceId = publisher.stream
                    .getMediaStream()
                    .getVideoTracks()[0]
                    .getSettings().deviceId;
                console.log(4);
                console.log("currentvideodevice", currentVideoDeviceId);
                var currentVideoDevice = videoDevices.find(
                    (device) => device.deviceId === currentVideoDeviceId,
                );
                dispatch(ovActions.saveCurrentVideoDevice(currentVideoDevice));
                dispatch(ovActions.saveMainStreamManager(publisher));

                setState((prevState) => ({
                    ...prevState,
                    currentVideoDevice: currentVideoDevice,
                    mainStreamManager: publisher,
                    publisher: publisher,
                }));
                console.log("end");
            } catch (error) {
                console.log(
                    "There was an error connecting to the session:",
                    error.code,
                    error.message,
                );
            }
        };

        initializeSession();
        return () => {
            leaveSession();
        };
    }, [state.OV, token]);

    const deleteSubscriber = (streamManager) => {
        let subscribers = state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
            dispatch(ovActions.saveSubscribers(subscribers));
        }
    };
    const leaveSession = (streamManager) => {
        const mySession = state.session;
        if (mySession) {
            mySession.disconnect();
        }
        state.OV = null;

        setState({
            OV: null,
            mySessionId: undefined,
            myUserName: undefined,
            session: undefined,
            mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
            publisher: undefined,
            subscribers: [],
        });
        dispatch(ovActions.leaveSession([...state]));
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
