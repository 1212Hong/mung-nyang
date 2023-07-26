import React from "react";
import { styled } from "styled-components";

// 방만들기 버튼, 캡쳐버튼, url복사 버튼 리롤 버튼, 도움말 버튼, 정답 버튼, pass or fail
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
    } = props;

    const StyledButton = styled.button`
        width: ${type !== "icon" && !width ? "200px" : width};
        height: ${type !== "icon" && !height ? "50px" : height};
        background: ${background ?? `var(--vanilla-cream)`};
        font-size: ${fontSize ?? "16px"};
        color: ${fontColor ?? `var(--white)`};
        font-weight: ${weight ?? "normal"};
        border-radius: ${border ?? "30px"};
        cursor: pointer;
        align-items: center;
        object-fit: ${type === "icon" ? "fill" : "none"};
        border: none;
        &:hover {
            transition: all 0.8s;
            color: ${hoverColor ? fontColor : `var(--black)`};
            background-color: ${hoverBgColor ? background : `var(--macciato)`};
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
            {/* {text} */}
            {children}
        </StyledButton>
    );
};

export default Button;
