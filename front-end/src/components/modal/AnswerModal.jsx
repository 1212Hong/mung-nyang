import React, { useState } from "react";
import {
    ModalViewDescDiv,
    ModalViewResultDiv,
    ModalViewResultBox,
    ModalViewButtonDiv,
    AnswerModalViewDiv,
    AnswerModalView,
    AnswerModalInput,
} from "../layout/modal";
import Button from "../Button";
import Timer from "../Timer";

import { useSelector, useDispatch } from "react-redux";
import { closeModal, selectModal } from "../../store/modalSlice";
const AnswerModal = () => {
    // api 적용할 부분
    const [agree, setAgree] = useState(0);
    const [disagree, setDisagree] = useState(0);
    // 현재 방의 인원 수를 받아서 6 대신 적용.
    const [wait, setWait] = useState(6);
    const [complete, setComplete] = useState(false);

    const openvidu = useSelector((state) => state.openvidu);
    const dispatch = useDispatch();
    return (
        <AnswerModalView onClick={(e) => e.stopPropagation()}>
            <ModalViewDescDiv>비상 정답</ModalViewDescDiv>
            <ModalViewResultDiv>정답을 입력하세요.</ModalViewResultDiv>
            <ModalViewResultDiv>
                <AnswerModalViewDiv>
                    <AnswerModalInput></AnswerModalInput>
                </AnswerModalViewDiv>
            </ModalViewResultDiv>
            <ModalViewResultDiv>
                <AnswerModalViewDiv>
                    <Button>제출</Button>
                    <Button
                        onClick={() => {
                            dispatch(closeModal());
                        }}
                    >
                        취소
                    </Button>
                </AnswerModalViewDiv>
            </ModalViewResultDiv>
        </AnswerModalView>
    );
};

export default AnswerModal;
