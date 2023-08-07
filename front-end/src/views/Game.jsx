import React, { useEffect } from "react";
import WaitingRoom from "./game/WaitingRoom";
import TopBottomVideo from "./game/TopBottomVideo";
import { useDispatch, useSelector } from "react-redux";
import { ovActions } from "../store/openviduSlice";
import { useNavigate } from "react-router-dom";

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
    const {
        OV,
        session,
        subscribers,
        // myUserName,
        mySessionId,
        mainStreamManager,
        currentVideoDevice,
        token,
    } = openvidu;
    console.log(openvidu);
    const phaseType = useSelector((state) => state.phase.phaseType);
    const dispatch = useDispatch(); //dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    const navigate = useNavigate();
    console.log(phaseType);
    const myUserName = "test" + Math.floor(Math.random() * 100);
    const currentSubscribers = useSelector(
        (state) => state.openvidu.subscribers,
    );

    if (!mySessionId) navigate("/error");

    // 세션에 접속하고 유저들을 연결
    useEffect(() => {
        let publisher;
        const joinSession = async () => {
            if (!OV) {
                dispatch(
                    ovActions.createOpenvidu({
                        nickname: myUserName,
                        roomId: mySessionId,
                    }),
                );
            }

            if (token && session && myUserName) {
                console.log(session);

                session.on("streamCreated", (event) => {
                    const subscriber = session.subscribe(
                        event.stream,
                        undefined,
                    );
                    const updatedSubscribers = [
                        ...currentSubscribers,
                        subscriber,
                    ];
                    dispatch(ovActions.saveSubscribers(updatedSubscribers));
                });

                // On every Stream destroyed...
                session.on("streamDestroyed", (event) => {
                    // Remove the stream from 'subscribers' array
                    deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                session.on("exception", (exception) => {
                    console.warn(exception);
                    navigate("/error");
                });

                session
                    .connect(token, { clientData: myUserName })
                    .then(async () => {
                        console.log("connecting webcam");
                        // Get your own camera stream
                        console.log(OV);
                        publisher = await OV.initPublisherAsync(undefined, {
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
                            (device) =>
                                device.deviceId === currentVideoDeviceId,
                        );

                        // Set the main video in the page to display our webcam and store our Publisher
                        dispatch(
                            ovActions.saveCurrentVideoDevice(
                                currentVideoDevice,
                            ),
                        );
                        dispatch(ovActions.saveMainStreamManager(publisher));

                        console.log(openvidu);
                    })
                    .catch(
                        (err) =>
                            console.warn(
                                "error connection to session",
                                err.code,
                                err.msg,
                            ),
                        // navigate("/error"),
                    );
            }
        };

        if (token && myUserName) {
            console.log("join start");
            joinSession();
        } else {
            console.log("no token or nickname");
        }
    }, [token, myUserName, session]);

    const deleteSubscriber = (streamManager) => {
        // Find the index of the streamManager to be removed
        const index = currentSubscribers.indexOf(streamManager, 0);
        if (index > -1) {
            // Create a new array without the streamManager and update the state
            const updatedSubscribers = currentSubscribers.splice(index, 1);
            dispatch(ovActions.saveSubscribers(updatedSubscribers));
        }
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
