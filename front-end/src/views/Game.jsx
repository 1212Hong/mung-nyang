import React from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import { useDispatch, useSelector } from "react-redux";
import { changePhase } from "../store/phaseSlice";
import ScoreTotal from "../views/game/ScoreTotal";

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
const totalset = 5;
const title = "라이어 승리";

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
        type: PHASES.MidScore,
        component: <ScoreTotal totalset={totalset} title={title}></ScoreTotal>,
    },
];

const Game = () => {
    const phaseType = useSelector((state) => state.phase.phaseType);
    const dispatch = useDispatch();

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
                    dispatch(changePhase({ phaseType: "MidScore" }));
                }}
            ></button> */}
            {renderPhase()}
        </>
    );
};

export default Game;
