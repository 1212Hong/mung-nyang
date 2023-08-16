import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    TitleBox,
    RankBox,
    Border,
    LineItem,
    RankItem,
    NameItem,
    ScoreItem,
    TitleItem,
    SetItem,
    BtnBox,
    LineFrame,
    Frame,
    RankBoxFrame,
    ImgItem,
    ImgFrame,
    FrameBox,
    RankItemFrame,
} from "../../components/layout/scoreTotal";
import { score } from "../../api/game";
import { gameActions } from "../../store/gameSlice";
import foots from "../../assets/img/foots.png";
import VideoComponent from "../../components/VideoComponent";
import { AnswerItem } from "../../components/layout/otherView";
import { SmallText } from "../../components/layout/common";
import cat from "../../assets/img/scorecat.png";
import { MainText, SubText } from "../../components/layout/common";

const ScoreTotal = () => {
    const dispatch = useDispatch();
    const result = useSelector((state) => state.game.result);
    const setCnt = useSelector((state) => state.game.setCnt);
    const set = useSelector((state) => state.game.curSetCnt);
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const [scoreData, setScoreData] = useState({});
    const openvidu = useSelector((state) => state.openvidu);
    const { session, owner } = openvidu;
    console.log(result);

    const userlist = [];
    for (let i = 0; i < session.streamManagers.length; i++) {
        userlist.push(session.streamManagers[i].stream.connection.data);
    }
    console.log(userlist);

    useEffect(() => {
        dispatch(gameActions.updateCurSetCnt(set + 1));
        score(roomId)
            .then((response) => {
                setScoreData(response.data);
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
    }, []);
    const information = [];

    for (let i = 0; i < userlist.length; i++) {
        const username = userlist[i];
        console.log(username);
        const newEntry = {
            username,

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
        console.log(set);
        console.log(setCnt);
        const setCntNumber = parseInt(setCnt);
        if (set === setCntNumber) {
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
                <Frame>
                    <BtnBox>
                        {owner && (
                            <Button
                                fontSize="32px"
                                fontColor="var(--brown-dark)"
                                onClick={Next}
                            >
                                다음
                            </Button>
                        )}
                    </BtnBox>
                    <SetItem>
                        세트 : {set} / {setCnt}
                    </SetItem>
                </Frame>
            </TitleBox>
            <RankBoxFrame>
                {sortedInformation.map((user, index) => (
                    <RankBox key={index}>
                        {session.streamManagers.map((sub, i) =>
                            sub.stream.connection.data === user.username ? (
                                <React.Fragment key={i}>
                                    <AnswerItem>
                                        <VideoComponent
                                            width="200px"
                                            height="220px"
                                            streamManager={sub}
                                        />
                                    </AnswerItem>
                                </React.Fragment>
                            ) : null,
                        )}
                        <RankItemFrame>
                            <RankItem>
                                <SubText>{index + 1}등</SubText>
                            </RankItem>
                            <NameItem>
                                <SubText>{user.username}</SubText>
                            </NameItem>
                            <ScoreItem>
                                <SubText>{user.score}점</SubText>
                            </ScoreItem>
                        </RankItemFrame>
                    </RankBox>
                ))}
            </RankBoxFrame>
        </Container>
    );
};

export default ScoreTotal;
