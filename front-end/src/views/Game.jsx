import React from "react";
import OtherView from "./game/OtherView";

const Game = () => {
    const text = "정답자가 정답을 입력 중입니다.";
    const user_list = ["이민규", "이민규", "이민규", "이민규", "이민규"];
    return (
        <>
            <OtherView text={text} user_list={user_list} />
        </>
    );
};

export default Game;
