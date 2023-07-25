import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    width: 600px;
    height: 300px;
    background: #f2ead3;
    text-align: center;
    border-radius: 5px;
`;
const Head = styled.div`
    padding-bottom: 30px;
    font-size: 32px;
`;
const Line = styled.div`
    margin-bottom: 5px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 210px 210px 210px;
`;
const Content = styled.button`
    width: 150px;
    height: 50px;
    font-size: 16px;
    background-color: #f5f5f5;
    border-color: #f5f5f5;
    margin-bottom: 30px;
    border-radius: 5px;
    color: #3d2302;
`;

const Select = (props) => {
    const { list, title } = props;
    return (
        <Container>
            <Head>{title}</Head>
            <Line>
                {list.map((item, index) => (
                    <Content key={index}>{item}</Content>
                ))}
            </Line>
        </Container>
    );
};

export default Select;
