import { styled } from "styled-components";

const Container = styled.div`
    padding: 20px;
    padding-bottom: 40px;
    width: 700px;
    height: 300px;
    background: var(--macciato);
    text-align: center;
    border-radius: 5px;
`;

const Title = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 32px;
    color: var(--dusty-pink-dark);
`;

const FlexBox = styled.div`
    display: flex;
`;

const Content = styled.button`
    background-color: var(--white);
    margin-right: 10px;
    margin-left: 10px;
    width: 350px;
    height: 150px;
    border-radius: 5px;
    font-size: 32px;
    color: var(--beige-dark);
    box-shadow: 3px 3px 3px var(--blacks);
    transition-duration: 0.3s;
    :active {
        margin-left: 15px;
        margin-top: 15px;
        box-shadow: none;
    }
    &:hover {
        cursor: pointer;
    }
    &.active {
        background-color: var(--beige-reverse);
    }
`;

export { Container, Title, FlexBox, Content };
