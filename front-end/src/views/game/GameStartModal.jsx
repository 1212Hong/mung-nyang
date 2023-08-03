import React, { useState } from "react";
import {
    ModalBackdrop,
    ModalContainer,
    ReadyModalView,
    RuleModalView,
} from "../../components/layout/modal";
import styled from "styled-components";
import Button from "../../components/Button";
import Timer from "../../components/Timer";
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
    // 현재 방의 인원 수 api로 받아서 6 대신 적용.
    const [wait, setWait] = useState(6);
    return (
        <div>
            <ModalContainer>
                <ModalBackdrop>
                    <ReadyModalView>
                        <Timer></Timer>
                        <ModalViewDescDiv>게임 시작 투표</ModalViewDescDiv>
                        <ModalViewResultDiv>
                            <ModalViewResultBox>
                                찬성 : {agree}
                            </ModalViewResultBox>
                            <ModalViewResultBox>
                                반대 : {disagree}
                            </ModalViewResultBox>
                            <ModalViewResultBox>
                                대기 : {wait}
                            </ModalViewResultBox>
                        </ModalViewResultDiv>
                        <ModalViewButtonDiv>
                            <Button
                                onClick={() => {
                                    setAgree(agree + 1);
                                    setWait(wait - 1);
                                }}
                            >
                                O
                            </Button>
                            <Button
                                onClick={() => {
                                    setDisagree(disagree + 1);
                                    setWait(wait - 1);
                                }}
                            >
                                X
                            </Button>
                        </ModalViewButtonDiv>
                    </ReadyModalView>
                </ModalBackdrop>
            </ModalContainer>
        </div>
    );
};

export default GameStartModal;
