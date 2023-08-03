import styled from "styled-components";

export const PenaltyBox = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const LeftItem = styled.div``;

export const RightItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Video = styled.div`
    margin-left: 30px;
    width: 253px;
    height: 450px;
    iframe {
        border-radius: 1.5rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const UsersBox = styled.div`
    margin-top: 20px;
`;
