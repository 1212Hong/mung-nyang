import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideoComponent from "../../components/VideoBoxing";
import foot from "../../assets/img/foot.png";
import Timer from "../../components/Timer";

const Container = styled.div``;
const Line = styled.div`
    display: grid;
    grid-template-columns: 430px 430px 430px;
    margin-bottom: 20px;
    margin-left: 50px;
`;
const Box = styled.div`
    margin-top: 10px;
    transition: all 0.2s ease-in-out;
    position: relative;

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

const SelectLiar = (props) => {
    const { userlist, text } = props;
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
        console.log(boxIndex);
    };

    return (
        <Container>
            <Timer></Timer>
            <Line>
                {userlist.map((boxIndex) => (
                    <Box
                        key={boxIndex}
                        onClick={() => handleBoxClick(boxIndex)}
                    >
                        <ImageOverlay active={activeBox === boxIndex}>
                            <img src={imgSrc} alt="사진" width="100%" />
                        </ImageOverlay>
                        <VideoComponent width="300px" height="320px" />
                    </Box>
                ))}
            </Line>
            <NotificationContainer show={showNotification}>
                {text}
            </NotificationContainer>
        </Container>
    );
};

export default SelectLiar;
