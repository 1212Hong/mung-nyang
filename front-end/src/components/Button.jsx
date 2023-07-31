import React from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
    width: ${(props) =>
        props.type !== "icon" && !props.width ? "200px" : props.width};
    height: ${(props) =>
        props.type !== "icon" && !props.height ? "50px" : props.height};
    background: ${(props) => props.background};
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.fontColor};
    font-weight: ${(props) => props.weight};
    border-radius: ${(props) => props.border};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    object-fit: ${(props) => (props.type === "icon" ? "fill" : "none")};
    padding: 10px 20px;
    border: none;
    &:hover {
        transition: all 0.8s;
        color: ${(props) =>
            props.hoverColor ? props.fontColor : `var(--black)`};
        background-color: ${(props) =>
            props.hoverBgColor ? props.hoverBgColor : `var(--macciato)`};
    }
`;

const Button = (props) => {
    const {
        width,
        height,
        hoverColor,
        hoverBgColor,
        background,
        fontSize,
        fontColor,
        weight,
        border,
        onClick,
        children,
        type,
        text,
    } = props;

    return (
        <StyledButton
            width={width}
            height={height}
            background={background}
            fontSize={fontSize}
            fontColor={fontColor}
            weight={weight}
            border={border}
            onClick={onClick}
            type={type}
            hoverColor={hoverColor}
            hoverBgColor={hoverBgColor}
        >
            {text}
            {children}
        </StyledButton>
    );
};

export default Button;
