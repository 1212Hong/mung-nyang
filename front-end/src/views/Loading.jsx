import styled from "styled-components";
import smell from "../assets/img/smell.png";
import cat from "../assets/img/cat.png";
import loading from "../assets/img/loading.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
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

const Loading = () => {
    return (
        <Container>
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
                <ImgItem>
                    <img width={100} height={100} src={smell} alt="" />
                </ImgItem>
                <ImgItem>
                    <img width={100} height={100} src={cat} alt="" />
                </ImgItem>
            </ImgBox>
            <TextBox>Loading ...</TextBox>
        </Container>
    );
};
export default Loading;
