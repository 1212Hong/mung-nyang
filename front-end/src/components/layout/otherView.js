import styled from "styled-components";

export const AnswerBox = styled.div`
    margin: 20px 0px;
    display: grid;
    grid-template-columns: 700px 600px;
`;

export const AnswerItem = styled.div`
    display: flex;
    justify-content: center;
`;

export const UserBox = styled.div``;

export const Center = styled.div`
    justify-content: center;
    margin-left: 70px;
`;

export const NickName = styled.div`
    text-align: center;
`;

export const Notification = styled.div`
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--yellow);
    border-radius: 5px;
    display: ${(props) => (props.show ? "block" : "none")};
    transition: display 0.2s;
    font-size: 48px;
    color: var(--brown-dark);
    padding: 20px;
    opacity: 0.7;
`;
