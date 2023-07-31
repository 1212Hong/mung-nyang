import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { styled } from "styled-components";
import Modal from "../components/Modal";

const HomeContainer = styled.div`
    display: flex;
    min-width: 1280px;
    min-height: 720px;
    flex-direction: row;
    justify-content: center;
`;

const LeftBox = styled.div`
    min-width: 440px;
`;

const RightBox = styled.div`
    background-color: var(--white);
    min-width: 840px;
`;

const Home = () => {
    return (
        <HomeContainer>
            <LeftBox>
                <h1>홈페이지</h1>
                <h2>h2</h2>
                <h3>h3크기</h3>
                <Input />
                <Button text={"입장"} />
            </LeftBox>
            <RightBox>메인화면</RightBox>
            <Modal>
                hihi
                <Button>확인</Button>
            </Modal>
        </HomeContainer>
    );
};

export default Home;
