import styled from "styled-components";
import smell from "../assets/img/smell.png";
import cat from "../assets/img/cat.png";
import loading from "../assets/img/loading.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const ImgBox = styled.div`
    display: flex;
`;
const TextBox = styled.div``;
const ImgItem = styled.div``;

const Loading = () => {
    return (
        <Container>
            <ImgBox>
                <ImgItem>
                    <img src={loading} alt="" />
                </ImgItem>
                <ImgItem>
                    <img src={smell} alt="" />
                </ImgItem>
                <ImgItem>
                    <img src={cat} alt="" />
                </ImgItem>
            </ImgBox>
            <TextBox></TextBox>
        </Container>
    );
};
export default Loading;
