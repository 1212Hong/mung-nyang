import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideoComponent from "../../components/VideoBoxing";
import foot from "../../assets/img/foot.png";
import Timer from "../../components/Timer";

const Container = styled.div``;
const Line = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 430px 430px 430px;
    margin-bottom: 20px;
    margin-left: 50px;
`;
const Box = styled.div`
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
`;
const NotificationContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px 20px;
    border-radius: 5px;
    display: ${(props) => (props.show ? "block" : "none")};
    transition: display 0.2s;
    font-size: 72px;
`;
const ImageOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-80%, -50%);
    font-size: 20px;
    font-weight: bold;
    display: ${(props) => (props.active ? "block" : "none")};
`;
const imgSrc = foot;
const SelectLiar = () => {
    const [showNotification, setShowNotification] = useState(true);
    const [activeBox, setActiveBox] = useState(null);

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
            <Line>
                <Box onClick={() => handleBoxClick(0)}>
                    <ImageOverlay active={activeBox === 0}>
                        <img src={imgSrc} alt="사진" width="100%" />
                    </ImageOverlay>
                    <VideoComponent width="300px" height="300px" />
                </Box>
                <Box onClick={() => handleBoxClick(1)}>
                    <ImageOverlay active={activeBox === 1}>
                        <img src={imgSrc} alt="사진" width="100%" />
                    </ImageOverlay>
                    <VideoComponent width="300px" height="300px" />
                </Box>
                <Box onClick={() => handleBoxClick(2)}>
                    <ImageOverlay active={activeBox === 2}>
                        <img src={imgSrc} alt="사진" width="100%" />
                    </ImageOverlay>
                    <VideoComponent width="300px" height="300px" />
                </Box>
            </Line>
            <Line>
                <Box onClick={() => handleBoxClick(3)}>
                    <ImageOverlay active={activeBox === 3}>
                        <img src={imgSrc} alt="사진" width="100%" />
                    </ImageOverlay>
                    <VideoComponent width="300px" height="300px" />
                </Box>
                <Box onClick={() => handleBoxClick(4)}>
                    <ImageOverlay active={activeBox === 4}>
                        <img src={imgSrc} alt="사진" width="100%" />
                    </ImageOverlay>
                    <VideoComponent width="300px" height="300px" />
                </Box>
                <Box onClick={() => handleBoxClick(5)}>
                    <ImageOverlay active={activeBox === 5}>
                        <img src={imgSrc} alt="사진" width="100%" />
                    </ImageOverlay>
                    <VideoComponent width="300px" height="300px" />
                </Box>
            </Line>
            ''
            <NotificationContainer show={showNotification}>
                라이어를 선택하세요.
            </NotificationContainer>
        </Container>
    );
};

export default SelectLiar;
