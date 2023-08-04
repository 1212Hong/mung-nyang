import React, { useState, useEffect } from "react";
import VideoComponent from "../../components/VideoBoxing";
import foot from "../../assets/img/foot.png";
import Timer from "../../components/Timer";
import { Container } from "../../components/layout/common";
import {
    Box,
    Item,
    NotificationContainer,
    ImageOverlay,
} from "../../components/layout/selectLiar";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch } from "react-redux";

const SelectLiar = (props) => {
    const { userlist } = props;
    const [showNotification, setShowNotification] = useState(true);
    const [activeBox, setActiveBox] = useState(null);
    const text = "라이어를 선택하세요.";
    const imgSrc = foot;
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(changePhase({ phaseType: "SelectAns" }));
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleBoxClick = (boxIndex) => {
        setActiveBox(boxIndex === activeBox ? null : boxIndex);
        console.log(boxIndex);
    };

    return (
        <Container>
            <Timer></Timer>
            <Box>
                {userlist.map((boxIndex) => (
                    <Item
                        key={boxIndex}
                        onClick={() => handleBoxClick(boxIndex)}
                    >
                        <ImageOverlay active={activeBox === boxIndex}>
                            <img src={imgSrc} alt="사진" width="100%" />
                        </ImageOverlay>
                        <VideoComponent width="350px" height="320px" />
                    </Item>
                ))}
            </Box>
            <NotificationContainer show={showNotification}>
                {text}
            </NotificationContainer>
        </Container>
    );
};

export default SelectLiar;
