import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    padding-bottom: 40px;
    width: 600px;
    height: 300px;
    background: ${`var(--macciato)`};
    text-align: center;
    border-radius: 5px;
`;
const Head = styled.div`
    width: 150px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 64px;
    text-align: left;
    color: ${`var(--beige-dark)`};
    background-color: ${`var(--brown-dark)`};
`;
const Title = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 32px;
    color: ${`var(--dusty-pink-dark)`};
`;
const Box = styled.div`
    display: flex;
`;
const Content = styled.button`
    background-color: ${`var(--white)`};
    margin-right: 10px;
    margin-left: 10px;
    width: 350px;
    height: 150px;
    border-radius: 5px;
    font-size: 32px;
`;

const Quiz = (props) => {
    const { title, text1, text2 } = props;
    return (
        <Container>
            <Head>QUIZ</Head>
            <Title>{title}</Title>
            <Box>
                <Content>{text1}</Content>
                <Content>{text2}</Content>
            </Box>
        </Container>
    );
};

export default Quiz;
