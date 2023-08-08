import React from "react";
import styled from "styled-components";

const ChooseContainer = styled.div`
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

const ChooseContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
`;

const ChooseModal = ({ answerer }) => {
    return (
        <ChooseContainer>
            <ChooseContent>
                <h2>{`정답자 ${answerer}이 선정되었습니다.`}</h2>
            </ChooseContent>
        </ChooseContainer>
    );
};

export default ChooseModal;
