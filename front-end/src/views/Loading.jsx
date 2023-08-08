import imgSrc from "../assets/img/loadingback.png";
import {
    Container,
    TextBox,
    TipItem,
    LoadingItem,
    LoadingText,
} from "../components/layout/loading";

const Loading = () => {
    const loadingText = "Now Loading...";

    return (
        <Container>
            <img width={1000} height={670} src={imgSrc} alt="" />
            <TextBox>
                <TipItem>Tip : 게임시작 전 간단한 스트레칭은 어떤가요?</TipItem>
                <LoadingItem>
                    {loadingText.split("").map((letter, index) => (
                        <LoadingText key={index} delay={0.1 * (index + 1)}>
                            {letter}
                        </LoadingText>
                    ))}
                </LoadingItem>
            </TextBox>
        </Container>
    );
};
export default Loading;
