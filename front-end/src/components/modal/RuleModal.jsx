import React from "react";
import {
    DescDiv,
    MainText,
    MainTextBox,
    MarginDiv,
    SubText,
} from "../layout/common";
import { RuleModalView } from "../layout/modal";

const RuleModal = () => {
    const videoUrl =
        "https://i9c209.p.ssafy.io/openvidu/recordings/game-rule.mp4";
    return (
        <RuleModalView>
            <MainTextBox>
                <MainText>멍 마을의 냥 규칙</MainText>
            </MainTextBox>
            <MarginDiv>
                <SubText>
                    화상 서비스로 제시어를 몸으로 설명하고 맞추는 라이어게임
                </SubText>
            </MarginDiv>
            <DescDiv>
                <video controls width="100%" height="319" autoPlay>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </DescDiv>
        </RuleModalView>
    );
};

export default RuleModal;
