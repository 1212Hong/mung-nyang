import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { closeModal } from "../../store/modalSlice";
import { changePhase } from "../../store/phaseSlice";

const LinkContainer = styled.div`
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

const LinkBox = styled.div`
    background-color: white;
    padding: 20px;
    width: 500px;
    height: 300px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
`;
const LinkTitleBox = styled.div`
    border-bottom: 1px solid gray;
    margin-bottom: 30px;
`;
const LinkContentBox = styled.div`
    width: 80px;
    display: flex;
`;
const LinkContentDesc = styled.div`
    width: 20%;
    border: 1px solid gray;
`;
const LinkContentUrl = styled.div`
    width: 60%;
    border: 1px solid gray;
`;
const LinkContentCopy = styled.div`
    width: 20%;
`;
const PenaltyLinkModal = () => {
    const game = useSelector((state) => state.game);
    const { answerer } = game;

    return (
        <LinkContainer>
            <LinkBox>
                <LinkTitleBox> 링크 리스트 </LinkTitleBox>
                <LinkContentBox>
                    <LinkContentDesc>게임</LinkContentDesc>
                    <LinkContentUrl>www.asdfasdf.sd.casdc</LinkContentUrl>
                    <LinkContentCopy>복사</LinkContentCopy>
                </LinkContentBox>
            </LinkBox>
        </LinkContainer>
    );
};

export default PenaltyLinkModal;
