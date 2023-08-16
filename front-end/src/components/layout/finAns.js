import { styled } from "styled-components";

export const Box = styled.div`
    background-color: var(--beige);
    width: 460px;
    height: 370px;
    border: 1px solid var(--black);
    border-radius: 20px;
    padding: 16px;
    text-align: center;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ColBox = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ImgBox = styled.div`
    position: relative;
    padding: 10px;
`;

export const InputBox = styled.div`
    height: 50px;
    margin: 15px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
`;
