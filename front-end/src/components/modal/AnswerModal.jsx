import React, { useState } from "react";
import {
    ModalViewDescDiv,
    ModalViewResultDiv,
    AnswerModalViewDiv,
    AnswerModalView,
    AnswerModalInput,
} from "../layout/modal";
import Button from "../Button";
import { fetchEmergencyAnswerResponse } from "../../hooks/ans";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { gameActions } from "../../store/gameSlice";

const AnswerModal = (type) => {
    const [userAnswer, setUserAnswer] = useState("");
    const openvidu = useSelector((state) => state.openvidu);
    const { mySessionId, myUserName, session } = openvidu;
    const game = useSelector((state) => state.game);
    const { setId, result } = game;
    const dispatch = useDispatch();
    console.log(type);
    const onChange = (e) => {
        setUserAnswer(e.target.value);
    };
    const submitAnswer = async (ans) => {
        await fetchEmergencyAnswerResponse(
            setId,
            mySessionId,
            myUserName,
            ans,
        ).then((data) => {
            dispatch(gameActions.saveResult(data));
        });
        dispatch(closeModal());
        session.signal({
            data: result,
            to: [],
            type: "emgAnswered", // 비상 정답 누르면 신호 보냄 -> 받는 거 체크 필요
        });
        console.log(result);
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
                    <Button onClick={() => submitAnswer(userAnswer)}>
                        제출
                    </Button>
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
