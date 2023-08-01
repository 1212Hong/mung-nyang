import React from "react";
import ProgressTimer from "react-progress-bar-timer";
import "../css/style/timer.css";
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
                disabled={"true"}
                classes={{
                    root: "root",
                    progressContainer: "progressContainer",
                    textContainer: "textContainer",
                    progress: "progress",
                }}
            ></ProgressTimer>
        </>
    );
};

export default React.memo(Timer);
