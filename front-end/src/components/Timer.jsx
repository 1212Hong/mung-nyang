import React, { useState, useEffect } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "../css/style/timer.css";
const Timer = (props) => {
    const time = props.time === "number" ? props.time : 10;
    const decreaseRatio = 10 / time;
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((progress) => progress - decreaseRatio);
        }, 100);

        setTimeout(() => {
            clearInterval(timer);
        }, time * 1000);
    }, [time, decreaseRatio]);
    return (
        <>
            <ProgressBar
                percent={progress}
                filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
            ></ProgressBar>
        </>
    );
};

export default React.memo(Timer);
