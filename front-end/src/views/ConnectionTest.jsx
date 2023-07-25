import React from "react";
import styled from "styled-components";
import VideoComponent from "../components/VideoBoxing";
// import Button from "../components/Button";
import SettingImg from "../assets/img/signaling_8896988 1.svg";

function ConnectionTest() {
    const Container = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: #ded7be;
        border-radius: 10px;
    `;

    const ContainerBody = styled.div`
        width: 100vw;
        height: 90%;
        display: flex;
        flex-direction: row;
        background-color: #ded7be;
    `;
    const HeaderBox = styled.div`
        width: 100vw;
        height: 10%;
        background-color: white;
        border-radius: 10px;
    `;
    const LeftBox = styled.div`
        width: 47%;
        height: 90%;
        background-color: white;
        border-radius: 10px;
        margin: 30px;
        display: flex;
        justify-content: center;
    `;

    const RightBox = styled.div`
        width: 47%;
        height: 90%;
        background-color: white;
        border-radius: 10px;
        margin: 30px;
    `;

    return (
        <Container>
            <HeaderBox>
                <img src={SettingImg} alt="Setting" width="50" height="50" />
            </HeaderBox>
            <ContainerBody>
                <LeftBox>
                    <VideoComponent width="450" height="450" />
                </LeftBox>
                <RightBox></RightBox>
            </ContainerBody>
        </Container>
    );
}

export default ConnectionTest;
