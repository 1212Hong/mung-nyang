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
import { selectLiar, selectedLiar, Result } from "../../api/game";
import { gameActions } from "../../store/gameSlice";

const SelectLiar = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { session, publisher } = openvidu;
    const setId = useSelector((state) => state.game.setId);
    const [showNotification, setShowNotification] = useState(true);
    const [activeBox, setActiveBox] = useState(null);
    const text = "라이어를 선택하세요.";
    const imgSrc = foot;
    const dispatch = useDispatch();
    const roomId = useSelector((state) => state.openvidu.mySessionId);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const response = await selectLiar(setId, activeBox || "");
                console.log(response);
                setTimeout(async () => {
                    try {
                        const selectedLiarResponse = await selectedLiar(setId);
                        console.log(selectedLiarResponse);
                        if (
                            selectedLiarResponse.data.gameProcessType ===
                            "LiarVote"
                        ) {
                            const dupliars =
                                selectedLiarResponse.data.mostVotedNicknames;
                            console.log(dupliars);
                            dispatch(gameActions.updateDupLiars(dupliars));
                            dispatch(changePhase("DupLiar"));
                        } else if (
                            selectedLiarResponse.data.gameProcessType ===
                            "SelectAns"
                        ) {
                            const mostVotedNickname =
                                selectedLiarResponse.data.mostVotedNicknames[0];
                            console.log(mostVotedNickname);
                            dispatch(
                                gameActions.updateSelectedLiar(
                                    mostVotedNickname,
                                ),
                            );
                            if (
                                publisher.stream.connection.data ===
                                mostVotedNickname
                            ) {
                                dispatch(changePhase("SelectAns"));
                            } else {
                                dispatch(changePhase("OtherView"));
                            }
                        } else {
                            try {
                                const response = await Result(
                                    setId,
                                    roomId,
                                    0,
                                    0,
                                );
                                const result = response.data;
                                console.log(result);

                                dispatch(gameActions.updateResult(result));
                                dispatch(changePhase("MidScore"));
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }, 2000);
            } catch (error) {
                console.error(error);
            }
        }, 10000);
        return () => clearTimeout(timer);
    });

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
