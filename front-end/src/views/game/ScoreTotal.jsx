import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    TitleBox,
    RankBox,
    RankItem,
    NameItem,
    ScoreItem,
    BtnBox,
    Frame,
    RankBoxFrame,
    RankItemFrame,
    RankUserFrame,
    ScoreText,
    ColorWhite,
    RankColor,
    AnswerItem,
} from "../../components/layout/scoreTotal";
import { score } from "../../api/game";
import { gameActions } from "../../store/gameSlice";
import VideoComponent from "../../components/VideoComponent";
import {
    MidText,
    SubText,
    MainText,
    ModalMainText,
} from "../../components/layout/common";
import { NotificationContainer } from "../../components/layout/selectLiar";

const ScoreTotal = () => {
    const dispatch = useDispatch();
    const result = useSelector((state) => state.game.result);
    const liar = useSelector((state) => state.game.selectedLiar);
    const setCnt = useSelector((state) => state.game.setCnt);
    const set = useSelector((state) => state.game.curSetCnt);
    const roomId = useSelector((state) => state.openvidu.mySessionId);
    const [scoreData, setScoreData] = useState({});
    const openvidu = useSelector((state) => state.openvidu);
    const { session, owner } = openvidu;
    const [showNotification, setShowNotification] = useState(true);
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
        session.on("signal:startDance", (event) => {
            console.log(event.data);
            dispatch(changePhase("Dance"));
        });
        session.on("signal:startQuiz", (event) => {
            console.log(event.data);
            dispatch(changePhase("Quiz"));
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Container>
            <TitleBox>
                <MainText>{result}</MainText>
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
                    <SubText>
                        세트 : {set} / {setCnt}
                    </SubText>
                </Frame>
            </TitleBox>
            <RankBoxFrame>
                {sortedInformation.map((user, index) => (
                    <RankBox key={index}>
                        {session.streamManagers.map((sub, i) =>
                            sub.stream.connection.data === user.username ? (
                                <React.Fragment key={i}>
                                    <AnswerItem>
                                        <RankUserFrame>
                                            <RankItem>
                                                <RankColor>
                                                    <MidText>
                                                        {index + 1}
                                                    </MidText>
                                                </RankColor>
                                            </RankItem>
                                            <VideoComponent
                                                width="220px"
                                                height="200px"
                                                streamManager={sub}
                                            />
                                        </RankUserFrame>
                                        <NameItem>
                                            <SubText>{user.username}</SubText>
                                        </NameItem>
                                    </AnswerItem>
                                </React.Fragment>
                            ) : null,
                        )}
                        <RankItemFrame>
                            <ScoreItem>
                                <MidText>
                                    <ScoreText>{user.score} 점</ScoreText>
                                </MidText>
                            </ScoreItem>
                        </RankItemFrame>
                    </RankBox>
                ))}
            </RankBoxFrame>
            <NotificationContainer show={showNotification}>
                <ModalMainText>라이어 : {liar}</ModalMainText>
            </NotificationContainer>
        </Container>
    );
};

export default ScoreTotal;
