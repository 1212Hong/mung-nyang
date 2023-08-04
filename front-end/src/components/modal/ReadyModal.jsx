import React from "react";
import { ReadyModalView } from "../layout/modal";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { changePhase } from "../../store/phaseSlice";

const ReadyModal = () => {
    const dispatch = useDispatch();
    return (
        <ReadyModalView>
            <h2>Are you Ready?</h2>
            <Button
                onClick={() => dispatch(changePhase({ phaseType: "Quiz" }))}
            />
        </ReadyModalView>
    );
};

export default ReadyModal;
