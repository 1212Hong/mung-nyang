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
            <Timer time={time}></Timer>
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
