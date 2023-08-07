import styled, { keyframes } from "styled-components";
import imgSrc from "../assets/img/loadingback.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--dusty-pink-light);
`;
const TextBox = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    color: var(--brown-dark);
    margin-top: 10px;
`;
const TipItem = styled.div`
    margin-left: 10px;
`;
const LoadingItem = styled.div`
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
const LoadingText = styled.span`
    display: inline-block;
    animation: ${jumpAnimation} 2.5s infinite;
    animation-delay: ${(props) => props.delay}s;
`;

const Loading = () => {
    return (
        <Container>
            <img width={1280} height={670} src={imgSrc} alt="" />
            <TextBox>
                <TipItem>Tip : 게임시작 전 간단한 스트레칭은 어떤가요?</TipItem>
                <LoadingItem>
                    <LoadingText delay={0.25}>N</LoadingText>
                    <LoadingText delay={0.5}>o</LoadingText>
                    <LoadingText delay={0.75}>w</LoadingText>
                    <LoadingText delay={1}>&nbsp;</LoadingText>
                    <LoadingText delay={1.25}>L</LoadingText>
                    <LoadingText delay={1.5}>o</LoadingText>
                    <LoadingText delay={1.75}>a</LoadingText>
                    <LoadingText delay={2}>d</LoadingText>
                    <LoadingText delay={2.25}>i</LoadingText>
                    <LoadingText delay={2.5}>n</LoadingText>
                    <LoadingText delay={2.75}>g</LoadingText>
                    <LoadingText delay={3}>&nbsp;</LoadingText>
                    <LoadingText delay={3.25}>.</LoadingText>
                    <LoadingText delay={3.5}>.</LoadingText>
                    <LoadingText delay={3.75}>.</LoadingText>
                </LoadingItem>
            </TextBox>
        </Container>
    );
};
export default Loading;
