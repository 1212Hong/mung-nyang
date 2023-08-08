import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { selectLiar, selectedLiar, deleteLiar } from "../../api/game";

const SelectLiar = () => {
    const setId = useSelector((state) => state.openvidu.setId);
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
    const [mostVotedNickname, setMostVotedNickname] = useState("");

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const response = await selectLiar(setId, activeBox);
                console.log(response);
                console.log(setId);

                const selectedLiarResponse = await selectedLiar(setId);
                console.log(selectedLiarResponse);
                const mostVotedNickname =
                    selectedLiarResponse.data.mostVotedNicknames[0];
                console.log(mostVotedNickname);
                setMostVotedNickname(mostVotedNickname);

                await deleteLiar(setId);

                for (let i = 0; i < userlist.length; i++) {
                    if (userlist[i] === mostVotedNickname) {
                        dispatch(changePhase({ phaseType: "SelectAns" }));
                    } else {
                        dispatch(changePhase({ phaseType: "OtherView" }));
                    }
                }
            } catch (error) {
                console.error("Error sending data:", error);
            }
        }, 7000);

        return () => clearTimeout(timer);
    }, [activeBox]);

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
