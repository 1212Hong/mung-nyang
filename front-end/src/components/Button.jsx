import React from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import effect from "../assets/audio/dog-toy.mp3";

const StyledButton = styled(motion.button)`
    width: ${(props) =>
        props.type !== "icon" && !props.width ? "200px" : props.width};
    height: ${(props) =>
        props.type !== "icon" && !props.height
            ? "50pxconsole.log(subscriber);"
            : props.height};
    background: ${(props) =>
        props.background
            ? `var(--${props.background})`
            : `var(--vanilla-cream)`};
    font-size: ${(props) => props.fontSize};
    color: ${(props) =>
        props.color ? `var(--${props.color})` : `var(--white)`};
    font-weight: ${(props) => props.weight};
    border-radius: ${(props) => (props.border ? props.border : "30px")};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    object-fit: ${(props) => (props.type === "icon" ? "fill" : "none")};
    padding: ${(props) => (props.type === "icon" ? "0" : props.padding)};
    margin: ${(props) => props.margin};
    border: none;
    &:hover {
        transition: all 0.8s;
        color: ${(props) =>
            props.hovercolor ? `var(--${props.hovercolor})` : `var(--black)`};
        background-color: ${(props) =>
            props.hoverbgcolor
                ? `var(--${props.hoverbgcolor})`
                : `var(--macciato)`};
    }
    box-shadow: ${(props) =>
        props.shadow !== "none" ? `2px 2px 2px var(--gray)` : null};
    transition-duration: 0.3s;
    &:active {
        margin-left: 15px;
        margin-right: 15px;
        box-shadow: none;
    }
`;

const Button = (props) => {
    const audio = new Audio(effect);

    const {
        width,
        height,
        hovercolor,
        hoverbgcolor,
        background,
        fontSize,
        color,
        weight,
        border,
        onClick,
        children,
        type,
        text,
        shadow,
        clickactive,
        padding,
        margin,
        volume = 0.3,
        disabled,
    } = props;
    audio.volume = volume;
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
            hovercolor={hovercolor}
            hoverbgcolor={hoverbgcolor}
            padding={padding}
            margin={margin}
            disabled={disabled}
            shadow={shadow}
            clickactive={clickactive}
        >
            {text}
            {children}
        </StyledButton>
    );
};

export default Button;
