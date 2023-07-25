import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    width: 200px;
    height: 200px;
    background: #f2ead3;
    text-align: center;
`;
const Head = styled.div`
    padding-bottom: 15px;
`;
const Line = styled.div`
    margin-bottom: 5px;
    display: grid;
    grid-template-columns: 70px 70px 70px;
`;
const Content = styled.button`
    width: 50px;
    font-size: 8px;
    background-color: #f5f5f5;
    border-color: #f5f5f5;
    margin-bottom: 10px;
    border-radius: 5px;
`;

const Select = (props) => {
    const { list, maxButtons } = props;
    const buttonList = list.slice(0, maxButtons);
    return (
        <Container>
            <Head>제시어 카테고리</Head>
            <Line>
                {buttonList.map((item, index) => (
                    <Content key={index}>{item}</Content>
                ))}
            </Line>
        </Container>
    );
};

export default Select;
