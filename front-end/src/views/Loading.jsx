import imgSrc from "../assets/img/loadingback.png";
import {
    Container,
    TextBox,
    TipItem,
    LoadingItem,
    LoadingText,
} from "../components/layout/loading";

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
