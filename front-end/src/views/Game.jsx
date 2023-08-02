import React from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import { useDispatch, useSelector } from "react-redux";
import { changePhase, choosePhase } from "../store/phaseSlice";

const PHAGES = {
    Test: "test",
    Wait: "wait",
    vote: "vote",
};

const PHAGE_COMPONENTS = [
    {
        type: PHAGES.Test,
        component: <ConnectionTest />,
    },
    {
        type: PHAGES.Wait,
        component: <WaitingRoom />,
    },
];

const Game = () => {
    const { phase } = useSelector(choosePhase);
    const dispatch = useDispatch();

    const fintPhage = PHAGE_COMPONENTS.find((phase) => {
        return phase.phase === phase;
    });

    const renderPhase = () => {
        return fintPhage.component;
    };

    dispatch(changePhase("wait"));

    return <>{renderPhase()}</>;
};

export default Game;
