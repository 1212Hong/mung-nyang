import React from "react";
import { styled } from "styled-components";

const Input = (props) => {
    const { type, width, height, fontSize } = props;

    const StyledInput = styled.input`
        width: ${width ?? "100px"};
        height: ${height ?? "30px"};
        border: none;
        background-color: #d9d9d9;
        color: #868686;
        font-size: ${fontSize ?? "12px"};
        padding: 10px;
        border-radius: 10px;
        &:focus {
            outline: none;
        }
    `;

    return <StyledInput type={type} />;
};

export default Input;
