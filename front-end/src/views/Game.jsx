import React, { useState, useEffect } from "react";
import WaitingRoom from "./game/WaitingRoom";
import TopBottomVideo from "./game/TopBottomVideo";
import Dance from "./game/Dance";
import WordDescription from "./game/WordDescription";
import { useDispatch, useSelector } from "react-redux";
import { ovActions } from "../store/openviduSlice";
import { useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import ScoreTotal from "../views/game/ScoreTotal";
import LiarVote from "./game/LiarVote";
import SelectAnswer from "../views/game/SelectAnswer";
import OtherView from "../views/game/OtherView";
import OpenLiar from "../views/game/OpenLiar";
import { outRoom } from "../api/room";
import { gameActions } from "../store/gameSlice";
import { closeModal, openModal } from "../store/modalSlice";
import DupLiar from "./game/DupLiar";
import QnAPage from "./game/QnAPage";
import { changePhase } from "../store/phaseSlice";
import FinAns from "./game/FinAns";

const PHASES = {
    // Test: "Test", // 테스트단계에서는 세션아이디는 받아오지만 실제 방에 들어가진 않도록 함
    Wait: "Wait",
    GameVote: "GameVote",
    Quiz: "Quiz",
    Category: "Category",
    Desc: "Desc",
    QnA: "QnA",
    FinAns: "FinAns",
    EmgAns: "EmgAns",
    LiarVote: "LiarVote",
    DupLiar: "DupLiar",
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
        type: PHASES.Desc,
        component: <WordDescription />,
    },
    {
        type: PHASES.QnA,
        component: <QnAPage />,
    },
    {
        type: PHASES.FinAns,
        component: <FinAns />,
    },
    {
        type: PHASES.LiarVote,
        component: <LiarVote />,
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
        type: PHASES.DupLiar,
        component: <DupLiar />,
    },

    {
        type: PHASES.Dance,
        component: <Dance />,
    },
];

const Game = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const {
        subscribers,
        myUserName,
        token,
        mySessionId,
        mySessionPw,
        playerId,
        owner,
    } = openvidu;
    const { gameVoteCnt, answerer } = game;
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
                console.log(event);
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

                newSession.on("signal:savePw", (e) => {
                    dispatch(ovActions.saveSessionPw(e.data));
                });
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
                    console.log("찬성");
                    const newCnt = event.data;
                    console.log(event);
                    dispatch(gameActions.saveGameVoteCnt(newCnt));
                });

                newSession.on("signal:disagree", (event) => {
                    console.log("반대");
                    dispatch(closeModal());
                    dispatch(gameActions.saveGameVoteCnt(0));
                });

                newSession.on("signal:setCnt", (e) => {
                    console.log(e.data);
                    dispatch(gameActions.saveSetCnt(e.data));
                });

                newSession.on("signal:Quiz", (e) => {
                    dispatch(closeModal());
                    dispatch(changePhase(e.data));
                });

                newSession.on("signal:answerer", (e) => {
                    console.log("받아온 정답자 : ", e.data);
                    dispatch(gameActions.saveAnswerer(e.data));
                    dispatch(
                        openModal({
                            modalType: "ChooseModal",
                            isOpen: true,
                        }),
                    );
                    setTimeout(() => {
                        dispatch(changePhase("Category"));
                        dispatch(closeModal());
                    }, 5000);
                });

                newSession.on("signal:setId", (e) => {
                    dispatch(gameActions.saveSetId(e.data));
                    dispatch(changePhase("Desc"));
                });

                newSession.on("signal:descIndex", (event) => {
                    console.log(event.data);
                    console.log(newSession.streamManagers);
                    const desc = newSession.streamManagers.find(
                        (streamManager) =>
                            streamManager.stream.connection.data === event.data,
                    );
                    console.log(desc);

                    // console.log(descStreamManager); // undefined
                    dispatch(ovActions.saveMainStreamManager(desc));
                });

                !owner &&
                    newSession.on("signal:startDupLiar", (event) => {
                        console.log(event.data);
                        const dupList = event.data
                            .split(",")
                            .filter((str) => str.trim() !== "");
                        dispatch(gameActions.updateDupLiars(dupList));

                        dispatch(changePhase("DupLiar"));
                    });
                newSession.on("signal:noLiar", (event) => {
                    console.log(event.data);
                    dispatch(gameActions.updateResult(event.data));
                    dispatch(changePhase("MidScore"));
                });
                !owner &&
                    newSession.on("signal:getresult", (event) => {
                        console.log(event.data);
                        if (event.data === "LiarWin_Success") {
                            dispatch(gameActions.updateResult("고양이 승리"));
                        } else if (event.data === "LiarLose_Fail") {
                            dispatch(gameActions.updateResult("강아지 승리"));
                        } else if (event.data === "LiarWin_NotLiar") {
                            dispatch(gameActions.updateResult("고양이 승리"));
                        }
                    });
                myUserName !== answerer &&
                    newSession.on("signal:getresult", (event) => {
                        console.log(event.data);
                        if (event.data === "LiarLose_Final")
                            dispatch(gameActions.updateResult("강아지 승리"));
                    });
                newSession.on("signal:VotedLiar", (event) => {
                    console.log(event.data);
                    dispatch(gameActions.saveLiar(event.data));
                    if (myUserName === event.data) {
                        // 라이어 투표랑 마찬가지 - 걍 저장된 닉네임쓰기
                        dispatch(changePhase("SelectAns"));
                    } else {
                        dispatch(changePhase("OtherView"));
                    }
                });
                newSession.on("signal:dupVotedLiar", (event) => {
                    console.log(event.data);
                    dispatch(gameActions.saveLiar(event.data));
                    if (myUserName === event.data) {
                        dispatch(changePhase("SelectAns"));
                    } else {
                        dispatch(changePhase("OtherView"));
                    }
                });

                // 최종 정답 시그널 받기
                session.on("signal:Pick to Liar", (e) => {
                    console.log(e.data);
                    dispatch(changePhase(e.data)); // 최종정답 api의 결과에 따라 페이즈 이동
                    // 필요하다면 게임 결과도 저장해야함
                });
                session.on("signal:LiarLose_Final", (e) => {
                    console.log(e.data);
                    dispatch(changePhase(e.data));
                });

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
                session.on("signal:emgAnswered", (event) => {
                    console.log(event.data);
                    dispatch(gameActions.updateEmgSignal(true));
                    dispatch(gameActions.saveResult(event.data));
                    dispatch(changePhase("MidScore"));
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

        if (!session) console.log("bye");

        // componentWillUnmount
        return () => {
            console.log("willunmount");
            window.removeEventListener("beforeunload", onbeforeunload);
        };
    }, []);

    const deleteSubscriber = async (streamManager) => {
        console.log("delete 호출");
        console.log(streamManager);
        console.log(subscribersList);
        const updatedSubscribers = subscribersList.filter(
            (sub) => sub.stream.streamId !== streamManager.stream.streamId,
        );
        console.log(updatedSubscribers);
        setSubscribersList(updatedSubscribers);
        dispatch(ovActions.saveSubscribers(updatedSubscribers));
        owner &&
            (await outRoom(mySessionId, streamManager.stream.connection.data));
        console.log(subscribersList);
    };
    const leaveSession = async () => {
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
