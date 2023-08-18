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
    ChatItemName,
    ChatItemMessage,
    VideoUserName,
} from "../../components/layout/waiting";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modalSlice";
import { startGameVote } from "../../api/game";
import { gameActions } from "../../store/gameSlice";

function WaitingRoom() {
    const [isMuted, setIsMuted] = useState(false);
    const [setCnt, setSetCnt] = useState(1); // redux에 저장해두고 getVoteRes에 넣어주기
    // const [userMessage, setUserMessage] = useState("");
    const userMessage = useRef("");
    const openvidu = useSelector((state) => state.openvidu);
    const {
        subscribers,
        publisher,
        mySessionId,
        session,
        owner,
        myUserName,
        mySessionPw,
    } = openvidu;
    const gameVoteCnt = useSelector((state) => state.game.gameVoteCnt);

    console.log(subscribers);
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
    const openPenaltyLink = () => {
        console.log("?");
        dispatch(
            openModal({
                modalType: "PenaltyLinkModal",
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
        if (!userMessage.current.value) return;
        session.signal({
            data: userMessage.current.value,
            to: [],
            type: "chat",
        });
        userMessage.current.value = "";
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    useEffect(() => {
        dispatch(gameActions.saveGameVoteCnt(0));
    }, []);

    // 카카오톡공유 코드시작
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const shareKakao = () => {
        if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
                // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
                kakao.init(process.env.REACT_APP_KAKAO);
            }
            // 직접 설정
            kakao.Link.sendDefault({
                objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
                content: {
                    title: `방제목 : ${mySessionId}`, // 인자값으로 받은 title
                    description: `비밀번호 : ${mySessionPw} `, // 비밀번호 저장하고 불러와야됌
                    imageUrl:
                        "http://k.kakaocdn.net/dn/bopryU/btsrgQwe7vk/aKe0lK132QU1HJ13rKm90k/kakaolink40_original.jpg",
                    link: {
                        mobileWebUrl: "https://i9c209.p.ssafy.io/",
                        webUrl: "https://i9c209.p.ssafy.io/",
                    },
                },
                buttons: [
                    {
                        title: "입장하기",
                        link: {
                            mobileWebUrl: "https://i9c209.p.ssafy.io/",
                            webUrl: "https://i9c209.p.ssafy.io/",
                        },
                    },
                ],
            });
        }
    };
    // 카카오톡공유 코드종료

    const audioRef = useRef(null);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2;
        }
    }, []);
    function toggleVolume() {
        const audioElement = audioRef.current;

        if (audioElement) {
            if (isMuted) {
                audioElement.volume = 0.2;
                audioElement.muted = false;
            } else {
                audioElement.muted = true;
            }
        }

        setIsMuted((prevState) => !prevState);
    }
    console.log(openvidu.messageList.length);

    useEffect(() => {
        scrollToBottom();
    }, [openvidu.messageList]);
    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollTop =
                messageEndRef.current.scrollHeight;
        }
    };

    return (
        <Container className="waiting-container">
            <audio ref={audioRef} autoPlay loop>
                <source src={mainBgm} type="audio/wav" />
            </audio>
            <Leftbox>
                <VideoboxGrid className="videos-grid">
                    {publisher && (
                        <>
                            <Videobox>
                                <VideoComponent
                                    width="336"
                                    height="189"
                                    streamManager={publisher}
                                />
                                <VideoUserName>{myUserName}</VideoUserName>
                            </Videobox>
                        </>
                    )}
                    {subscribers &&
                        subscribers.map((sub, i) => (
                            <React.Fragment key={i}>
                                <Videobox>
                                    <VideoComponent
                                        width="336"
                                        height="189"
                                        streamManager={sub}
                                    />
                                    <VideoUserName>
                                        {sub.stream.connection.data}
                                    </VideoUserName>
                                </Videobox>
                            </React.Fragment>
                        ))}
                </VideoboxGrid>
            </Leftbox>
            <Rightbox>
                {publisher && subscribers && (
                    <Participant publisher={publisher} />
                )}

                <ChattingBox>
                    <ChatBox ref={messageEndRef}>
                        {openvidu.messageList.map((item, index) =>
                            item.userName === myUserName ? (
                                <ChatItem key={index} align={"right"}>
                                    <ChatItemName>{"나"}</ChatItemName>
                                    <ChatItemMessage align={"right"}>
                                        {item.userMessage}
                                    </ChatItemMessage>
                                </ChatItem>
                            ) : (
                                <ChatItem key={index}>
                                    <ChatItemName>{item.userName}</ChatItemName>
                                    <ChatItemMessage>
                                        {item.userMessage}
                                    </ChatItemMessage>
                                </ChatItem>
                            ),
                        )}
                        <ChatItem ref={messageEndRef}></ChatItem>
                    </ChatBox>
                    <ChattingInputBox>
                        <Input
                            width="200px"
                            height="15px"
                            margin="0"
                            ref={userMessage}
                            onKeyPress={handleOnKeyPress}
                        />
                        <Button
                            type="icon"
                            width="30px"
                            height="25px"
                            background={`var(--white)`}
                            shadow="none"
                            onClick={sendMessage}
                        >
                            <DogFootIcon width="20" height="20" />
                        </Button>
                    </ChattingInputBox>
                </ChattingBox>

                <MenuBox>
                    <Button
                        width="45px"
                        height="40px"
                        type="icon"
                        onClick={() => {
                            openRuleBook();
                        }}
                    >
                        <QuestionIcon width="20" />
                    </Button>
                    <Button
                        width="45px"
                        height="40px"
                        type="icon"
                        onClick={() => {
                            openPenaltyLink();
                        }}
                    >
                        <LinkIcon width="23" />
                    </Button>

                    {isMuted ? (
                        <Button
                            key="mute"
                            type="icon"
                            width="45px"
                            height="40px"
                            background={`var(--beige-dark)`}
                            onClick={toggleVolume}
                        >
                            <VolumeMuteIcon width="23" height="23" />
                        </Button>
                    ) : (
                        <Button
                            key="on"
                            type="icon"
                            width="45px"
                            height="40px"
                            background={`var(--beige-dark)`}
                            onClick={toggleVolume}
                        >
                            <VolumeOnIcon width="23" height="23" />
                        </Button>
                    )}
                    <Button width="45px" height="40px" onClick={shareKakao}>
                        <img
                            width="30"
                            height="30"
                            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                            alt="공유하기"
                        />
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
