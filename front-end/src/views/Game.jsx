import React, { useState } from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import TopBottomVideo from "./game/TopBottomVideo";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { changePhase } from "../store/phaseSlice";
import SelectLiar from "../views/game/SelectLiar";
import SelectAnswer from "./game/SelectAnswer";
import { OpenVidu } from "openvidu-browser";
=======
<<<<<<< HEAD
import { changePhase } from "../store/phaseSlice";
import SelectLiar from "../views/game/SelectLiar";
import SelectAnswer from "./game/SelectAnswer";
import OtherView from "../views/game/OtherView";
=======
import { ovActions } from "../store/openviduSlice";
import { OpenVidu } from "openvidu-browser";
>>>>>>> cd1b8e037ae1b458ed4a117e3163bf2c23c62ca6
>>>>>>> 1ca2dab8409c0defe6b65ce13bb19c850b240b8e

const PHASES = {
    Test: "Test",
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

const text = "지목된 사람이 정답을 선택중입니다.";
const userlist = ["고양이", "개냥이", "냥냥이", "돼냥이", "댕댕이", "멍멍이"];
const PHASE_COMPONENTS = [
    {
        type: PHASES.Test,
        component: <ConnectionTest />,
    },
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
        component: <SelectLiar userlist={userlist} />,
    },
    {
        type: PHASES.SelectAns,
        component: <SelectAnswer />,
    },
    {
        type: PHASES.OtherView,
        component: <OtherView text={text} userlist={userlist} />,
    },
];

const Game = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const {
        // OV,
        // session,
        subscribers,
        myUserName,
        mySessionId,
        mainStreamManager,
        devices,
        token,
    } = openvidu;
    const [state, setState] = useState({
        OV,
        mySessionId: mySessionId,
        myUserName: myUserName,
        session: undefined,
        mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
        publisher: undefined,
        subscribers: [],
    });

    const phaseType = useSelector((state) => state.phase.phaseType);
    // const dispatch = useDispatch(); //dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    console.log(phaseType);

    console.log(openvidu);

    var OV = new OpenVidu();
    const session = OV.initSession();

    if (session) {
        // On every new Stream received...
        session.on("streamCreated", (event) => {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video by its own
            var subscriber = session.subscribe(event.stream, undefined);

            //We use an auxiliar array to push the new stream
            var subscribers = this.state.subscribers;

            subscribers.push(subscriber);

            // Update the state with the new subscribers
        });
    }
    console.log(subscribers);

    token &&
        session
            .connect(token, "User 1")
            .then(async () => {
                // --- 5) Get your own camera stream ---

                // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                // element: we will manage it on our own) and with the desired properties
                let publisher = await OV.initPublisherAsync(undefined, {
                    audioSource: undefined, // The source of audio. If undefined default microphone
                    videoSource: undefined, // The source of video. If undefined default webcam
                    publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                    publishVideo: true, // Whether you want to start publishing with your video enabled or not
                    resolution: "640x480", // The resolution of your video
                    frameRate: 30, // The frame rate of your video
                    insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                    mirror: false, // Whether to mirror your local video or not
                });

                // --- 6) Publish your stream ---

                session.publish(publisher);

                // Obtain the current video device in use
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

                // Set the main video in the page to display our webcam and store our Publisher
                setState({
                    ...state,
                    currentVideoDevice: currentVideoDevice,
                    mainStreamManager: publisher,
                    publisher: publisher,
                });
            })
            .catch((error) => {
                console.log(
                    "There was an error connecting to the session:",
                    error.code,
                    error.message,
                );
            });

    const findPhase = PHASE_COMPONENTS.find(
        (phase) => phase.type === phaseType,
    );

    if (!findPhase) {
        // 해당 phaseType에 맞는 컴포넌트를 찾지 못한 경우 오류 처리
        return <h1>Invalid phaseType: {phaseType}</h1>;
    }

    const renderPhase = () => {
        return findPhase.component;
    };

    return <>{renderPhase()}</>;
};

export default Game;
