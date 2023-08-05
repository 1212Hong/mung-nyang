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
        session,
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
        session: session,
        mainStreamManager: mainStreamManager, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
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
