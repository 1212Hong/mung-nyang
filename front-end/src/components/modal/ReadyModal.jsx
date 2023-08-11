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
import { closeModal } from "../../store/modalSlice";
import { ImageOverlay } from "../layout/selectLiar";
import foot from "../../assets/img/foot.png";

const ReadyModal = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { mySessionId, session, owner } = openvidu;
    const { setCnt } = gameSlice;
    // api 통신을 위한 변수
    const [check, setCheck] = useState(false);
    // 반대 누르면 타이머 강제종료 위한 state
    const [close, setClose] = useState(false);
    // 찬반에 대한 카운트
    const [voteCnt, setVoteCnt] = useState(0);
    // 현재 방의 인원 수를 받아서 6 대신 적용.
    console.log(session.streamManagers);
    // const [wait, setWait] = useState(session.streamManagers.length);
    const [complete, setComplete] = useState(false);
    const dispatch = useDispatch();
    const imgSrc = foot;

    const handleEndVote = async () => {
        try {
            const response = owner && (await getVoteRes(mySessionId, setCnt));
            if (response) {
                console.log(response);

                console.log(response.data.gameId);
                dispatch(
                    changePhase({ phaseType: response.data.gameProcessType }),
                );
                dispatch(gameActions.saveGameId(response.data.gameId));
                owner && (await deleteVote(mySessionId));
            }
            console.log(owner);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };
    useEffect(() => {
        session.on("agree", (e) => {
            console.log("찬성");
            console.log(e.data);
            setVoteCnt(`${(e.data *= 1) + 1}`);
            // 로컬 대기만 줄어듦 -> 모두의 화면이 줄어들도록 openvidu통신
            // setWait(wait - 1);
        });
        session.on("disagree", () => {
            console.log("반대");
            dispatch(closeModal());
            owner && deleteVote(mySessionId);
            setClose(true);
        });
    }, [session]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            // 타이머 흘러가는중
        }, 7000);

        if (close) clearTimeout(timer);

        return () => {
            clearTimeout(timer);
            handleEndVote();
        };
    }, []);

    const renderAgrees = (n) => {
        for (let index = 0; index < n; index++) {
            return (
                <div>
                    <img src={imgSrc} alt="사진" width="60px" height="60px" />
                </div>
            );
        }
    };

    return (
        <ReadyModalView onClick={(e) => e.stopPropagation()}>
            <Timer width={"80%"}></Timer>
            <ModalViewDescDiv>게임 시작 투표</ModalViewDescDiv>

            <ModalViewResultDiv className="vote-res-div">
                <ModalViewResultBox>찬성cnt : {voteCnt}</ModalViewResultBox>
                {voteCnt ? renderAgrees(voteCnt) : null}
                {/* <ModalViewResultBox>대기 : {wait}</ModalViewResultBox> */}
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
                                    voteCnt,
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
