import styled from "styled-components";

export const Body = styled.div`
    margin-top: 10px;
    display: flex;
`;

export const Left = styled.div`
    flex: 1;
`;

export const Right = styled.div`
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

export const Btn = styled.div`
    margin-left: 20px;
    margin-right: 5px;
    margin-top: 10px;
`;

export const Users = styled.div`
    margin-top: 20px;
`;
