import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import PuppyRun from "../assets/img/Puppy-run.gif";
import PuppyRunUn from "../assets/img/Puppy-run-unscreen.gif";
import { styled } from "styled-components";

const Timer = () => {
    const [time, setTime] = useState(10);
    console.log(time);
    useEffect(() => {
        const interval_id = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval_id);
            alert("정지");
        }, 10000);
    }, []);

    return (
        <>
            <ProgressBar
                bgColor="#A5FF6D"
                completed={String(time)}
                maxCompleted={10}
                width="95%"
            />
            <img src={PuppyRun} alt="" width="40px" />
        </>
    );
};

export default React.memo(Timer);
