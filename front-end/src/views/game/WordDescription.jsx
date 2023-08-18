import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { openModal } from "../../store/modalSlice";
import VideoComponent from "../../components/VideoComponent";
import Button from "../../components/Button";
import CameraIcon from "../../assets/img/camera.png";
import { getUserWord } from "../../api/game";
import { gameActions } from "../../store/gameSlice";
import Timer from "../../components/Timer";
import { changePhase } from "../../store/phaseSlice";
import { SmallText, SubText } from "../../components/layout/common";
import { ModalBackdrop, ModalViewDescDiv } from "../../components/layout/modal";
import { ovActions } from "../../store/openviduSlice";

const TestSound = require("../../assets/audio/test_sound.mp3");

const Container = styled.div`
    margin: 0;
`;
const Participants = styled.div`
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "500px")};
    display: flex;
`;
const CurParticipants = styled.div`
    width: ${(props) => (props.width ? props.width : "50%")};
    height: ${(props) => (props.height ? props.height : "480px")};
    margin: ${(props) => (props.margin ? props.margin : "10px")};
`;
const CurFunction = styled.div`
    width: ${(props) => (props.width ? props.width : "95%")};
    height: ${(props) => (props.height ? props.height : "60%")};
    margin: ${(props) => (props.margin ? props.margin : "5px")};
    box-sizing: border-box;
`;
const CurSubFunction = styled.div`
    display: flex;
    width: ${(props) => (props.width ? props.width : "95%")};
    height: ${(props) => (props.height ? props.height : "45%")};
    margin: ${(props) => (props.margin ? props.margin : "5px")};
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`;
const CurSubBtn = styled.div`
    height: 90%;

    box-sizing: border-box;
    margin: ${(props) => (props.margin ? props.margin : "3px")};
`;

function WordDescription() {
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const phase = useSelector((state) => state.phase);
    const { myUserName, session, owner, mainStreamManager, publisher } =
        openvidu;
    const { gameId, result, answerer, setId, playerId, lastRound, emgSignal } =
        game;
    const { phaseType } = phase;
    const [word, setWord] = useState("");
    const [otherUserStreams, setOtherUserStreams] = useState([]);
    const [descIndex, setDescIndex] = useState(0);
    const [curIndex, setCurIndex] = useState(0);
    const [streamKey, setStreamKey] = useState(0);
    const audioRef = useRef(null);
    const streams = session.streamManagers;

    // 사용자 닉네임 리스트
    const nicknameArr = [];
    session.streamManagers.map((item) => {
        nicknameArr.push(item.stream.connection.data);
    });
    // answerer 제거
    const othersNickname = nicknameArr.filter((data) => data !== answerer);
    // 리스트 정렬
    const sortedArr = othersNickname.sort();
    sortedArr.unshift("");
    console.log(sortedArr);

    const openAnswerModal = () => {
        dispatch(
            openModal({
                modalType: "AnswerModal",
                isOpen: true,
            }),
        );
    };
    const newOtherStreams = streams.filter(
        (streamManager) => streamManager.stream.connection.data !== answerer,
    );
    const answererStream = streams.find(
        (streamManager) => streamManager.stream.connection.data === answerer,
    );
    // 초기 세팅
    useEffect(() => {
        const getFunc = async () => {
            console.log(myUserName);
            console.log(playerId);
            //setId 때문에 404 오류 생길 수 있음.
            await getUserWord(setId, myUserName).then((response) => {
                console.log(response);
                myUserName !== answerer && setWord(response.data.playerWord);
                dispatch(gameActions.updateLiarName(response.data.liarName));
            });
        };

        getFunc();
        // // 제시어 설명 시 시민 음소거
        // if (myUserName === answerer)
        //     newOtherStreams.map((item) => {
        //         item.subscribeToAudio(false);
        //     });
        setOtherUserStreams(newOtherStreams);
        console.log(newOtherStreams);
        console.log(otherUserStreams);

        answererStream.updatePublisherSpeakingEventsOptions({
            interval: 200, // Frequency of the polling of audio streams in ms
            threshold: -50, // Threshold volume in dB
        });

        return () => {
            answererStream.updatePublisherSpeakingEventsOptions({
                interval: 20000, // Frequency of the polling of audio streams in ms
                threshold: -50, // Threshold volume in dB
            });
        };
    }, []);

    useEffect(() => {
        console.log(audioRef);
        if (myUserName !== answerer) {
            session.on("publisherStartSpeaking", (event) => {
                if (
                    phaseType === "Desc" ||
                    phaseType === "QnA" ||
                    phaseType === "FinAns"
                )
                    publisher.publishAudio(false);
                if (audioRef.current && audioRef.current.paused)
                    audioRef.current.play();
            });
            session.on("publisherStopSpeaking", (e) => {
                if (audioRef.current && !audioRef.current.paused)
                    audioRef.current.pause();
                if (
                    phaseType === "Desc" ||
                    phaseType === "QnA" ||
                    phaseType === "FinAns"
                )
                    publisher.publishAudio(true);
            });
        }
        if (myUserName === answerer) {
            publisher.on("streamAudioVolumeChange", (event) => {
                newOtherStreams.map((item) => {
                    item.subscribeToAudio(false);
                });
                if (audioRef.current && audioRef.current.paused)
                    audioRef.current.play();

                setTimeout(() => {
                    if (audioRef.current && !audioRef.current.paused)
                        audioRef.current.pause();
                    newOtherStreams.map((item) => {
                        item.subscribeToAudio(true);
                    });
                }, 500);
            });
        }
    }, [audioRef]);

    const getNextDescIndex = () => {
        if (descIndex < sortedArr.length - 1) {
            setDescIndex(descIndex + 1);
        } else {
            dispatch(changePhase("QnA"));
        }
    };

    useEffect(() => {
        let index = streams.findIndex(
            (item) => item.stream.connection.data === sortedArr[descIndex],
        );
        setCurIndex(index);
        setStreamKey((prev) => prev + 1);
    }, [descIndex]);

    return (
        <Container>
            <audio ref={audioRef} src={TestSound} loop={false} preload="" />
            <Timer
                key={descIndex}
                onTimerEnd={() => getNextDescIndex()}
                flag={emgSignal}
            />
            <Participants>
                <CurParticipants
                    width={"100%"}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    {sortedArr[descIndex] ? (
                        <>
                            {
                                <VideoComponent
                                    key={streamKey}
                                    streamManager={
                                        session.streamManagers[curIndex]
                                    }
                                    width={"80%"}
                                    height={"80%"}
                                />
                            }
                            <SmallText>{sortedArr[descIndex]}</SmallText>
                        </>
                    ) : (
                        <ModalBackdrop>
                            <ModalViewDescDiv>
                                {!lastRound ? (
                                    <SubText>
                                        "잠시 후 제시어 설명이 시작됩니다.
                                        순서대로 자신의 제시어를 설명해보세요!"
                                    </SubText>
                                ) : (
                                    <SubText>
                                        "한 번 더 이전 라운드처럼 진행됩니다!"
                                    </SubText>
                                )}
                            </ModalViewDescDiv>
                        </ModalBackdrop>
                    )}
                </CurParticipants>
                <CurParticipants width={"40%"}>
                    <CurFunction
                        style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                            alignItems: "center",
                        }}
                    >
                        <SmallText>{answerer}</SmallText>
                        <VideoComponent
                            width="380px"
                            height="250px"
                            streamManager={answererStream}
                        />
                    </CurFunction>
                    <CurFunction height={"36%"}>
                        <CurSubFunction>
                            {myUserName === answerer ? (
                                <Button
                                    width={"100%"}
                                    height={"100%"}
                                    text={"정답을 맞춰보세요"}
                                    fontSize={"28px"}
                                />
                            ) : (
                                <Button
                                    width={"100%"}
                                    height={"100%"}
                                    text={`제시어 : ${word}`}
                                    fontSize={"28px"}
                                />
                            )}
                        </CurSubFunction>
                        <CurSubFunction>
                            <CurSubBtn>
                                <Button
                                    text={"정답"}
                                    fontSize={"32px"}
                                    onClick={() => openAnswerModal()}
                                ></Button>
                            </CurSubBtn>
                        </CurSubFunction>
                    </CurFunction>
                </CurParticipants>
            </Participants>
            <Participants height={"200px"}>
                {otherUserStreams.map((stream, i) => (
                    <React.Fragment key={i}>
                        <VideoComponent
                            width="250"
                            height="200"
                            streamManager={stream}
                        />
                    </React.Fragment>
                ))}
            </Participants>
        </Container>
    );
}

export default React.memo(WordDescription);
