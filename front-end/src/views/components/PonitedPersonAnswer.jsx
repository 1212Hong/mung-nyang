import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    text-align: center;
`;
const Head = styled.div`
    background-color: ${`var(--brown-dark)`};
    padding: 30px;
    margin-left: 375px;
    margin-right: 400px;
    font-size: 32px;
    border-radius: 10px;
`;
const Line = styled.div`
    margin-top: 50px;
    margin-left: 130px;
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
    margin-bottom: 30px;
    border-radius: 10px;
    color: ${`var(--brown-dark)`};
    transition: all 0.2s ease-in-out; /* 확대 효과를 위한 transition 속성 추가 */

    &:hover {
        transform: scale(
            1.5
        ); /* 마우스 커서를 올렸을 때 버튼 크기를 1.1배로 확대 */
        cursor: pointer;
    }
`;

const PonitedPersonAnswer = (props) => {
    const { Answerlst, title } = props;
    return (
        <Container>
            <Head>{title}</Head>
            <Line>
                {Answerlst.map((item, index) => (
                    <Content key={index}>{item}</Content>
                ))}
            </Line>
        </Container>
    );
};

export default PonitedPersonAnswer;
