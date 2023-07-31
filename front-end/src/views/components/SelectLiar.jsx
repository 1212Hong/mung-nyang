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

        // 클릭한 Box 정보를 JSON 형태로 변환
        const clickedBoxData = JSON.stringify({ boxIndex });

        // 백앤드 서버 URL 설정 (예시)
        const serverURL = "/api/clickedBoxes";

        // 백앤드 서버로 클릭한 Box 정보 전송
        fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: clickedBoxData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error sending data to the server:", error);
            });
    };

    const user_list = [0, 1, 2, 3, 4, 5];

    return (
        <Container>
            <Timer></Timer>
            <Line>
                {user_list.map((boxIndex) => (
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
                라이어를 선택하세요.
            </NotificationContainer>
        </Container>
    );
};

export default SelectLiar;
