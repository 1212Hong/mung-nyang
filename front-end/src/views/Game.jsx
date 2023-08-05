import React, { useState, useEffect } from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import TopBottomVideo from "./game/TopBottomVideo";
import { useDispatch, useSelector } from "react-redux";
import { ovActions } from "../store/openviduSlice";
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

    const {
        OV,
        session,
        subscribers,
        myUserName,
        mySessionId,
        mainStreamManager,
        currentVideoDevice,
        token,
    } = openvidu;
    console.log(openvidu);
    const phaseType = useSelector((state) => state.phase.phaseType);
    const dispatch = useDispatch(); //dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    console.log(phaseType);

    useEffect(() => {
        // OpenVidu 객체를 생성하여 상태에 저장
        if (!OV) {
            dispatch(
                ovActions.createOpenvidu({
                    nickname: myUserName,
                    roomId: mySessionId,
                }),
            );
        }

        // 세션 생성
        if (!session && OV) {
            const newSession = OV.initSession();
            dispatch(ovActions.saveSession(newSession));
        }

        // 세션에 접속
        const joinSession = async () => {
            try {
                if (token && session && myUserName) {
                    await session.connect(token, { clientData: myUserName });
                    console.log("Successfully connected to the session");
                }
            } catch (error) {
                console.error("Error connecting to the session:", error);
            }
        };

        joinSession(); // 세션에 접속하는 함수 호출
    }, [OV, session, token, myUserName, mySessionId, dispatch]);

    const deleteSubscriber = (streamManager) => {
        const prevSubscribers = subscribers;
        let index = prevSubscribers.indexOf(streamManager, 0);
        if (index > -1) {
            prevSubscribers.splice(index, 1);
            dispatch(ovActions.saveSubscribers([...prevSubscribers]));
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
        return findPhase.component;
    };

    return <>{renderPhase()}</>;
};

export default Game;
