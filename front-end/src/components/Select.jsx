import styled from "styled-components";

const Container = styled.div`
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    width: 200px;
    height: 200px;
    background: #f2ead3;
    text-align: center;
`;
const Head = styled.div`
    padding-bottom: 10px;
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
`;

function Select({ text1, text2 }) {
    return (
        <Container>
            <Head>제시어 카테고리</Head>
            <Line>
                <Content>{text1}</Content>
                <Content>{text2}</Content>
                <Content>{text1}</Content>
            </Line>
            <Line>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
            </Line>
            <Line>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
            </Line>
            <Line>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
            </Line>
            <Line>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
            </Line>
            <Line>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
            </Line>
            <Line>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
                <Content>스포츠</Content>
            </Line>
        </Container>
    );
}

export default Select;
