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
    if (result === "LiarWin_Success") {
        result = "라이어 승리";
    } else if (result === "LiarLose_Fail") {
        result = "시민 승리";
    } else if (result === "LiarWin_NotLiar") {
        result = "라이어 승리";
    }
    const totalset = useSelector((state) => state.game.totalset);
    const set = useSelector((state) => state.game.setId);
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const [scoreData, setScoreData] = useState({});
    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, publisher } = openvidu;

    const userlist = [];
    console.log(publisher.session.connection.data);
    userlist.push(publisher.session.connection.data);
    for (let i = 0; i < subscribers.length; i++) {
        console.log(subscribers[i].stream.connection.data);
    }
    for (let i = 0; i < subscribers.length; i++) {
        userlist.push(subscribers[i].stream.connection.data);
    }
    console.log(userlist);

    useEffect(() => {
        score(roomId)
            .then((response) => {
                setScoreData(response.data);
                console.log(scoreData);
            })
            .catch((error) => {
                console.error("Error fetching score:", error);
            });
    }, [roomId]);
    const information = [];
    const beforeScore = useSelector((state) => state.game.score);
    console.log(beforeScore);
    for (let i = 0; i < userlist.length; i++) {
        const username = userlist[i];
        console.log(username);
        const newEntry = {
            username,
            upscore: scoreData[username] - beforeScore[username],
            score: scoreData[username],
        };
        information.push(newEntry);
    }
    console.log(information);
    const sortedInformation = information
        .slice()
        .sort((a, b) => b.score - a.score);

    const Next = () => {
        dispatch(gameActions.saveScore(scoreData));
        if (set === totalset) {
            dispatch(changePhase({ phaseType: "Dance" }));
        } else {
            dispatch(changePhase({ phaseType: "Quiz" }));
        }
    };

    return (
        <Container>
            <TitleBox>
                <TitleItem>{result}</TitleItem>
                <SetItem>
                    세트 : {set} / {totalset}
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
                        <UserItem>{user.username}</UserItem>
                        <UserItem>+{user.upscore}</UserItem>
                        <UserItem>{user.score}</UserItem>
                    </LineItem>
                ))}
            </RankBox>
            <BtnBox>
                <Button
                    fontSize="32px"
                    fontColor="var(--brown-dark)"
                    onClick={Next}
                >
                    다음
                </Button>
            </BtnBox>
        </Container>
    );
};

export default ScoreTotal;
