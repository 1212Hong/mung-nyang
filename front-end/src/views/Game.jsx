import React from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import { useDispatch, useSelector } from "react-redux";

const PHASES = {
    Test: "Test",
    Wait: "Wait",
    GameVote: "GameVote",
    Quiz: "Quiz",
    Category: "Category",
    Desc: "Desc",
    QnA: "QnA",
    Answer: "Answer",
    EmergencyAns: "EmergencyAns",
    SelectLiar: "SelectLiar",
    MiddleResult: "MiddleResult",
    FinalResult: "FinalResult",
    OpenLiar: "OpenLiar",
    Dance: "Dance",
    Paint: "Paint",
    VoteLiar: "VoteLiar",
    // + 게임 중 사용할 api 명
    // Join, Leave, {(Vote)agree, disagree}
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
];

const Game = () => {
    const phaseType = useSelector((state) => state.phase.phaseType);
    // const dispatch = useDispatch(); dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    console.log(phaseType);

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
