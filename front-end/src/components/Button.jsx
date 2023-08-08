import React from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import effect from "../assets/audio/dog-toy.mp3";

const StyledButton = styled(motion.button)`
    width: ${(props) =>
        props.type !== "icon" && !props.width ? "200px" : props.width};
    height: ${(props) =>
        props.type !== "icon" && !props.height ? "50px" : props.height};
    background: ${(props) =>
        props.background
            ? `var(--${props.background})`
            : `var(--vanilla-cream)`};
    font-size: ${(props) => props.fontSize};
    color: ${(props) =>
        props.color ? `var(--${props.color})` : `var(--white)`};
    font-weight: ${(props) => props.weight};
    border-radius: ${(props) => props.border};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    object-fit: ${(props) => (props.type === "icon" ? "fill" : "none")};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    border: none;
    &:hover {
        transition: all 0.8s;
        color: ${(props) =>
            props.hoverColor ? `var(--${props.hoverColor})` : `var(--black)`};
        background-color: ${(props) =>
            props.hoverBgColor
                ? `var(--${props.hoverBgColor})`
                : `var(--macciato)`};
    }
`;

const Button = (props) => {
    const audio = new Audio(effect);

    const {
        width,
        height,
        hoverColor,
        hoverBgColor,
        background,
        fontSize,
        color,
        weight,
        border,
        onClick,
        children,
        type,
        text,
        // audioURL,
        // -> url props로는 못줄거같고 특정 사운드 후보들 미리 저장해두고 바꿔쓰기는 가능
        padding,
        margin,
    } = props;

    // const test = new Audio(audioURL && "");

    return (
        <StyledButton
            width={width}
            height={height}
            background={background}
            fontSize={fontSize}
            color={color}
            weight={weight}
            border={border}
            onClick={() => {
                audio.play();
                // test.play();
                onClick && onClick();
            }}
            type={type}
            hoverColor={hoverColor}
            hoverBgColor={hoverBgColor}
            padding={padding}
            margin={margin}
        >
            {text}
            {children}
        </StyledButton>
    );
};

export default Button;
