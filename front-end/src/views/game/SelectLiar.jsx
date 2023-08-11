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
import { gameSlice } from "../../store/gameSlice";

const SelectLiar = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { session } = openvidu;
    console.log(session.streamManagers);
    const setId = useSelector((state) => state.game.setId);
    const [showNotification, setShowNotification] = useState(true);
    const [activeBox, setActiveBox] = useState(null);
    const text = "라이어를 선택하세요.";
    const imgSrc = foot;
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const response = await selectLiar(setId, activeBox);
                console.log(response);

                const selectedLiarResponse = await selectedLiar(setId);
                console.log(selectedLiarResponse);
                if (selectedLiarResponse.data.gameProcessType === "LiarVote") {
                    dispatch(changePhase({ phaseType: "LiarVote" }));
                }
                const mostVotedNickname =
                    selectedLiarResponse.data.mostVotedNicknames[0];
                console.log(mostVotedNickname);
                dispatch(
                    gameSlice.actions.updateSelectedLiar(mostVotedNickname),
                );

                await deleteLiar(setId);

                for (let i = 0; i < session.streamManagers.length; i++) {
                    if (
                        session.streamManagers[i].stream.connection.data ===
                        mostVotedNickname
                    ) {
                        dispatch(changePhase({ phaseType: "SelectAns" }));
                    } else {
                        dispatch(changePhase({ phaseType: "OtherView" }));
                    }
                }
            } catch (error) {
                console.error(error);
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

    const handleBoxClick = (name) => {
        setActiveBox(name === activeBox ? null : name);
    };

    return (
        <Container>
            <Timer></Timer>
            <Box>
                {session.streamManagers &&
                    session.streamManagers.map((subscriber, i) => (
                        <React.Fragment key={i}>
                            <Item
                                onClick={() =>
                                    handleBoxClick(
                                        session.streamManagers[i].stream
                                            .connection.data,
                                    )
                                }
                            >
                                <ImageOverlay
                                    active={
                                        activeBox ===
                                        subscriber.stream.connection.data
                                    }
                                >
                                    <img src={imgSrc} alt="사진" width="100%" />
                                </ImageOverlay>
                                <VideoComponent
                                    width="350px"
                                    height="320px"
                                    streamManager={subscriber}
                                />
                            </Item>
                        </React.Fragment>
                    ))}
            </Box>
            <NotificationContainer show={showNotification}>
                {text}
            </NotificationContainer>
        </Container>
    );
};

export default SelectLiar;
