import styled from "styled-components";

export const Box = styled.div`
    display: grid;
    grid-template-columns: 430px 430px 430px;
    margin-left: 35px;
`;

export const Item = styled.div`
    margin-top: 15px;
    transition: all 0.2s ease-in-out;
    position: relative;

    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
`;

export const NotificationContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    display: ${(props) => (props.show ? "block" : "none")};
    transition: display 0.2s;
    font-size: 72px;
    color: var(--white);
`;

export const ImageOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-70%, -50%);
    display: ${(props) => (props.active ? "block" : "none")};
`;
