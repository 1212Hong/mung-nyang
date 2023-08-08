import React from "react";
import styled from "styled-components";
import { ChooseModalView } from "../layout/modal";

const ChooseContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChooseModal = ({ answerer }) => {
    return (
        <ChooseModalView>
            <ChooseContainer>
                <h2>{`정답자 ${answerer}이 선정되었습니다.`}</h2>
            </ChooseContainer>
        </ChooseModalView>
    );
};

export default ChooseModal;
