import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideoComponent from "../../components/VideoBoxing";
import foot from "../../assets/img/foot.png";

const Container = styled.div`
    margin: 10px;
`;
const Line = styled.div`
    display: grid;
    grid-template-columns: 500px 500px 200px;
    margin-bottom: 20px;
    margin-left: 50px;
`;
const Box = styled.div`
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.3);
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
    color: #fff;
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
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    display: ${(props) => (props.active ? "block" : "none")};
`;
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
            <Line>
                <Box onClick={() => handleBoxClick(0)}>
                    <ImageOverlay active={activeBox === 0}>
                        <img
                            src="../../assets/img/foot.png"
                            alt="사진"
                            width="100%"
                        />
                    </ImageOverlay>
                    <VideoComponent width="400px" height="300px" />
                </Box>
                <Box onClick={() => handleBoxClick(1)}>
                    <ImageOverlay active={activeBox === 1}>
                        <img
                            src="path_to_your_image.jpg"
                            alt="사진"
                            width="100%"
                        />
                    </ImageOverlay>
                    <VideoComponent width="400px" height="300px" />
                </Box>
                <Box onClick={() => handleBoxClick(2)}>
                    <ImageOverlay active={activeBox === 2}>
                        <img
                            src="path_to_your_image.jpg"
                            alt="사진"
                            width="100%"
                        />
                    </ImageOverlay>
                    <VideoComponent width="400px" height="300px" />
                </Box>
            </Line>
            <Line>
                <Box onClick={() => handleBoxClick(3)}>
                    <ImageOverlay active={activeBox === 3}>
                        <img
                            src="path_to_your_image.jpg"
                            alt="사진"
                            width="100%"
                        />
                    </ImageOverlay>
                    <VideoComponent width="400px" height="300px" />
                </Box>
                <Box onClick={() => handleBoxClick(4)}>
                    <ImageOverlay active={activeBox === 4}>
                        <img
                            src="path_to_your_image.jpg"
                            alt="사진"
                            width="100%"
                        />
                    </ImageOverlay>
                    <VideoComponent width="400px" height="300px" />
                </Box>
                <Box onClick={() => handleBoxClick(5)}>
                    <ImageOverlay active={activeBox === 5}>
                        <img
                            src="path_to_your_image.jpg"
                            alt="사진"
                            width="100%"
                        />
                    </ImageOverlay>
                    <VideoComponent width="400px" height="300px" />
                </Box>
            </Line>

            <NotificationContainer show={showNotification}>
                라이어를 선택하세요.
            </NotificationContainer>
        </Container>
    );
};

export default SelectLiar;
