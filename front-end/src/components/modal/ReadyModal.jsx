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
import { castGameVote } from "../../api/game";
import { useSelector } from "react-redux";

const ReadyModal = () => {
    // api 적용할 부분
    const [agree, setAgree] = useState(0);
    const [disagree, setDisagree] = useState(0);
    // 현재 방의 인원 수를 받아서 6 대신 적용.
    const [wait, setWait] = useState(6);
    const [complete, setComplete] = useState(false);

    const openvidu = useSelector((state) => state.openvidu);
    const { mySessionId } = openvidu;

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
                        <Button
                            onClick={() => {
                                // api 코드 작성할 곳.
                                setComplete(true);
                                castGameVote(mySessionId, "T");
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
                                castGameVote(mySessionId, "F");
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
