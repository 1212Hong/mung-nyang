import React, { useEffect, useState } from "react";
import {
    ReadyModalView,
    ModalViewDescDiv,
    ModalViewResultDiv,
    ModalViewResultBox,
    ModalViewButtonDiv,
    ModalViewCompleteDiv,
} from "../layout/modal";
import Button from "../Button";
import Timer from "../Timer";
import {
    castGameVote,
    deleteVote,
    getVoteRes,
    signalVote,
} from "../../api/game";
import { useDispatch, useSelector } from "react-redux";
import { changePhase } from "../../store/phaseSlice";
import { gameActions, gameSlice } from "../../store/gameSlice";

const ReadyModal = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { mySessionId, session } = openvidu;
    const { setCnt } = gameSlice;
    // api 통신을 위한 변수
    const [check, setCheck] = useState(false);
    // 찬반에 대한 카운트
    const [agree, setAgree] = useState(0);
    const [disagree, setDisagree] = useState(0);
    // 현재 방의 인원 수를 받아서 6 대신 적용.
    console.log(session.streamManagers);
    const [wait, setWait] = useState(session.streamManagers.length);
    const [complete, setComplete] = useState(false);
    const dispatch = useDispatch();
    const [phase, setPhase] = useState("");

    // api 코드 작성할 곳.
    // const decideVote = async (flag) => {
    //     setCheck(flag);
    //     console.log(check);
    //     setComplete(flag);
    //     const ticket = flag ? "T" : "F";
    //     const res = await castGameVote(mySessionId, ticket);
    //     console.log(res);
    //     signalVote(res, session.sessionId);
    //     flag ? setAgree(agree + 1) : setDisagree(disagree + 1);
    //     setWait(wait - 1);
    // };

    const handleEndVote = async () => {
        try {
            const response = await getVoteRes(mySessionId, setCnt);
            if (response) {
                console.log(response);
                setPhase(response.gameProcessType);
            }

            deleteVote(mySessionId);
        } catch (error) {
            console.error("Error sending data:", error);
        }
        // dispatch(changePhase({ phaseType: phase }));
        dispatch(changePhase({ phaseType: "Quiz" }));
    };
    useEffect(() => {
        session.on("agree", () => {
            console.log("찬성");
            setAgree(agree + 1);
            setWait(wait - 1);
        });
        session.on("disagree", () => {
            console.log("반대");
            setDisagree(disagree + 1);
            setWait(wait - 1);
        });
    }, [session]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            // 타이머 흘러가는중
        }, 7000);

        return () => {
            clearTimeout(timer);
            handleEndVote();
        };
    }, []);

    return (
        <ReadyModalView onClick={(e) => e.stopPropagation()}>
            <Timer width={"80%"}></Timer>
            <ModalViewDescDiv>게임 시작 투표</ModalViewDescDiv>

            <ModalViewResultDiv>
                <ModalViewResultBox>찬성 : {agree}</ModalViewResultBox>
                <ModalViewResultBox>반대 : {disagree}</ModalViewResultBox>
                <ModalViewResultBox>대기 : {wait}</ModalViewResultBox>
            </ModalViewResultDiv>
            <ModalViewButtonDiv>
                {complete ? (
                    <ModalViewCompleteDiv>투표 완료</ModalViewCompleteDiv>
                ) : (
                    <>
                        <Button
                            onClick={async () => {
                                // api 코드 작성할 곳.
                                setCheck(true);
                                setComplete(true);
                                const res = await castGameVote(
                                    mySessionId,
                                    "T",
                                );
                                console.log(res);
                                signalVote(
                                    res.data.voteMessage,
                                    session.sessionId,
                                );
                            }}
                        >
                            O
                        </Button>
                        <Button
                            onClick={async () => {
                                // api 코드 작성할 곳.
                                setCheck(false);
                                setComplete(true);
                                const res = await castGameVote(
                                    mySessionId,
                                    "F",
                                );
                                console.log(res);
                                signalVote(
                                    res.data.voteMessage,
                                    session.sessionId,
                                );
                            }}
                        >
                            X
                        </Button>
                    </>
                )}
            </ModalViewButtonDiv>
        </ReadyModalView>
    );
};

export default ReadyModal;
