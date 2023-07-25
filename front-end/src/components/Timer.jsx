import React, { useEffect, useState } from "react";
import PuppyRun from "../assets/img/Puppy-run.gif";
import ProgressTimer from "react-progress-bar-timer";

const Timer = () => {
    return (
        <>
            <ProgressTimer
                barRounded
                buttonText="타이머"
                direction="left"
                duration={10}
                fontSize={16}
                label="남은 시간"
                onFinish={function noRefCheck() {}}
                rootRounded
                started={{}}
                variant="empty"
                classes={{ progress: "height:10%" }}
            />
            <img src={PuppyRun} alt="" width="40px" />
        </>
    );
};

export default React.memo(Timer);
