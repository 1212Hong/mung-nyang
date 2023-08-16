import styled from "styled-components";

export const Container = styled.div`
    background-color: var(--brown-white);
    height: 100%;
`;

export const TitleBox = styled.div`
    display: flex;
    padding: 20px;
    font-size: 64px;
    justify-content: space-between;
`;

export const RankBoxFrame = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const RankBox = styled.div`
    border: 1px solid #ccc;
    height: 230px;
    background-color: white;
    padding: 20px;
    text-align: center;
    display: flex;
    border-radius: 20px;
`;

export const PersonBox = styled.div`
    display: flex;
    margin: 30px;
`;

export const Border = styled.div`
    margin-top: 5px;
    padding-bottom: 5px;
    padding-left: 100px;
    border: 2px solid white;
    display: flex;
    font-size: 32px;
`;

export const FrameBox = styled.div`
    display: flex;
`;

export const LineFrame = styled.div``;

export const ImgFrame = styled.div``;

export const ImgItem = styled.div``;

export const LineItem = styled.div`
    padding-left: 20px;
    padding-bottom: 5px;
    border: 2px solid white;
    display: flex;
    font-size: 32px;
`;

export const RankItem = styled.div``;

export const RankItemFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const NameItem = styled.div``;

export const UpItem = styled.div``;

export const ScoreItem = styled.div``;

export const TitleItem = styled.div``;

export const Frame = styled.div`
    display: flex;
`;

export const SetItem = styled.div`
    font-size: 32px;
`;

export const BtnBox = styled.div`
    margin-right: 20px;
`;

export const ImgBox = styled.div`
    text-align: right;
`;
