import styled from "styled-components";

export const PenaltyBox = styled.div`
    margin-top: 10px;
    display: flex;
`;

export const LeftItem = styled.div`
    flex: 1;
`;

export const RightItem = styled.div`
    flex: 3;
    margin-left: 10px;
    display: flex;
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
    margin-left: 20px;
    margin-right: 5px;
    margin-top: 10px;
`;

export const UsersBox = styled.div`
    margin-top: 20px;
`;
