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
    background-color: var(--macciato);
    height: 230px;
    padding: 20px;
    text-align: center;
    display: flex;
    border-radius: 20px;
`;

export const RankItem = styled.div`
    margin-right: 10px;
    border: 1px solid var(--brown-dark);
    height: 30px;
    width: 30px;
    background-color: var(--macciato);
    border-radius: 8px;
`;

export const RankItemFrame = styled.div`
    width: 95px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const AnswerItem = styled.div`
    justify-content: center;
    box-shadow: 1px 1px 1px var(--gray);
`;

export const NameItem = styled.div`
    margin-top: 10px;
    padding-left: 45px;
`;

export const ScoreText = styled.div`
    font-size: 48px;
    color: var(--white);
`;

export const RankUserFrame = styled.div`
    display: flex;
`;

export const ScoreItem = styled.div`
    padding-left: 20px;
    padding-bottom: 10px;
`;

export const ColorWhite = styled.div`
    color: var(--white);
`;

export const RankColor = styled.div`
    color: var(--dusty-pink-white);
`;

export const Frame = styled.div`
    display: flex;
`;

export const BtnBox = styled.div`
    margin-right: 20px;
`;
