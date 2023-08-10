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

const SelectAnswer = (props) => {
    const { time } = props;
    const [activeBox, setActiveBox] = useState(null);
    const [showNotification, setShowNotification] = useState(true);
    const title = "아래 단어들 중 정답을 골라주세요.";
    const text = "라이어로 지목되었습니다. ";
    const Answerlist = [
        "고구마",
        "토마토",
        "날치알",
        "짜게치",
        "신라면",
        "너구리",
        "양파링",
        "복숭아",
        "사이다",
        "고구마1",
        "고구마2",
        "고구마3",
        "고구마4",
        "고구마5",
        "고구마6",
        "고구마7",
        "고구마8",
        "고구마9",
    ];
    const imgSrc = foot2;
    const [answerList, setAnswerList] = useState([]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);
        liarAnswer(1).then((response) => {
            setAnswerList(response.data.answerOptions);
        });

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleContentClick = (boxIndex) => {
        setActiveBox(boxIndex === activeBox ? null : boxIndex);
        console.log(boxIndex);
    };
    return (
        <Container>
            <Timer></Timer>
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
                {text}
            </NotificationContainer>
        </Container>
    );
};

export default SelectAnswer;
