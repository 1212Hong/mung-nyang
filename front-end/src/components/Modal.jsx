import React, { useState } from "react";
import { styled } from "styled-components";

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
const ModalView = styled.div.attrs((props) => ({
    // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
    role: "dialog",
}))`
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
        color: var(--coz-purple-600);
    }
`;
const ModalBackdrop = styled.div`
    // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
    z-index: 1; //위치지정 요소
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const modalToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <ModalContainer>
                "hi"
                {isOpen ? (
                    <ModalBackdrop onClick={modalToggle}>
                        <ModalView>
                            <h2>hi</h2>
                        </ModalView>
                    </ModalBackdrop>
                ) : null}
            </ModalContainer>
        </>
    );
};

export default Modal;
