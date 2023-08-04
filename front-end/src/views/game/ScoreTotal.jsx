import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch } from "react-redux";

const Container = styled.div`
    color: black;
`;
const Head = styled.div`
    display: flex;
    padding: 20px;
    font-size: 64px;
`;
const Body = styled.div`
    border: 2px solid black;
`;
const Headline = styled.div`
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid black;
    display: flex;
`;
const Line = styled.div`
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid white;
    display: flex;
`;
const Content = styled.div`
    margin-left: 150px;
    font-size: 32px;
`;
const Rank = styled.div`
    margin-left: 50px;
    font-size: 32px;
`;
const Nickname = styled.div`
    margin-left: 120px;
    font-size: 32px;
`;
const Upscore = styled.div`
    margin-left: 110px;
    font-size: 32px;
`;
const Total = styled.div`
    margin-left: 60px;
    font-size: 32px;
`;
const Win = styled.div`
    margin-right: 50px;
`;
const Set = styled.div`
    padding: 5px;
    margin-top: 35px;
    font-size: 32px;
    margin-left: 670px;
    background-color: var(--beige-dark);
    border-radius: 20px;
`;
const Btn = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const ScoreTotal = (props) => {
    const dispatch = useDispatch();
    const { totalset, title } = props;
    const set = 3;
    const userlist = [
        { username: "개냥이", upscore: "+5", total: 8 },
        { username: "냥냥이", upscore: "+0", total: 7 },
        { username: "씹냥이", upscore: "+0", total: 5 },
        { username: "뚱냥이", upscore: "+0", total: 4 },
        { username: "멍멍이", upscore: "+0", total: 2 },
        { username: "댕댕이", upscore: "+0", total: 0 },
    ];

    const Next = () => {
        if (set === totalset) {
            dispatch(changePhase({ phaseType: "Wait" }));
        } else {
            dispatch(changePhase({ phaseType: "Wait" }));
        }
    };

    return (
        <Container>
            <Head>
                <Win>{title}</Win>
                <Set>
                    세트 : {set} / {totalset}
                </Set>
            </Head>
            <Body>
                <Headline>
                    <Rank>Rank</Rank>
                    <Nickname>닉네임</Nickname>
                    <Upscore>오른 점수</Upscore>
                    <Total>총 점수</Total>
                </Headline>
                {userlist.map((user, index) => (
                    <Line key={index}>
                        <Rank>{index + 1}st</Rank>
                        <Content>{user.username}</Content>
                        <Content>{user.upscore}</Content>
                        <Content>{user.total}</Content>
                    </Line>
                ))}
            </Body>
            <Btn>
                <Button
                    fontSize="32px"
                    fontColor="var(--brown-dark)"
                    onClick={Next}
                >
                    다음
                </Button>
            </Btn>
        </Container>
    );
};

export default ScoreTotal;
