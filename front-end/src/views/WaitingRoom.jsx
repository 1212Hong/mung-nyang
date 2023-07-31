import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { ReactComponent as LinkIcon } from "../assets/img/link_image.svg";
import { ReactComponent as CaptureIcon } from "../assets/img/capture_image.svg";
import { ReactComponent as DogFootIcon } from "../assets/img/dog_foot.svg";
import { ReactComponent as QuestionIcon } from "../assets/img/question_mark.svg";
import DropDown from "../components/DropDown";
import VideoComponent from "../components/VideoBoxing";
import Participant from "../components/participant";

const Container = styled.div`
    background-color: ${`var(--beige-dark)`};
    border-radius: 20px;
`;

const ContainerBody = styled.div`
    height: 750px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Leftbox = styled.div`
    width: 897px;
    height: 700px;
    background-color: ${`var(--beige)`};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Rightbox = styled.div`
    width: 300px;
    height: 700px;
    background-color: ${`var(--beige)`};
    border-radius: 20px;
`;

const Videobox = styled.div`
    background-color: ${`var(--beige-dark)`};
    width: 423px;
    height: 200px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

const VideoboxGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 50px;
    grid-auto-flow: row;
    align-items: center;
    justify-content: center;
`;

const ParticipantBox = styled.div`
    background-color: ${`var(--beige-dark)`};
    margin: 15px;
    border-radius: 20px;
`;

const ChattingBox = styled.div`
    height: 300px;
    background-color: ${`var(--beige-dark)`};
    margin: 15px;
    border-radius: 20px;
`;
const ChatBox = styled.div`
    height: 250px;
`;
const ChattingInputBox = styled.div`
    height: 30px;
    background-color: white;
    margin: 5px;
    border-radius: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const MenuBox = styled.div`
    height: 50px;
    background-color: ${`var(--beige-dark)`};
    margin: 15px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
`;

const StartnSetBox = styled.div`
    height: 50px;
    margin: 15px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
`;

const StartBox = styled.div`
    height: 50px;
    border-radius: 20px;
    width: 130px;
    background-color: #f1ead2;
    margin-right: 20px;
`;

const SetBox = styled.div`
    height: 50px;
    border-radius: 20px;
    width: 120px;
    background-color: #ded7be;
`;
const user_list = ["권영재", "김대홍", "손임현", "이민규", "이현우", "홍주영"];

const host = "권영재";

function WaitingRoom() {
    const [setCnt, setSetCnt] = useState(3);

    function selectSet(idx) {
        console.log(setCnt);
        // setSetCnt(setArr[idx]);
    }

    return (
        <Container>
            <ContainerBody>
                <Leftbox>
                    <VideoboxGrid>
                        {user_list.map((user, index) => (
                            <React.Fragment key={index}>
                                <Videobox>
                                    <VideoComponent width="423" height="200" />
                                </Videobox>
                            </React.Fragment>
                        ))}
                    </VideoboxGrid>
                </Leftbox>
                <Rightbox>
                    <ParticipantBox>
                        <Participant user_list={user_list} host={host} />
                    </ParticipantBox>
                    <ChattingBox>
                        <ChatBox></ChatBox>
                        <ChattingInputBox>
                            <Button type="icon" background="#FFFFFF">
                                <DogFootIcon width="15" height="10" />
                            </Button>
                        </ChattingInputBox>
                    </ChattingBox>
                    <MenuBox>
                        <Button type="icon" background="#ded7be">
                            <QuestionIcon width="30" height="20" />
                        </Button>
                        <Button type="icon" background="#ded7be">
                            <LinkIcon width="30" height="20" />
                        </Button>
                        <Button type="icon" background="#ded7be">
                            <CaptureIcon width="30" height="20" />
                        </Button>
                    </MenuBox>
                    <StartnSetBox>
                        <StartBox>
                            <Button width="130px" height="50px">
                                START
                            </Button>
                        </StartBox>
                        <DropDown />
                    </StartnSetBox>
                </Rightbox>
            </ContainerBody>
        </Container>
    );
}

export default WaitingRoom;
