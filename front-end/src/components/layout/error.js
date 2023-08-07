import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const LeftBox = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RightBox = styled.div``;

export const ImgItem = styled.div`
    margin-top: 70px;
`;

export const TitleItem = styled.div`
    margin-top: 20px;
    font-size: 64px;
`;

export const SubtitleItem = styled.div`
    font-size: 32px;
    margin-bottom: 20px;
`;

export const DescriptionItem = styled.div`
    font-size: 16px;
    margin-top: 10px;
`;

export const Group = styled.div`
    height: 200px;
    padding: 0px 40px;
    background-color: var(--dusty-pink-white);
    border-radius: 20px;
`;
