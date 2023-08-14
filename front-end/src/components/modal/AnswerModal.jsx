import React, { useState, useRef, useEffect } from "react";
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
import { fetchEmergencyAnswerResponse } from "../../hooks/quiz";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { gameActions } from "../../store/gameSlice";
const AnswerModal = (type) => {
    const [userAnswer, setUserAnswer] = useState("");
    const [answerResult, setAnswerResult] = useState("");
    const result = useSelector((state) => state.game.result);
    const dispatch = useDispatch();
    console.log(type);
    const onChange = (e) => {
        setUserAnswer(e.target.value);
    };
    const submitAnswer = async () => {
        await fetchEmergencyAnswerResponse(
            1,
            "테스트",
            "테스트유저2",
            "석류",
        ).then((response) => {
            dispatch(gameActions.saveResult(response));
        });
        dispatch(closeModal());
    };
    return (
        <AnswerModalView onClick={(e) => e.stopPropagation()}>
            <ModalViewDescDiv>비상 정답</ModalViewDescDiv>
            <ModalViewResultDiv>정답을 입력하세요.</ModalViewResultDiv>
            <ModalViewResultDiv>
                <AnswerModalViewDiv>
                    <AnswerModalInput
                        spellCheck="false"
                        onChange={onChange}
                        value={userAnswer}
                    ></AnswerModalInput>
                </AnswerModalViewDiv>
            </ModalViewResultDiv>
            <ModalViewResultDiv>
                <AnswerModalViewDiv>
                    <Button onClick={() => submitAnswer()}>제출</Button>
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
