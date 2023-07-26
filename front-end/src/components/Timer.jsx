import React from "react";
import PuppyRun from "../assets/img/Puppy-run.gif";
import ProgressTimer from "react-progress-bar-timer";
import "../css/style//timer.css";
const Timer = (props) => {
    const time = props;
    return (
        <>
            <ProgressTimer
                barRounded
                direction="left"
                duration={typeof time === "number" ? time : 10}
                fontSize={4}
                rootRounded
                started={true}
                variant="empty"
                classes={{
                    progressContainer: "progressContainer",
                    textContainer: "textContainer",
                    progress: "progress",
                }}
            ></ProgressTimer>

            <img src={PuppyRun} alt="" width="40px" />
        </>
    );
};

export default React.memo(Timer);
