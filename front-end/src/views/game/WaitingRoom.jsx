import React, { useEffect, useState, useRef, forwardRef } from "react";
import Button from "../../components/Button";
import mainBgm from "../../assets/audio/mainBgm.wav";
import { ReactComponent as LinkIcon } from "../../assets/img/link_image.svg";
import { ReactComponent as CaptureIcon } from "../../assets/img/capture_image.svg";
import { ReactComponent as DogFootIcon } from "../../assets/img/dog_foot.svg";
import { ReactComponent as QuestionIcon } from "../../assets/img/question_mark.svg";
import { ReactComponent as VolumeOnIcon } from "../../assets/img/volume_on.svg";
import { ReactComponent as VolumeMuteIcon } from "../../assets/img/volume_mute.svg";
import VideoComponent from "../../components/VideoComponent";
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
    ChatItem,
} from "../../components/layout/waiting";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modalSlice";
import { startGameVote } from "../../api/game";
import Dropdown from "../../components/Dropdown";
import { SmallText, SubText } from "../../components/layout/common";
import { gameActions } from "../../store/gameSlice";
import { ovActions } from "../../store/openviduSlice";
function WaitingRoom() {
    const [isMuted, setIsMuted] = useState(false);
    const [setCnt, setSetCnt] = useState(1); // redux에 저장해두고 getVoteRes에 넣어주기
    // const [userMessage, setUserMessage] = useState("");
    const userMessage = useRef("");
    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, publisher, mySessionId, session, owner } = openvidu;
    console.log(subscribers);
    console.log(session);
    console.log(openvidu.messageList);
    const messageEndRef = useRef();
    const dispatch = useDispatch();

    const onInputChange = (e) => {
        setSetCnt(e.target.value);
    };

    const signalStartGameVote = async () => {
        session.signal({
            data: "start",
            to: [],
            type: "startGameVote",
        });
    };

    const openRuleBook = () => {
        dispatch(
            openModal({
                modalType: "RuleModal",
                isOpen: true,
            }),
        );
    };
    const openReadyModal = async () => {
        const memberCnt = session.streamManagers.length;
        console.log(session.streamManagers.length);
        if (memberCnt > 1) {
            startGameVote(mySessionId);
            await signalStartGameVote();
            dispatch(gameActions.saveSetCnt(setCnt));
        } else {
            dispatch(
                openModal({
                    modalType: "NoReadyModal",
                    isOpen: true,
                }),
            );
        }
    };

    const sendMessage = async () => {
        session.signal({
            data: userMessage.current.value,
            to: [],
            type: "chat",
        });
    };
    function toggleVolume() {
        setIsMuted((prevState) => !prevState);
        const bgmAudio = document.querySelector("audio");
        if (bgmAudio) {
            bgmAudio.muted = !bgmAudio.muted;
        }
    }
    console.log(openvidu.messageList.length);
    useEffect(() => {
        const bgmAudio = new Audio(mainBgm);
        bgmAudio.preload = "auto";

        bgmAudio.oncanplay = () => {
            bgmAudio.volume = 0.2;
            bgmAudio.play();
        };
    }, []);
    useEffect(() => {
        // session.on("signal:chat", (event) => {
        //     const data = JSON.parse(event.data);
        //     console.log(data);
        // });
    });
    return (
        <Container className="waiting-container">
            <audio loop>
                <source src={mainBgm} type="audio/wav" />
            </audio>
            <Leftbox>
                <VideoboxGrid className="videos-grid">
                    {publisher && (
                        <Videobox>
                            <VideoComponent
                                width="380"
                                height="200"
                                streamManager={publisher}
                            />
                        </Videobox>
                    )}
                    {subscribers &&
                        subscribers.map((sub, i) => (
                            <React.Fragment key={i}>
                                <Videobox>
                                    <VideoComponent
                                        width="380"
                                        height="200"
                                        streamManager={sub}
                                    />
                                </Videobox>
                            </React.Fragment>
                        ))}
                </VideoboxGrid>
            </Leftbox>
            <Rightbox>
                {/* (
                <Participant
                    user_list={subscribers}
                    // host={host}
                />
                ) */}
                <ChattingBox>
                    <ChatBox>
                        {openvidu.messageList.map((item, index) => (
                            <ChatItem key={index}>
                                <>{item.userName}</>
                                <>{item.userMessage}</>
                            </ChatItem>
                        ))}
                        <ChatItem ref={messageEndRef}></ChatItem>
                    </ChatBox>
                    <ChattingInputBox>
                        <Input width="200px" height="15px" ref={userMessage} />
                        <Button
                            type="icon"
                            background={`var(--white)`}
                            onClick={sendMessage}
                        >
                            <DogFootIcon width="15" height="15" />
                        </Button>
                    </ChattingInputBox>
                </ChattingBox>
                <MenuBox>
                    {[
                        { icon: <QuestionIcon width="23" height="23" /> },
                        { icon: <LinkIcon width="23" height="23" /> },
                        { icon: <CaptureIcon width="23" height="23" /> },
                    ].map((item, index) => (
                        <Button
                            key={index}
                            type="icon"
                            width="55px"
                            height="40px"
                            background={`var(--beige-dark)`}
                            onClick={() => {
                                openRuleBook();
                            }}
                        >
                            {item.icon}
                        </Button>
                    ))}
                    <Button
                        key="mute"
                        type="icon"
                        width="55px"
                        height="40px"
                        background={`var(--beige-dark)`}
                        onClick={toggleVolume}
                    >
                        {isMuted ? (
                            <VolumeMuteIcon width="23" height="23" />
                        ) : (
                            <VolumeOnIcon width="23" height="23" />
                        )}
                    </Button>
                </MenuBox>
                {owner && (
                    <StartnSetBox>
                        <Input
                            // height="15px"
                            width="130px"
                            padding="5px"
                            margin="8px"
                            type="number"
                            placeholder="세트 수 입력"
                            value={setCnt}
                            onChange={onInputChange}
                        />
                        <Button
                            width="130px"
                            onClick={() => {
                                openReadyModal();
                            }}
                        >
                            START
                        </Button>
                    </StartnSetBox>
                )}
            </Rightbox>
        </Container>
    );
}

export default WaitingRoom;
