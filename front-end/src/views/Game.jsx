import React from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import { useDispatch, useSelector } from "react-redux";
import { changePhase } from "../store/phaseSlice";

const PHASES = {
    Test: "Test",
    Wait: "Wait",
    Vote: "Vote",
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
    const dispatch = useDispatch();
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
            <button
                onClick={() => {
                    dispatch(changePhase({ phaseType: "Wait" }));
                }}
            ></button>
            <>{renderPhase()}</>
        </>
    );
};

export default Game;
