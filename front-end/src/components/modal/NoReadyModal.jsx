import React from "react";
import { ReadyModalView } from "../layout/modal";
import { SubText } from "../layout/common";

const NoReadyModal = () => {
    return (
        <ReadyModalView>
            <SubText>인원이 부족해서 시작할 수 없습니다</SubText>
        </ReadyModalView>
    );
};

export default NoReadyModal;
