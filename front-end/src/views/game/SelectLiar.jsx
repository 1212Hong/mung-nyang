import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoComponent from "../../components/VideoComponent";
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

const SelectLiar = ({ roomId }) => {
    const userlist = [
        "댕댕이1",
        "댕댕이2",
        "댕댕이3",
        "댕댕이4",
        "댕댕이5",
        "댕댕이6",
    ];
    const [showNotification, setShowNotification] = useState(true);
    const [activeBox, setActiveBox] = useState(null);
    const text = "라이어를 선택하세요.";
    const imgSrc = foot;
    const dispatch = useDispatch();
    const liar = "댕댕이";
    const user = "댕댕일";

    useEffect(() => {
        const timer = setTimeout(() => {
            if (liar === user) {
                dispatch(changePhase({ phaseType: "SelectAns" }));
            } else {
                dispatch(changePhase({ phaseType: "OtherView" }));
            }
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

    const handleBoxClick = async (boxIndex) => {
        setActiveBox(boxIndex === activeBox ? null : boxIndex);
        console.log(boxIndex);
        console.log(roomId);
        try {
            const dataToSend = {
                roomId: roomId,
                boxIndex: boxIndex,
            };
            const response = await axios.post(
                "http://localhost:3000",
                dataToSend,
            );
            console.log("서버 응답:", response.data);
        } catch (error) {
            console.error("서버 요청 에러:", error);
        }
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
