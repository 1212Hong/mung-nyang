import React, { useState, useEffect } from "react";
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
    const { myUserName, session, owner } = openvidu;
    const { gameId, category, answerer, setId, playerId } = game;
    const [word, setWord] = useState("");
    const [otherUserStreams, setOtherUserStreams] = useState([]);
    const [descUserNickname, setDescUserNickname] = useState([""]);
    const [curDescUserNickname, setCurDescUserNickname] = useState("");
    const [descIndex, setDescIndex] = useState(0);
    const [timerKey, setTimerKey] = useState(0);
    const streams = session.streamManagers;
    console.log(streams);

    const openAnswerModal = () => {
        dispatch(
            openModal({
                modalType: "AnswerModal",
                isOpen: true,
            }),
        );
    };

    // 초기 세팅
    useEffect(() => {
        const getFunc = async () => {
            console.log(myUserName);
            console.log(playerId);
            //setId 때문에 404 오류 생길 수 있음.
            myUserName !== answerer &&
                (await getUserWord(setId, myUserName).then((response) => {
                    setWord(response.data.playerWord);
                    console.log(response);
                }));
        };

        getFunc();

        const newOtherStreams = streams.filter(
            (streamManager) =>
                streamManager.stream.connection.data !== answerer,
        );

        setOtherUserStreams(newOtherStreams);
        console.log(newOtherStreams);

        if (owner) {
            for (let i = 0; i < newOtherStreams.length; i++) {
                let nickname = newOtherStreams[i].stream.connection.data;
                console.log(nickname);
                setDescUserNickname((prev) => [...prev, nickname]); // 정답자 이외의 닉네임 배열 갱신
            }
        }
    }, []);

    const startTimer = () => {
        setTimerKey((prevKey) => prevKey + 1);
    };
    const getNextDescIndex = () => {
        if (descIndex < streams.length - 1) {
            setDescIndex(descIndex + 1);
            startTimer();
        } else dispatch(changePhase("QnA"));
    };

    useEffect(() => {
        const setSignal = () => {
            if (owner) {
                session.signal({
                    data: descUserNickname[descIndex],
                    to: [],
                    type: "descIndex",
                });
                console.log(descUserNickname[descIndex]);
            }
        };
        setSignal();

        const newOtherStreams = streams.filter(
            (streamManager) =>
                streamManager.stream.connection.data !== answerer,
        );

        setOtherUserStreams(newOtherStreams);
        console.log(newOtherStreams);
    }, [descIndex]);

    useEffect(() => {
        session.on("signal:descIndex", (event) => {
            console.log(event.data);
            setCurDescUserNickname(event.data);
        });
    }, [timerKey]);

    const answererStream = streams.find(
        (streamManager) => streamManager.stream.connection.data === answerer,
    );

    return (
        <Container>
            {}
            <Timer key={timerKey} onTimerEnd={() => getNextDescIndex()}></Timer>
            <Participants>
                <CurParticipants width={"100%"}>
                    {curDescUserNickname ? (
                        <VideoComponent
                            streamManager={otherUserStreams.find(
                                (streamManager) =>
                                    streamManager.stream.connection.data ===
                                    curDescUserNickname,
                            )}
                            width={"80%"}
                            height={"80%"}
                        />
                    ) : (
                        <ModalBackdrop>
                            <ModalViewDescDiv>
                                <SubText>
                                    잠시 후 제시어 설명이 시작됩니다. 순서대로
                                    자신의 제시어를 설명해보세요!
                                </SubText>
                            </ModalViewDescDiv>
                        </ModalBackdrop>
                    )}
                    <SmallText>{curDescUserNickname}</SmallText>
                </CurParticipants>
                <CurParticipants width={"40%"}>
                    <CurFunction>
                        <VideoComponent
                            width="380px"
                            height="250px"
                            streamManager={answererStream}
                        />
                    </CurFunction>
                    <CurFunction height={"36%"}>
                        <CurSubFunction>
                            <Button
                                width={"100%"}
                                height={"100%"}
                                text={
                                    answerer
                                        ? "정답을 맞춰보세요"
                                        : `제시어 : ${word}`
                                }
                                fontSize={"28px"}
                            ></Button>
                        </CurSubFunction>
                        <CurSubFunction>
                            <CurSubBtn>
                                <Button
                                    text={"정답"}
                                    fontSize={"32px"}
                                    onClick={() => openAnswerModal()}
                                ></Button>
                            </CurSubBtn>
                            <CurSubBtn>
                                <Button>
                                    <img alt="camera" src={CameraIcon}></img>
                                </Button>
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

export default WordDescription;
