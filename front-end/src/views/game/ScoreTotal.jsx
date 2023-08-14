import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../components/layout/common";
import {
    TitleBox,
    RankBox,
    Border,
    LineItem,
    UserItem,
    RankItem,
    NameItem,
    UpItem,
    ScoreItem,
    TitleItem,
    SetItem,
    BtnBox,
} from "../../components/layout/scoreTotal";
import { score } from "../../api/game";
import { gameActions } from "../../store/gameSlice";

const ScoreTotal = () => {
    const dispatch = useDispatch();
    const result = useSelector((state) => state.game.result);
    const setCnt = useSelector((state) => state.game.setCnt);
    const set = useSelector((state) => state.game.setId);
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const [scoreData, setScoreData] = useState({});
    const openvidu = useSelector((state) => state.openvidu);
    const { session, owner } = openvidu;

    const userlist = [];
    for (let i = 0; i < session.streamManagers.length; i++) {
        userlist.push(session.streamManagers[i].stream.connection.data);
    }
    console.log(userlist);

    useEffect(() => {
        const timer = setTimeout(() => {
            score(roomId)
                .then((response) => {
                    setScoreData(response.data);
                    console.log(scoreData);
                })
                .catch((error) => {
                    console.error("Error fetching score:", error);
                });
            // signal 받기
            session.on("signal:startDance", (event) => {
                console.log(event.data);
                dispatch(changePhase(event.data));
            });
            session.on("signal:startQuiz", (event) => {
                console.log(event.data);
                dispatch(changePhase(event.data));
            });
        });
        return () => clearTimeout(timer);
    }, []);
    const information = [];
    const beforeScore = useSelector((state) => state.game.score);
    console.log(beforeScore);
    for (let i = 0; i < userlist.length; i++) {
        const username = userlist[i];
        console.log(username);
        const newEntry = {
            username,
            // upscore: scoreData[username] - beforeScore[username],
            upscore: 3 - 2,
            score: scoreData[username],
        };
        information.push(newEntry);
    }
    console.log(information);
    const sortedInformation = information
        .slice()
        .sort((a, b) => b.score - a.score);

    // signal 적용
    const signalDance = async () => {
        session.signal({
            data: "Dance",
            to: [],
            type: "startDance",
        });
    };
    const signalQuiz = async () => {
        session.signal({
            data: "Quiz",
            to: [],
            type: "startQuiz",
        });
    };

    const Next = () => {
        dispatch(gameActions.saveScore(scoreData));
        if (set === setCnt) {
            signalDance();
            dispatch(changePhase("Dance"));
        } else {
            signalQuiz();
            dispatch(changePhase("Quiz"));
        }
    };

    return (
        <Container>
            <TitleBox>
                <TitleItem>{result}</TitleItem>
                <SetItem>
                    세트 : {set} / {setCnt}
                </SetItem>
            </TitleBox>
            <RankBox>
                <Border>
                    <RankItem>Rank</RankItem>
                    <NameItem>닉네임</NameItem>
                    <UpItem>오른 점수</UpItem>
                    <ScoreItem>총 점수</ScoreItem>
                </Border>

                {sortedInformation.map((user, index) => (
                    <LineItem key={index}>
                        <RankItem>{index + 1}st</RankItem>
                        <NameItem>{user.username}</NameItem>
                        <UpItem>+{user.upscore}</UpItem>
                        <ScoreItem>{user.score}</ScoreItem>
                    </LineItem>
                ))}
            </RankBox>
            {owner && (
                <BtnBox>
                    <Button
                        fontSize="32px"
                        fontColor="var(--brown-dark)"
                        onClick={Next}
                    >
                        다음
                    </Button>
                </BtnBox>
            )}
        </Container>
    );
};

export default ScoreTotal;
