import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { openModal } from "../../store/modalSlice";
import VideoComponent from "../../components/VideoComponent";
import Button from "../../components/Button";
import CameraIcon from "../../assets/img/camera.png";
import {
    fetchUserRole,
    fetchEmergencyAnswerResponse,
    fetchFinalAnswerResponse,
} from "../../hooks/quiz";
import { getUserWord } from "../../api/game";
import { gameActions } from "../../store/gameSlice";
import Timer from "../../components/Timer";
import { changePhase } from "../../store/phaseSlice";
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
const WaitingParticipants = styled.div`
    width: 20%;
    margin: 5px;
    border-radius: 5px;
`;

function WordDescription(props) {
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { myUserName, session, owner } = openvidu;
    const { gameId, category, answerer, setId, playerId } = game;
    const [word, setWord] = useState("");

    const openAnswerModal = () => {
        dispatch(
            openModal({
                modalType: "AnswerModal",
                isOpen: true,
            }),
        );
    };

    const [answererStream, setAnswererStream] = useState({});
    const [otherUserStreams, setOtherUserStreams] = useState([]);
    const [descUserNickname, setDescUserNickname] = useState([""]);
    const [curDescUserNickname, setCurDescUserNickname] = useState("");
    const [descIndex, setDescIndex] = useState(0);
    const [timerKey, setTimerKey] = useState(0);
    const streams = session.streamManagers;
    console.log(streams);
    // 초기 세팅
    useEffect(() => {
        const getFunc = async () => {
            console.log(myUserName);
            console.log(playerId);
            //setId 때문에 404 오류 생길 수 있음.
            await getUserWord(setId, myUserName).then((response) => {
                setWord(response.data.playerWord);
                console.log(response);
            });
        };
        // const getUserStream = async () => {

        // };
        getFunc();
        const newAnswererStream = streams.find(
            (streamManager) =>
                streamManager.stream.connection.data === answerer,
        );
        setAnswererStream(newAnswererStream);
        console.log(answererStream);

        const newOtherStreams = streams.filter(
            (streamManager) =>
                streamManager.stream.connection.data !== answerer,
        );

        setOtherUserStreams(newOtherStreams);
        console.log(newOtherStreams);
        // getUserStream();

        if (owner) {
            for (let i = 0; i < newOtherStreams.length; i++) {
                let nickname = newOtherStreams[i].stream.connection.data;
                console.log(nickname);
                setDescUserNickname((prev) => [...prev, nickname]); // 정답자 이외의 닉네임 배열 갱신
            }
        }
        console.log(descUserNickname);
    }, []);
    const startTimer = () => {
        setTimerKey((prevKey) => prevKey + 1);
    };
    const getNextDescIndex = () => {
        if (descIndex < streams.length - 1) {
            setDescIndex(descIndex + 1);
            startTimer();
        }
        // } else dispatch(changePhase("QnA"));
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
    }, [descIndex]);

    useEffect(() => {
        session.on("signal:descIndex", (event) => {
            console.log(event.data);
            setCurDescUserNickname(event.data);
        });
    }, [timerKey]);
    return (
        <Container>
            {}
            <Timer key={timerKey} onTimerEnd={() => getNextDescIndex()}></Timer>
            <Participants>
                <CurParticipants width={"100%"}>
                    <VideoComponent
                        streamManager={otherUserStreams.find(
                            (streamManager) =>
                                streamManager.stream.connection.data ===
                                curDescUserNickname,
                        )}
                        width={"80%"}
                        height={"80%"}
                    />
                    {curDescUserNickname}
                </CurParticipants>
                <CurParticipants width={"40%"}>
                    <CurFunction>
                        <VideoComponent
                            width="380px"
                            height="250px"
                            streamManager={answererStream.stream}
                        />
                    </CurFunction>
                    <CurFunction height={"36%"}>
                        <CurSubFunction>
                            <Button
                                width={"100%"}
                                height={"100%"}
                                text={`제시어 : ${word}`}
                                fontSize={"32px"}
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
