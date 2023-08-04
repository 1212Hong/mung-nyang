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
const ModalBackdrop = styled.div`
    // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    inset: 0;
`;

const ChooseModalView = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    width: 700px;
    height: 500px;
    background-color: var(--dusty-pink);
`;
export {
    ModalBackdrop,
    ModalContainer,
    ReadyModalView,
    RuleModalView,
    ChooseModalView,
};
