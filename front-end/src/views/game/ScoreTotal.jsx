import React from "react";
import Button from "../../components/Button";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch } from "react-redux";
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

const ScoreTotal = (props) => {
    const dispatch = useDispatch();
    const { totalset, title } = props;
    const set = 3;
    const userlist = [
        { username: "개냥이", upscore: 5, total: 8 },
        { username: "냥냥이", upscore: 0, total: 7 },
        { username: "씹냥이", upscore: 0, total: 5 },
        { username: "뚱냥이", upscore: 0, total: 4 },
        { username: "멍멍이", upscore: 0, total: 2 },
        { username: "댕댕이", upscore: 0, total: 0 },
    ];

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
                {userlist.map((user, index) => (
                    <LineItem key={index}>
                        <RankItem>{index + 1}st</RankItem>
                        <UserItem>{user.username}</UserItem>
                        <UserItem>+{user.upscore}</UserItem>
                        <UserItem>{user.total}</UserItem>
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
