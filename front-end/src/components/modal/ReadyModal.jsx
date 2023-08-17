import React, { useEffect, useState } from "react";
import {
    ReadyModalView,
    ModalViewDescDiv,
    ModalViewResultDiv,
    ModalViewResultBox,
    ModalViewButtonDiv,
    ModalViewCompleteDiv,
    FootImgDiv,
} from "../layout/modal";
import Button from "../Button";
import Timer from "../Timer";
import { castGameVote, deleteVote, getVoteRes } from "../../api/game";
import { useDispatch, useSelector } from "react-redux";
import { changePhase } from "../../store/phaseSlice";
import { gameActions } from "../../store/gameSlice";
import foot from "../../assets/img/foot.png";

const ReadyModal = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const modalFlag = useSelector((state) => state.modal.isOpen);
    const game = useSelector((state) => state.game);
    const { mySessionId, session, owner } = openvidu;
    const { setCnt, gameVoteCnt } = game;
    const [footDivEls, setFootDivEls] = useState([]);
    // 현재 방의 인원 수를 받아서 6 대신 적용.
    // console.log(session.streamManagers);
    // const [wait, setWait] = useState(session.streamManagers.length);
    const [complete, setComplete] = useState(false);
    const dispatch = useDispatch();
    const imgSrc = foot;

    const signalGameId = async (gameId) => {
        session.signal({
            data: gameId,
            to: [],
            type: "gameId",
        });
    };

    const signalVote = async (check) => {
        console.log(gameVoteCnt);
        await session.signal({
            data: `${String(Number(gameVoteCnt) + 1)}`,
            to: [],
            type: check === "T" ? "agree" : "disagree",
        });
    };

    const signalGoQuiz = async (phase) => {
        console.log(phase);
        await session.signal({
            data: phase,
            to: [],
            type: phase,
        });
    };

    const signalSetCnt = async (setCnt) => {
        await session.signal({
            data: setCnt,
            to: [],
            type: "setCnt",
        });
    };

    const handleEndVote = async () => {
        try {
            const response = await getVoteRes(mySessionId, setCnt);
            if (response) {
                console.log(response);

                console.log(response.data.gameId);
                await signalGameId(response.data.gameId);

                dispatch(gameActions.saveGameId(response.data.gameId));
                await signalGoQuiz(response.data.gameProcessType);
                dispatch(changePhase(response.data.gameProcessType));

                await signalSetCnt(setCnt);
            }
            console.log(owner);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    useEffect(() => {
        // 로컬 대기만 줄어듦 -> 모두의 화면이 줄어들도록 openvidu통신
        const newFootDivEl = gameVoteCnt ? (
            <FootImgDiv key={gameVoteCnt}>
                <img src={imgSrc} alt="사진" width="55px" height="55px" />
            </FootImgDiv>
        ) : null;
        setFootDivEls((prevDivs) => [...prevDivs, newFootDivEl]);

        if (Number(gameVoteCnt) === session.streamManagers.length) {
            owner && handleEndVote();
            // : session.on("signal:gameId", (e) => {
            //       console.log(e.data);
            //       dispatch(gameActions.saveGameId(e.data));
            //       dispatch(changePhase("Quiz"));
            //   });
        }
    }, [gameVoteCnt]);

    useEffect(() => {
        const timer = setTimeout(() => {
            // 타이머 흘러가는중
            owner && handleEndVote();
            // : session.on("signal:gameId", (e) => {
            //       console.log(e.data);
            //       dispatch(gameActions.saveGameId(e.data));
            //       dispatch(changePhase("Quiz"));
            //   });
        }, 7000);

        if (!modalFlag) {
            clearTimeout(timer);
            owner && deleteVote(mySessionId);
            return;
        }

        return () => {
            session.on("signal:gameId", (e) => {
                console.log(e.data);
                dispatch(gameActions.saveGameId(e.data));
                dispatch(changePhase("Quiz"));
                clearTimeout(timer);
            });
            session.on("signal:refuseVote", (e) => {
                clearTimeout(timer);
            });
        };
    }, [modalFlag]);

    return (
        <ReadyModalView onClick={(e) => e.stopPropagation()}>
            <Timer width={"80%"} time={7.1} />
            <ModalViewDescDiv>게임 시작 투표</ModalViewDescDiv>

            <ModalViewResultDiv className="vote-res-div">
                {/* <ModalViewResultBox>찬성cnt : {voteCnt}</ModalViewResultBox> */}
                {/* <ModalViewResultBox>대기 : {wait}</ModalViewResultBox> */}
                <ModalViewResultBox>{footDivEls}</ModalViewResultBox>
            </ModalViewResultDiv>
            <ModalViewButtonDiv>
                {complete ? (
                    <ModalViewCompleteDiv>투표 완료</ModalViewCompleteDiv>
                ) : (
                    <>
                        <Button
                            shadow="none"
                            width="100px"
                            onClick={async () => {
                                // api 코드 작성할 곳.
                                setComplete(true);
                                const res = await castGameVote(
                                    mySessionId,
                                    "T",
                                );
                                console.log(res);
                                signalVote(res.data.voteMessage);
                            }}
                        >
                            O
                        </Button>
                        <Button
                            shadow="none"
                            width="100px"
                            onClick={async () => {
                                // api 코드 작성할 곳.
                                setComplete(true);
                                const res = await castGameVote(
                                    mySessionId,
                                    "F",
                                );
                                console.log(res);
                                signalVote(res.data.voteMessage);
                                await session.signal({
                                    data: "",
                                    to: [],
                                    type: "refuseVote",
                                });
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
