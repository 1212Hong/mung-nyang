import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { closeModal } from "../../store/modalSlice";
import { changePhase } from "../../store/phaseSlice";
import { MainText } from "../layout/common";

const ChooseContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    z-index: 1000;
`;

const ChooseContent = styled.div`
    background-color: rgba(244, 244, 244, 0.7);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
`;

const ChooseModal = () => {
    const game = useSelector((state) => state.game);
    const { answerer } = game;

    return (
        <ChooseContainer>
            <ChooseContent>
                <MainText>{`정답자 ${answerer}이 선정되었습니다.`}</MainText>
            </ChooseContent>
        </ChooseContainer>
    );
};

export default ChooseModal;
