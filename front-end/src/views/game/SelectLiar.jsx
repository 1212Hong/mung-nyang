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
import { openviduSlice } from "../../store/openviduSlice";

const SelectLiar = () => {
    const openvidu = useSelector((state) => state.openvidu);
    const { subscribers, publisher } = openvidu;
    console.log(publisher.connection.session.data);
    // console.log(publisher.myUserName);
    console.log(subscribers);
    const setId = useSelector((state) => state.openvidu.setId);
    const userlist = [
        "리트리버",
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

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const response = await selectLiar(setId, activeBox);
                console.log(response);
                console.log(setId);

                const selectedLiarResponse = await selectedLiar(setId);
                console.log(selectedLiarResponse);
                if (selectedLiarResponse.data.gameProcessType === "LiarVote") {
                    dispatch(changePhase({ phaseType: "LiarVote" }));
                }
                const mostVotedNickname =
                    selectedLiarResponse.data.mostVotedNicknames[0];
                console.log(mostVotedNickname);

                dispatch(
                    openviduSlice.actions.updateSelectedLiar(mostVotedNickname),
                );

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
                {publisher && (
                    <Item
                        onClick={() =>
                            handleBoxClick(publisher.connection.session.data)
                        }
                    >
                        <ImageOverlay active={activeBox === publisher}>
                            <img src={imgSrc} alt="사진" width="100%" />
                        </ImageOverlay>
                        <VideoComponent
                            width="350px"
                            height="320px"
                            streamManager={publisher}
                        />
                    </Item>
                )}
                {subscribers &&
                    subscribers.map((subscriber, i) => (
                        <React.Fragment key={i}>
                            <Item
                                key={i}
                                onClick={() => handleBoxClick(subscriber)}
                            >
                                <ImageOverlay active={activeBox === subscriber}>
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
