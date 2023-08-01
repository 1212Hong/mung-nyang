import React from "react";
import styled from "styled-components";
import Timer from "../../components/Timer";

const Container = styled.div`
    text-align: center;
`;
const Head = styled.div`
    background-color: ${`var(--brown-dark)`};
    margin-top: 20px;
    padding: 30px;
    margin-left: 200px;
    margin-right: 200px;
    font-size: 32px;
    border-radius: 10px;
`;
const Line = styled.div`
    margin-top: 30px;
    margin-left: 10px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 450px 450px 450px;
`;
const Content = styled.button`
    width: 300px;
    height: 70px;
    font-size: 32px;
    background-color: ${`var(--white)`};
    border-color: ${`var(--white)`};
    margin-bottom: 20px;
    border-radius: 10px;
    color: ${`var(--brown-dark)`};
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.3);
        cursor: pointer;
    }
`;

const PonitedPersonAnswer = (props) => {
    const { Answerlist, title } = props;
    return (
        <Container>
            <Timer></Timer>
            <Head>{title}</Head>
            <Line>
                {Answerlist.map((item, index) => (
                    <Content key={index}>{item}</Content>
                ))}
            </Line>
        </Container>
    );
};

export default PonitedPersonAnswer;
