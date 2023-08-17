import styled from "styled-components";

export const Container = styled.div`
    text-align: center;
`;

export const Head = styled.div`
    background-color: var(--brown-dark);
    color: var(--white);
    margin-top: 20px;
    padding: 30px;
    margin-left: 200px;
    margin-right: 200px;
    font-size: 32px;
    border-radius: 10px;
`;

export const Line = styled.div`
    margin-top: 30px;
    margin-left: 30px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 450px 450px 450px;
`;

export const Content = styled.button`
    position: relative;
    width: 300px;
    height: 70px;
    font-size: 32px;
    background-color: var(--white);
    border-color: var(--white);
    margin-bottom: 20px;
    border-radius: 10px;
    color: var(--brown-dark);
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.3);
        cursor: pointer;
    }
`;

export const Image = styled.img`
    position: absolute;
    top: 5px;
    left: 80%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid var(--brown-dark);
`;

export const NotificationContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--yellow);
    padding: 30px 40px;
    border-radius: 5px;
    display: ${(props) => (props.show ? "block" : "none")};
    transition: display 5s;
    font-size: 48px;
    color: var(--brown-dark);
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: ${(props) => (props.show ? "block" : "none")};
`;
