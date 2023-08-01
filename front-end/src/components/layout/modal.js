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
const ModalView = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    width: 500px;
    height: 200px;
    background-color: var(--white);
    > div.desc {
        margin: 50px;
        font-size: 20px;
        color: var(--macciato);
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

export { ModalBackdrop, ModalContainer, ModalView };
