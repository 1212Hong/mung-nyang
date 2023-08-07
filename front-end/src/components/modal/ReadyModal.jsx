import React, { useState } from "react";
import {
    ReadyModalView,
    ModalViewDescDiv,
    ModalViewResultDiv,
    ModalViewResultBox,
    ModalViewButtonDiv,
    ModalViewCompleteDiv,
} from "../layout/modal";
import Button from "../Button";
import Timer from "../Timer";
import { useDispatch } from "react-redux";
import { changePhase } from "../../store/phaseSlice";

const ReadyModal = () => {
    // api 적용할 부분
    const [agree, setAgree] = useState(0);
    const [disagree, setDisagree] = useState(0);
    // 현재 방의 인원 수를 받아서 6 대신 적용.
    const [wait, setWait] = useState(6);

    const [complete, setComplete] = useState(false);
    const dispatch = useDispatch(); //dispatch로 reducer에 선언된 changePhase 불러와서 사용하면됨
    return (
        <ReadyModalView onClick={(e) => e.stopPropagation()}>
            <Timer width={"80%"}></Timer>
            <ModalViewDescDiv>게임 시작 투표</ModalViewDescDiv>

            <ModalViewResultDiv>
                <ModalViewResultBox>찬성 : {agree}</ModalViewResultBox>
                <ModalViewResultBox>반대 : {disagree}</ModalViewResultBox>
                <ModalViewResultBox>대기 : {wait}</ModalViewResultBox>
            </ModalViewResultDiv>
            <ModalViewButtonDiv>
                {complete ? (
                    <ModalViewCompleteDiv>투표 완료</ModalViewCompleteDiv>
                ) : (
                    <>
                        <button
                            onClick={() =>
                                dispatch(changePhase({ phaseType: "Quiz" }))
                            }
                        >
                            quiz가기
                        </button>
                        <Button
                            onClick={() => {
                                // api 코드 작성할 곳.
                                setComplete(true);
                                setAgree(agree + 1);
                                setWait(wait - 1);
                            }}
                        >
                            O
                        </Button>
                        <Button
                            onClick={() => {
                                // api 코드 작성할 곳.
                                setComplete(true);
                                setDisagree(disagree + 1);
                                setWait(wait - 1);
                            }}
                        >
                            X
                        </Button>
                    </>
                )}
            </ModalViewButtonDiv>
        </ReadyModalView>
    );
};

export default ReadyModal;
