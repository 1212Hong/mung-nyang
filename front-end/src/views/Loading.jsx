import styled from "styled-components";
import smell from "../assets/img/smell.png";
import cat from "../assets/img/cat.png";
import loading from "../assets/img/loading.png";
import imgSrc from "../assets/img/loadingBackground.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    background-image: url("../assets/img/loadingBackground.png");
    background-size: cover;
`;
const ImgBox = styled.div`
    margin-right: 50px;
    display: flex;
`;
const TextBox = styled.div`
    margin: 0px 50px 50px 0px;
    font-size: 64px;
`;
const ImgItem = styled.div`
    animation: rotate 3s infinite;
    @keyframes rotate {
        0%,
        100% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(30deg);
        }
        75% {
            transform: rotate(0deg);
        }
    }
`;
const DogItem = styled.div``;

const Loading = () => {
    return (
        <Container>
            <img width={1280} height={500} src={imgSrc} alt="" />
            <ImgBox>
                <ImgItem>
                    <img width={100} height={100} src={loading} alt="" />
                </ImgItem>
                <ImgItem>
                    <img width={100} height={100} src={loading} alt="" />
                </ImgItem>
                <ImgItem>
                    <img width={100} height={100} src={loading} alt="" />
                </ImgItem>
                <ImgItem>
                    <img width={100} height={100} src={loading} alt="" />
                </ImgItem>
                <DogItem>
                    <img width={100} height={100} src={smell} alt="" />
                </DogItem>
                <DogItem>
                    <img width={100} height={100} src={cat} alt="" />
                </DogItem>
            </ImgBox>
            <TextBox>Loading ...</TextBox>
        </Container>
    );
};
export default Loading;
