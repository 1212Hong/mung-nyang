import styled from "styled-components";

const Container = styled.div`
    height: 720px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const HeaderBox = styled.div`
    width: 900px;
    height: 150px;
    display: flex;
    justify-content: space-evenly;
`;

const VideoBox = styled.div`
    width: 280px;
    height: 150px;
`;

const StateBox = styled.div`
    width: 700px;
    height: 380px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--beige);
`;

const FooterBox = styled.div`
    width: 900px;
    height: 150px;
    display: flex;
    justify-content: space-evenly;
`;
const AnswerBox = styled.div`
    width: 800px;
    height: 380px;
    background: var(--beige);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Footer = styled.div`
    width: 500px;
    display: flex;
    justify-content: space-between;
`;

export {
    Container,
    HeaderBox,
    VideoBox,
    StateBox,
    Footer,
    AnswerBox,
    FooterBox,
};
