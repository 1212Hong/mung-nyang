import React from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import TopBottomVideo from "./game/TopBottomVideo";
import { useDispatch, useSelector } from "react-redux";
import { changePhase } from "../store/phaseSlice";

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
    const phaseType = useSelector((state) => state.phase.phaseType);
    const dispatch = useDispatch(); //dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    console.log(phaseType);
    const openvidu = useSelector((state) => state.openvidu);
    console.log(openvidu);

    const {
        OV,
        session,
        subscribers,
        myUserName,
        mySessionId,
        mainStreamManager,
        devices,
    } = openvidu;

    if (session) {
        session.on("streamCreated", (event) => {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video by its own
            var subscriber = session.subscribe(event.stream, undefined);

            //We use an auxiliar array to push the new stream
            var user_list = subscribers;

            user_list.push(subscriber);

            // Update the state with the new subscribers
            //user_lit prop로 전달
        });
    }
    console.log(subscribers);
    const findPhase = PHASE_COMPONENTS.find(
        (phase) => phase.type === phaseType,
    );

    if (!findPhase) {
        // 해당 phaseType에 맞는 컴포넌트를 찾지 못한 경우 오류 처리
        return <h1>Invalid phaseType: {phaseType}</h1>;
    }

    // dispatch(changePhase({ phaseType: "Wait" }));

    const renderPhase = () => {
        return findPhase.component;
    };

    return (
        <>
            {/* <button
                onClick={() => {
                    dispatch(changePhase({ phaseType: "Wait" }));
                }}
            ></button> */}
            {renderPhase()}
        </>
    );
};

export default Game;
