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

const ScoreTotal = () => {
    const dispatch = useDispatch();
    const title = "라이어 승리";
    const totalset = 5;
    const set = 3;
    const roomId = "테스트";
    const [scoreData, setScoreData] = useState({});
    const userlist = [
        "리트리버",
        "리트리버2",
        "테스트유저2",
        "테스트유저1",
        "댕댕이5",
        "댕댕이6",
    ];
    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, publisher, mySessionId } = openvidu;
    console.log(subscribers);

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

    for (let i = 0; i < userlist.length; i++) {
        const username = userlist[i];
        const newEntry = { username, upscore: 5, score: scoreData.username };
        information.push(newEntry);
    }

    console.log(information);

    const Next = () => {
        if (set === totalset) {
            dispatch(changePhase({ phaseType: "Wait" }));
        } else {
            dispatch(changePhase({ phaseType: "Wait" }));
        }
    };

    return (
        <Container>
            <TitleBox>
                <TitleItem>{title}</TitleItem>
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

                {information.map((user, index) => (
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
