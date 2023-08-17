import React, { forwardRef } from "react";
import { styled } from "styled-components";

const StyledInput = styled.input`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: none;
    background-color: var(--white);
    color: var(--black);
    font-size: ${(props) => props.fontSize};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    border-radius: 10px;
    placeholder: ${(props) => props.placeholder};
    &:focus {
        outline: none;
    }
`;

const Input = forwardRef((props, ref) => {
    const {
        type,
        width,
        height,
        placeholder,
        margin,
        padding,
        onChange,
        id,
        value,
        disabled,
        onKeyPress,
        required,
    } = props;

    return (
        <StyledInput
            type={type}
            placeholder={placeholder}
            width={width}
            height={height}
            margin={margin}
            padding={padding}
            onChange={onChange}
            id={id}
            value={value}
            disabled={disabled}
            ref={ref}
            onKeyPress={onKeyPress}
            required={required}
        />
    );
});

export default Input;
