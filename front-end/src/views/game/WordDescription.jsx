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
const user_list = ["권영재", "김대홍", "손임현", "이민규", "홍주영"];

const emergencyAnswer = () => {
    const getFunc = async () => {
        const emergencyReturn = await fetchEmergencyAnswerResponse(
            "1",
            "테스트",
            "테스트유저2",
            "석류",
        );
        // 결과

        console.log(emergencyReturn);
    };
    getFunc();
};
const FinalAnswer = () => {
    const getFunc = async () => {
        const finalReturn = await fetchFinalAnswerResponse(
            "1",
            "SessionC",
            "testAns",
        );
        console.log(finalReturn);
    };
};
function WordDescription(props) {
    const curUserName = "테스트유저2";
    const [userWord, setUserWord] = useState("");
    const [curGameSetId, setCurGameSetId] = useState("");
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { subscribers, publisher, mySessionId } = openvidu;
    const { gameId, category, answerer } = game;
    console.log(subscribers);

    const openAnswerModal = () => {
        dispatch(
            openModal({
                modalType: "AnswerModal",
                isOpen: true,
            }),
        );
    };
    useEffect(() => {
        const getFunc = async () => {
            const roleInfo = await fetchUserRole(
                mySessionId,
                gameId,
                category,
                answerer,
            );
            setCurGameSetId(roleInfo.setId);
            const playersRoleInfo = roleInfo.playersRoleInfo;
            playersRoleInfo.map((item) => {
                if (item.playerNickname === curUserName) {
                    setUserWord(item.word);
                }
            });
        };
        getFunc();
    }, []);
    return (
        <Container>
            <Participants>
                <CurParticipants width={"60%"}></CurParticipants>
                <CurParticipants width={"40%"}>
                    <CurFunction>
                        {publisher && (
                            <VideoComponent
                                width="380"
                                height="200"
                                streamManager={publisher}
                            />
                        )}
                    </CurFunction>
                    <CurFunction height={"36%"}>
                        <CurSubFunction>
                            <Button
                                width={"100%"}
                                height={"100%"}
                                text={`제시어 : ${userWord}`}
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
                {subscribers &&
                    subscribers.map((sub, i) => (
                        <React.Fragment key={i}>
                            <VideoComponent
                                width="380"
                                height="200"
                                streamManager={sub}
                            />
                        </React.Fragment>
                    ))}
            </Participants>
        </Container>
    );
}

export default WordDescription;
