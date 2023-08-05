import React, { useState, useEffect } from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import TopBottomVideo from "./game/TopBottomVideo";
import { useDispatch, useSelector } from "react-redux";
import { ovActions } from "../store/openviduSlice";
import { OpenVidu } from "openvidu-browser";

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
    OpenLiar: "OpenLiar",
    MidScore: "MidScore",
    FinScore: "FinScore",
    DupVote: "DupVote", // 최하위플레이어가 동점일때
    Dance: "Dance",
    Paint: "Paint",
};

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
        currentVideoDevice,
        token,
    } = openvidu;
    console.log(openvidu);
    const [OV, setOV] = useState();
    const [state, setState] = useState({
        mySessionId: mySessionId,
        myUserName: myUserName,
        session: undefined,
        mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
        publisher: undefined,
        subscribers: [],
    });

    const phaseType = useSelector((state) => state.phase.phaseType);
    const dispatch = useDispatch(); //dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    console.log(phaseType);

    useEffect(function () {
        // window.addEventListener("beforeunload", this.onbeforeunload);
        // window.removeEventListener("beforeunload", this.onbeforeunload);
        // useEffect가 한번 실행된 후 다시 실행될 때 이전에 실행했던 값을 정리해주는 것이 clean up
        // 예를 들면 입장할 때 구독하고 퇴장할 때 구독취소를 하는 것
        // 이 effect는 부모 컴포넌트에서 이 함수 컴포넌트를 삭제하는 경우에 clean-up(unmount)을 하게 된다.
        // return function beforeunload() {
        //     this.leaveSession();
        // };
        // 빈 배열을 넣으면 처음 한 번만 실행되고 그 후로는 실행되지 않는다.(componentDidMount만 하도록)
    }, []);

    const deleteSubscriber = (streamManager) => {
        const prevSubscribers = subscribers;
        let index = prevSubscribers.indexOf(streamManager, 0);
        if (index > -1) {
            prevSubscribers.splice(index, 1);
            setState({
                ...state,
                subscribers: [...prevSubscribers],
            });
        }
    };

    const joinSession = () => {
        const newOV = new OpenVidu();
        newOV.enableProdMode();

        const newSession = OV.initSession();

        setOV(newOV);
        setState({
            ...state,
            session: newSession,
        });

        const connection = () => {
            if (token) {
                // 1. connection 메소드 내부에 이벤트 수신 처리
                // 1-1 session에 참여한 사용자 추가
                newSession.on("streamCreated", (event) => {
                    const newSubscriber = newSession.subscribe(
                        event.stream,
                        JSON.parse(event.stream.connection.data).clientData,
                    );

                    const newSubscribers = subscribers;
                    newSubscribers.push(newSubscriber);

                    setState({
                        ...state,
                        subscribers: [...newSubscribers],
                    });
                });
                // 1-2 session에서 disconnect한 사용자 삭제
                // newSession.on("streamDestroyed", (event) => {
                //     if (event.stream.typeOfVideo === "CUSTOM") {
                //         deleteSubscriber(event.stream.streamManager);
                //     } else {
                //         setDestroyedStream(event.stream.streamManager);
                //         setCheckMyScreen(true);
                //     }
                // });
                // 1-3 예외처리
                newSession.on("exception", (exception) => {
                    console.warn(exception);
                });
                newSession
                    .connect(token, {
                        clientData: myUserName,
                    })
                    .then(async () => {
                        newOV
                            .getUserMedia({
                                audioSource: false,
                                videoSource: undefined,
                                resolution: "1280x720",
                                frameRate: 10,
                            })
                            .then((mediaStream) => {
                                var videoTrack =
                                    mediaStream.getVideoTracks()[0];
                                // Obtain the current video device in use

                                var newPublisher = newOV.initPublisher(
                                    myUserName,
                                    {
                                        audioSource: undefined,
                                        videoSource: videoTrack,
                                        publishAudio: true,
                                        publishVideo: true,
                                        // resolution: '1280x720',
                                        // frameRate: 10,
                                        insertMode: "APPEND",
                                        mirror: true,
                                    },
                                );
                                // 4-c publish
                                newPublisher.once("accessAllowed", () => {
                                    newSession.publish(newPublisher);
                                    setState({
                                        ...state,
                                        publisher: newPublisher,
                                    });
                                });
                            })
                            .catch((error) => {
                                console.warn(
                                    "There was an error connecting to the session:",
                                    error.code,
                                    error.message,
                                );
                            });
                    });
            }
        };
        connection();
    };

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
