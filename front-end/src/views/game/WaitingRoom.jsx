import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { ReactComponent as LinkIcon } from "../../assets/img/link_image.svg";
import { ReactComponent as CaptureIcon } from "../../assets/img/capture_image.svg";
import { ReactComponent as DogFootIcon } from "../../assets/img/dog_foot.svg";
import { ReactComponent as QuestionIcon } from "../../assets/img/question_mark.svg";
import { ReactComponent as VolumeOnIcon } from "../../assets/img/volume_on.svg";
import { ReactComponent as VolumeMuteIcon } from "../../assets/img/volume_mute.svg";
import VideoComponent from "../../components/VideoBoxing";
import Participant from "../../components/Participant";
import Input from "../../components/Input";
import {
    ChatBox,
    ChattingBox,
    ChattingInputBox,
    Container,
    Leftbox,
    MenuBox,
    Rightbox,
    StartnSetBox,
    Videobox,
    VideoboxGrid,
} from "../../components/layout/waiting";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modalSlice";
import { ovActions } from "../../store/openviduSlice";

const user_list = ["권영재", "김대홍", "손임현", "이민규", "이현우", "홍주영"];

const host = "권영재";

function WaitingRoom() {
    const [setCnt, setSetCnt] = useState(3);
    const [users, setUsers] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    const openvidu = useSelector((state) => state.openvidu);
    // setUsers(subscribers)
    const {
        OV,
        session,
        subscribers,
        myUserName,
        mySessionId,
        mainStreamManager,
        devices,
    } = openvidu;

    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            if (OV === null || session === undefined) {
                dispatch(() =>
                    ovActions.createOpenvidu({
                        nickname: "test",
                        roomId: mySessionId,
                    }),
                );
            }
            if (session) {
                session.on("streamCreated", (event) => {
                    let subscriber = session.subscribe(event.stream, undefined);

                    subscribers.push(subscriber);
                });
                session.on("streamDestroyed", (event) => {
                    let index = subscribers.indexOf(
                        event.stream.streamManager,
                        0,
                    );
                    if (index > -1) {
                        subscribers.splice(index, 1);
                    }
                });
            }
        };
        init();
    });

    const openRuleBook = () => {
        dispatch(
            openModal({
                modalType: "RuleModal",
                isOpen: true,
            }),
        );
    };
    const openReadyModal = () => {
        dispatch(
            openModal({
                modalType: "ReadyModal",
                isOpen: true,
            }),
        );
    };

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
                    <ChatBox>채팅내용...</ChatBox>
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
                            onClick={() => {
                                openRuleBook();
                            }}
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
                    <Button
                        width="130"
                        height="45"
                        onClick={() => {
                            openReadyModal();
                        }}
                    >
                        START
                    </Button>
                </StartnSetBox>
            </Rightbox>
        </Container>
    );
}

export default WaitingRoom;
