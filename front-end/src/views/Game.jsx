import React from "react";
import WaitingRoom from "./game/WaitingRoom";
import ConnectionTest from "./game/ConnectionTest";
import { useDispatch, useSelector } from "react-redux";
import { changePhase, choosePhase } from "../store/phaseSlice";

const PHAGES = {
    Test: "Test",
    Wait: "Wait",
    Vote: "Vote",
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
    const { phaseType } = useSelector(choosePhase);
    const dispatch = useDispatch();
    console.log(phaseType);
    if (phaseType === "") return <h1>game type none</h1>;

    const findPhage = PHAGE_COMPONENTS.find((phase) => {
        console.log(phase);
        return phase.type === phaseType;
    });

    const renderPhase = () => {
        return findPhage.component;
    };

    dispatch(changePhase("Wait"));

    return <>{renderPhase()}</>;
};

export default Game;
