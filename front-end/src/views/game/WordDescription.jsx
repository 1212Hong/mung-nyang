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
import { ovActions } from "../../store/openviduSlice";

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
    const { myUserName, session, owner, mainStreamManager } = openvidu;
    const { gameId, result, answerer, setId, playerId, lastRound } = game;
    const [word, setWord] = useState("");
    const [otherUserStreams, setOtherUserStreams] = useState([]);
    const [descUser, setDescUser] = useState();
    const [descIndex, setDescIndex] = useState(0);
    const streams = session.streamManagers;
    console.log(streams);

    console.log("세션");
    console.log(session);
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
        console.log(otherUserStreams);
    }, []);

    const answererStream = streams.find(
        (streamManager) => streamManager.stream.connection.data === answerer,
    );

    const getNextDescIndex = () => {
        if (descIndex < sortedArr.length - 1) {
            setDescIndex(descIndex + 1);
            console.log(mainStreamManager);
        } else dispatch(changePhase("QnA"));
    };

    useEffect(() => {
        const rotateStream = otherUserStreams.find(
            (streamManager) =>
                streamManager.stream.connection.data === sortedArr[descIndex],
        );
        dispatch(ovActions.saveMainStreamManager(rotateStream));
        console.log(mainStreamManager);
    }, [descIndex]);

    // useEffect(() => {}, [timerKey]);

    useEffect(() => {
        // 비상정답 신호 받아서 resultReturn으로 승패 알아차리고 해당 gameProcessType으로 이동
        session.on("signal:emgAnswered", (e) => {
            console.log(e.data);
            dispatch(gameActions.saveResult(e.data));
        });
    });

    return (
        <Container>
            <Timer key={descIndex} onTimerEnd={() => getNextDescIndex()} />
            <Participants>
                <CurParticipants width={"100%"}>
                    {sortedArr[descIndex] ? (
                        <>
                            <SmallText>{sortedArr[descIndex]}</SmallText>
                            {mainStreamManager && (
                                <VideoComponent
                                    streamManager={mainStreamManager}
                                    width={"80%"}
                                    height={"80%"}
                                />
                            )}
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
                    <CurFunction>
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

export default React.memo(WordDescription);
