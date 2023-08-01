import React from "react";
import { styled } from "styled-components";

const StyledInput = styled.input`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: none;
    background-color: var(--white);
    color: var(--black);
    font-size: ${(props) => props.fontSize};
    padding: 10px;
    border-radius: 10px;
    placeholder: ${(props) => props.placeholder};
    &:focus {
        outline: none;
    }
`;

const Input = (props) => {
    const { type, placeholder } = props;

    return <StyledInput type={type} placeholder={placeholder} />;
};

export default Input;
