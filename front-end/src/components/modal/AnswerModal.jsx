import React, { useState, useRef } from "react";
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
import { changePhase } from "../../store/phaseSlice";
const AnswerModal = (type) => {
    const [userAnswer, setUserAnswer] = useState("");
    const openvidu = useSelector((state) => state.openvidu);
    const { mySessionId, myUserName, session } = openvidu;
    const game = useSelector((state) => state.game);
    const { setId, result } = game;
    const dispatch = useDispatch();
    const userInput = useRef();
    const onChange = (e) => {
        setUserAnswer(e.target.value);
    };
    const submitAnswer = async () => {
        console.log(userInput.current.value);
        await fetchEmergencyAnswerResponse(
            setId,
            mySessionId,
            myUserName,
            userInput.current.value,
        ).then((data) => {
            console.log(data);
            let returnResult = "";
            switch (data.resultReturn) {
                case "LiarWin_LiarPick":
                    returnResult += "라이어 승리";
                    break;
                case "LiarLose_LiarPick":
                    returnResult += "라이어 정답 실패";
                    break;
                case "LiarWin_AnsPick":
                    returnResult += "정답자 정답 실패";
                    break;
                case "LiarLose_AnsPick":
                    returnResult += "정답자 정답 성공";
                    break;
                case "LiarWin_ElsePick":
                    returnResult += "시민 정답 제출";
                    break;
                default:
                    break;
            }
            console.log(returnResult);
            dispatch(gameActions.saveResult(returnResult));
            dispatch(changePhase("MidScore"));
            dispatch(closeModal());
            dispatch(gameActions.updateEmgSignal(true));
            session.signal({
                data: returnResult,
                to: [],
                type: "emgAnswered", // 비상 정답 누르면 신호 보냄 -> 받는 거 체크 필요
            });
        });
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
                        ref={userInput}
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
