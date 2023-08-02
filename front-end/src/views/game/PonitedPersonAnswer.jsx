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
} from "../../components/layout/pointedpersonanswer";

const PonitedPersonAnswer = (props) => {
    const { Answerlist, time } = props;
    const [activeBox, setActiveBox] = useState(null);
    const [showNotification, setShowNotification] = useState(true);
    const title = "아래 단어들 중 정답을 골라주세요.";
    const text = "당신은 라이어로 선택되었습니다. 제시어를 맞추면 승리합니다.";
    const imgSrc = foot2;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);

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
                {Answerlist.map((item, index) => (
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
            <NotificationContainer show={showNotification}>
                {text}
            </NotificationContainer>
        </Container>
    );
};

export default PonitedPersonAnswer;
