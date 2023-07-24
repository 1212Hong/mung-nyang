import React from "react";
import { styled } from "styled-components";

// 방만들기 버튼, 캡쳐버튼, url복사 버튼 리롤 버튼, 도움말 버튼, 정답 버튼, pass or fail
const Button = (props) => {
    const {
        width,
        height,
        text,
        hoverColor,
        hoverBgColor,
        background,
        fontSize,
        fontColor,
        weight,
        border,
        onClick,
    } = props;

    const StyledButton = styled.button`
        width: ${width ?? "200px"};
        height: ${height ?? "50px"};
        background: ${background ?? "#F4D7C5"};
        font-size: ${fontSize ?? "16px"};
        color: ${fontColor ?? "#F5F5F5"};
        font-weight: ${weight ?? "normal"};
        border-radius: ${border ?? "30px"};
        cursor: pointer;
        align-items: center;
        border: none;
        &:hover {
            transition: 0.8s;
            color: ${hoverColor ? fontColor : "#000"};
            background-color: ${hoverBgColor ? background : "#D08A5F"};
        }
    `;
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
        >
            {text}
        </StyledButton>
    );
};

export default Button;
