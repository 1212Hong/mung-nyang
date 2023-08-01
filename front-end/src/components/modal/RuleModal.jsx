import React from "react";
import { RuleModalView } from "../layout/modal";

const RuleModal = () => {
    return (
        <RuleModalView>
            <h2>멍 마을의 냥 규칙</h2>
            <div>
                <h3>역할</h3>
                <span>강아지</span>
                <span>탐정강아지</span>
                <span>고양이</span>
            </div>
            <div className="desc">
                <p>화상 서비스로 제시어를 몸으로 설명하고 맞추는 라이어게임</p>
            </div>
        </RuleModalView>
    );
};

export default RuleModal;
