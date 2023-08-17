import React, { useState, useEffect } from "react";
import Timer from "../../components/Timer";
import foot2 from "../../assets/img/foot2.png";
import {
    Container,
    Head,
    Line,
    Content,
    Image,
    NotificationContainer,
    Overlay,
} from "../../components/layout/selectAnswer";
import { liarAnswer } from "../../api/game";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../store/gameSlice";
import { changePhase } from "../../store/phaseSlice";
import { MainText } from "../../components/layout/common";

const SelectAnswer = () => {
    const [activeBox, setActiveBox] = useState(null);
    const [showNotification, setShowNotification] = useState(true);
    const title = "아래 단어들 중 정답을 골라주세요.";
    const text = "고양이로 의심 받았습니다. ";
    const imgSrc = foot2;
    const [answerList, setAnswerList] = useState([]);
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const setId = useSelector((state) => state.game.setId);
    const { session } = openvidu;
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);
        liarAnswer(setId).then((response) => {
            setAnswerList(response.data.answerOptions);
        });

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleContentClick = (boxIndex) => {
        if (boxIndex === activeBox) {
            setActiveBox(null);
        } else {
            setActiveBox(boxIndex);
        }
    };

    useEffect(() => {
        const handleSelectAnswer = () => {
            dispatch(gameActions.updateSelectedAnswer(activeBox));
            console.log(activeBox);
            const signalSelectLiar = async () => {
                session.signal({
                    data: activeBox,
                    to: [],
                    type: "startOpenLiar",
                });
            };
            signalSelectLiar();
            dispatch(changePhase("OpenLiar"));
        };
        if (answered) {
            handleSelectAnswer();
        }
    }, [answered]);

    return (
        <Container>
            {!showNotification && (
                <Timer time={7} onTimerEnd={() => setAnswered(true)}></Timer>
            )}
            <Head>{title}</Head>
            <Line>
                {answerList.map((item, index) => (
                    <Content
                        key={index}
                        onClick={() => handleContentClick(item)}
                    >
                        {item}
                        {activeBox === item && (
                            <Image src={imgSrc} alt="Image" />
                        )}
                    </Content>
                ))}
            </Line>
            <Overlay show={showNotification} />
            <NotificationContainer show={showNotification}>
                <MainText>{text}</MainText>
            </NotificationContainer>
        </Container>
    );
};

export default SelectAnswer;
