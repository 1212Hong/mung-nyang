import React from "react";
import styled from "styled-components";

function WaitingRoom() {
    const Container = styled.div`
        width: 100%;
        background-color: #ded7be;
        padding: 10px;
    `;
    const ContainerBody = styled.div`
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-evenly;
    `;
    const Leftbox = styled.div`
        width: 60%;
        height: 400px;
        background-color: #f1ead2;
        border: 1px solid black;
    `;

    const Rightbox = styled.div`
        width: 30%;
        height: 400px;
        background-color: #f1ead2;
        border: 1px solid black;
    `;

    return (
        <Container>
            <h1>대기화면</h1>
            <ContainerBody>
                <Leftbox>왼쪽박스</Leftbox>
                <Rightbox>오른쪽박스</Rightbox>
            </ContainerBody>
        </Container>
    );
}

export default WaitingRoom;
