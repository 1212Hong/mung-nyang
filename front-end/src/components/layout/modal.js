import { styled } from "styled-components";

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    z-index: 1;
    height: 100%;
`;
const ReadyModalView = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    border-radius: 5px;
    overflow: hidden;
    width: 500px;
    height: 300px;
    background-color: var(--white);
    box-sizing: border-box;
`;
const RuleModalView = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    width: 700px;
    height: 500px;
    background-color: var(--white);
    > div.desc {
        width: 650px;
        height: 450px;
        margin: 50px;
        font-size: 20px;
        background-color: var(--yellow);
    }
`;
const AnswerModalView = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    border-radius: 5px;
    overflow: hidden;
    width: 700px;
    height: 500px;
    background-color: var(--white);
    box-sizing: border-box;
`;
const ModalBackdrop = styled.div`
    // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    inset: 0;
`;
const ModalViewDescDiv = styled.div`
    padding: 20px 0;
    width: 80%;
    text-align: center;
    border-bottom: 1px solid silver;
`;
const ModalViewResultDiv = styled.div`
    padding: 20px 0;
    display: flex;
    width: 80%;
    justify-content: space-around;
    font-size: 24px;
`;

const ModalViewResultBox = styled.div`
    width: 30%;
    margin: 0 5px;
    display: flex;
    justify-content: center;
`;

const FootImgDiv = styled.div`
    text-align: center;
`;

const ModalViewButtonDiv = styled.div`
    color: black;
    display: flex;
`;
const ModalViewCompleteDiv = styled.div`
    background-color: var(--vanilla-cream);
    width: 200px;
    height: 50px;
    border-radius: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    color: var(--white);
    font-weight: bold;
`;

const ChooseModalView = styled.div`
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
const AnswerModalInput = styled.input`
    width: 100%;
    height: 40px;
    padding-left: 30px;
    border-radius: 5px;
    border: none;
    background-color: var(--vanilla-cream);
    opacity: 0.8;
    font-size: 16px;
    text-decoration: none;
    &:focus {
        outline: none;
        text-decoration: none;
    }
`;
const AnswerModalViewDiv = styled.div`
    width: 80%;
    margin: 0 5px;
    display: flex;
    justify-content: center;
`;
export {
    ModalBackdrop,
    ModalContainer,
    ReadyModalView,
    RuleModalView,
    ModalViewDescDiv,
    ModalViewResultDiv,
    ModalViewResultBox,
    ModalViewButtonDiv,
    ModalViewCompleteDiv,
    ChooseModalView,
    AnswerModalView,
    AnswerModalInput,
    AnswerModalViewDiv,
    FootImgDiv,
};
