import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--dusty-pink-light);
`;

export const TextBox = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    color: var(--brown-dark);
    margin-top: 10px;
`;

export const TipItem = styled.div`
    margin-left: 10px;
`;

export const LoadingItem = styled.div`
    margin: 0px 20px 20px 0px;
    display: inline-block;
`;

const jumpAnimation = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
`;

export const LoadingText = styled.span`
    display: inline-block;
    animation: ${jumpAnimation} 2.5s infinite;
    animation-delay: ${(props) => props.delay}s;
`;
