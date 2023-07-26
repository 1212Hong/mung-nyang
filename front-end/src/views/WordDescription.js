import React from "react";
import styled from "styled-components";
import VideoBoxing from "../components/VideoBoxing";
import Button from "../components/Button";
import CameraIcon from "../assets/img/camera.png";
const Container = styled.div`
    margin: 0;
    border: 1px solid black;
`;
const Participants = styled.div`
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "500px")};
    border: ${(props) => (props.border ? props.border : "1px solid black")};
    display: flex;
`;
const CurParticipants = styled.div`
    width: ${(props) => (props.width ? props.width : "50%")};
    height: ${(props) => (props.height ? props.height : "480px")};
    border: ${(props) => (props.border ? props.border : "1px solid black")};
    margin: ${(props) => (props.margin ? props.margin : "10px")};
`;
const CurFunction = styled.div`
    width: ${(props) => (props.width ? props.width : "95%")};
    height: ${(props) => (props.height ? props.height : "60%")};
    border: ${(props) => (props.border ? props.border : "1px solid black")};
    margin: ${(props) => (props.margin ? props.margin : "5px")};
    box-sizing: border-box;
`;
const CurSubFunction = styled.div`
    display: flex;
    width: ${(props) => (props.width ? props.width : "95%")};
    height: ${(props) => (props.height ? props.height : "45%")};
    border: ${(props) => (props.border ? props.border : "1px solid black")};
    margin: ${(props) => (props.margin ? props.margin : "5px")};
    box-sizing: border-box;
`;
const CurSubBtn = styled.div`
    width: ${(props) => (props.width ? props.width : "60%")};
    height: 90%;
    margin: ${(props) => (props.margin ? props.margin : "3px")};
    border: 1px solid black;
`;
const WaitingParticipants = styled.div`
    width: 20%;
    margin: 5px;
    border: 1px solid black;
    border-radius: 5px;
`;
const user_list = ["권영재", "김대홍", "손임현", "이민규", "홍주영"];
function WordDescription() {
    return (
        <Container>
            <Participants>
                <CurParticipants width={"60%"}>
                    <VideoBoxing width={"100%"} height={"100%"}></VideoBoxing>
                </CurParticipants>
                <CurParticipants width={"40%"}>
                    <CurFunction>
                        <VideoBoxing width={"100%"}></VideoBoxing>
                    </CurFunction>
                    <CurFunction height={"36%"}>
                        <CurSubFunction>
                            <Button
                                width={"100%"}
                                height={"100%"}
                                text={"제시어 : ?????"}
                                fontSize={"32px"}
                            ></Button>
                        </CurSubFunction>
                        <CurSubFunction>
                            <CurSubBtn>
                                <Button
                                    width={"100%"}
                                    height={"100%"}
                                    text={"정답"}
                                    fontSize={"32px"}
                                ></Button>
                            </CurSubBtn>
                            <CurSubBtn width={"40%"}>
                                <img alt="camera" src={CameraIcon}></img>
                            </CurSubBtn>
                        </CurSubFunction>
                    </CurFunction>
                </CurParticipants>
            </Participants>
            <Participants height={"200px"}>
                {user_list.map((user, index) => (
                    <WaitingParticipants>
                        <VideoBoxing key={index} width={"100%"}>
                            {user}
                        </VideoBoxing>
                    </WaitingParticipants>
                ))}
            </Participants>
        </Container>
    );
}

export default WordDescription;
