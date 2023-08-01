import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../components/Button";

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
const Line = styled.div`
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid white;
    display: flex;
`;
const Content = styled.div`
    margin-left: 200px;
    font-size: 32px;
`;
const Nickname = styled.div`
    margin-left: 170px;
    font-size: 32px;
`;
const Upscore = styled.div`
    margin-left: 160px;
    font-size: 32px;
`;
const Total = styled.div`
    margin-left: 100px;
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
const NotificationContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px 20px;
    border-radius: 5px;
    display: ${(props) => (props.show ? "block" : "none")};
    transition: display 0.2s;
    font-size: 72px;
`;

const ScoreTotal = (props) => {
    const { title, userlist, set, totalset } = props;

    return (
        <Container>
            <Head>
                <Win>{title}</Win>
                <Set>
                    세트 : {set} / {totalset}
                </Set>
            </Head>
            <Body>
                <Line>
                    <Content>Rank</Content>
                    <Nickname>닉네임</Nickname>
                    <Upscore>오른 점수</Upscore>
                    <Total>총 점수</Total>
                </Line>
                {userlist.map((user, index) => (
                    <Line key={index}>
                        <Content>{index + 1}st</Content>
                        <Content>{user.username}</Content>
                        <Content>{user.upscore}</Content>
                        <Content>{user.total}</Content>
                    </Line>
                ))}
            </Body>
            <Btn>
                <Button fontSize="32px" fontColor="var(--brown-dark)">
                    다음
                </Button>
            </Btn>
            <NotificationContainer show={showNotification}>
                라이어를 선택하세요.
            </NotificationContainer>
        </Container>
    );
};

export default ScoreTotal;
