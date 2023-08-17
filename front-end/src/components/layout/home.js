import { styled } from "styled-components";

export const HomeContainer = styled.div`
    display: flex;
    min-width: 1280px;
    min-height: 720px;
    flex-direction: row;
    justify-content: center;
`;

export const LeftBox = styled.div`
    min-width: 440px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const RightBox = styled.div`
    background-position: "center"; // 이미지 위치
    background-size: cover;
    background-repeat: "no-repeat"; // 이미지 반복 지정
    min-width: 840px;
    height: 100%;
`;

export const HeaderBox = styled.div`
    margin: 45px;
`;

export const SubHeaderBox = styled.div`
    margin: 10px;
`;

export const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ButtonBox = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
`;
