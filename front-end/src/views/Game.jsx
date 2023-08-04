import React from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import TopBottomVideo from "./game/TopBottomVideo";
import { useDispatch, useSelector } from "react-redux";
import { changePhase } from "../store/phaseSlice";
import SelectLiar from "../views/game/SelectLiar";
import SelectAnswer from "./game/SelectAnswer";

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
];

const Game = () => {
    const phaseType = useSelector((state) => state.phase.phaseType);
    // const dispatch = useDispatch(); //dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    console.log(phaseType);

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
