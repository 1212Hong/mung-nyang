import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { ReactComponent as LinkIcon } from "../assets/img/link_image.svg";
import { ReactComponent as CaptureIcon } from "../assets/img/capture_image.svg";
import { ReactComponent as DogFootIcon } from "../assets/img/dog_foot.svg";
import { ReactComponent as QuestionIcon } from "../assets/img/question_mark.svg";
import { ReactComponent as VolumeOnIcon } from "../assets/img/volume_on.svg";
import { ReactComponent as VolumeMuteIcon } from "../assets/img/volume_mute.svg";
import DropDownSet from "../components/DropDownSet";
import VideoComponent from "../components/VideoBoxing";
import Participant from "../components/Participant";
import Input from "../components/Input";

const Container = styled.div`
    background-color: var(--beige-dark);
    border-radius: 20px;
    height: 750px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 20px;
`;

const Leftbox = styled.div`
    width: 897px;
    height: 700px;
    background-color: var(--beige);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Rightbox = styled.div`
    width: 300px;
    height: 700px;
    background-color: var(--beige);
    border-radius: 20px;
`;

const Videobox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const VideoboxGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 25px;
    grid-auto-flow: row;
    align-items: center;
    justify-content: center;
`;

const ChattingBox = styled.div`
    height: 300px;
    background-color: var(--beige-dark);
    margin: 15px;
    border-radius: 20px;
`;
const ChatBox = styled.div`
    height: 250px;
`;
const ChattingInputBox = styled.div`
    height: 30px;
    margin: 5px;
    border-radius: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const MenuBox = styled.div`
    height: 50px;
    background-color: var(--beige-dark);
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
    display: grid;
    grid-template-columns: 120px 120px;
`;

const user_list = ["권영재", "김대홍", "손임현", "이민규", "이현우", "홍주영"];

const host = "권영재";

function WaitingRoom() {
    const [setCnt, setSetCnt] = useState(3);
    const [isMuted, setIsMuted] = useState(false);

    function selectSet(idx) {
        console.log(setCnt);
        // setSetCnt(setArr[idx]);
    }
    function toggleVolume() {
        setIsMuted((prevState) => !prevState);
    }

    return (
        <Container className="waiting-container">
            <Leftbox>
                <VideoboxGrid className="videos-grid">
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
                <Participant user_list={user_list} host={host} />
                <ChattingBox>
                    <ChatBox></ChatBox>
                    <ChattingInputBox>
                        <Input width="200px" height="15px" />
                        <Button type="icon" background={`var(--white)`}>
                            <DogFootIcon width="15" height="15" />
                        </Button>
                    </ChattingInputBox>
                </ChattingBox>
                <MenuBox>
                    {[
                        { icon: <QuestionIcon width="25" height="20" /> },
                        { icon: <LinkIcon width="25" height="20" /> },
                        { icon: <CaptureIcon width="25" height="20" /> },
                    ].map((item, index) => (
                        <Button
                            key={index}
                            type="icon"
                            background={`var(--beige-dark)`}
                        >
                            {item.icon}
                        </Button>
                    ))}
                    {isMuted ? (
                        <Button
                            key="mute"
                            type="icon"
                            background={`var(--beige-dark)`}
                            onClick={toggleVolume}
                        >
                            <VolumeMuteIcon width="20" height="25" />
                        </Button>
                    ) : (
                        <Button
                            key="on"
                            type="icon"
                            background={`var(--beige-dark)`}
                            onClick={toggleVolume}
                        >
                            <VolumeOnIcon width="20" height="25" />
                        </Button>
                    )}
                </MenuBox>
                <StartnSetBox>
                    <Button width="130" height="50">
                        START
                    </Button>
                    <DropDownSet width={130} cnt={setCnt} />
                </StartnSetBox>
            </Rightbox>
        </Container>
    );
}

export default WaitingRoom;
