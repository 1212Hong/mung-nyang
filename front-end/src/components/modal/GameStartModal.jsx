import React, { useState } from "react";
import { ReadyModalView } from "../layout/modal";
import styled from "styled-components";
import Button from "../Button";
import Timer from "../Timer";
const ModalViewDescDiv = styled.div`
    padding: 20px 0;
    width: 80%;
    text-align: center;
    border-bottom: 1px solid silver;
`;
const ModalViewResultDiv = styled.div`
    padding: 20px 0;
    display: flex;
    width: 80%;
    justify-contents: space-between;
`;
const ModalViewResultBox = styled.div`
    width: 30%;
    margin: 0 5px;
    display: flex;
`;
const ModalViewButtonDiv = styled.div`
    color: black;
    display: flex;
`;
const GameStartModal = () => {
    // api 적용할 부분
    const [agree, setAgree] = useState(0);
    const [disagree, setDisagree] = useState(0);
    // 현재 방의 인원 수를 받아서 6 대신 적용.
    const [wait, setWait] = useState(6);

    const [complete, setComplete] = useState(false);
    return (
        <div>
            <ReadyModalView>
                <Timer width={"80%"}></Timer>
                <ModalViewDescDiv>게임 시작 투표</ModalViewDescDiv>
                <ModalViewResultDiv>
                    <ModalViewResultBox>찬성 : {agree}</ModalViewResultBox>
                    <ModalViewResultBox>반대 : {disagree}</ModalViewResultBox>
                    <ModalViewResultBox>대기 : {wait}</ModalViewResultBox>
                </ModalViewResultDiv>
                <ModalViewButtonDiv>
                    {complete ? (
                        <>
                            <Button disabled>투표 완료</Button>
                        </>
                    ) : (
                        <>
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
        </div>
    );
};

export default GameStartModal;
