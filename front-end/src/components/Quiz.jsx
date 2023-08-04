import { useState, useEffect } from "react";
import styled from "styled-components";
import Timer from "../components/Timer";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modalSlice";
import Button from "./Button";
// import ChooseModal from "./modal/ChooseModal";

const Container = styled.div`
    padding: 20px;
    padding-bottom: 40px;
    width: 600px;
    height: 300px;
    background: ${`var(--macciato)`};
    text-align: center;
    border-radius: 5px;
`;
const Head = styled.div`
    width: 500px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 32px;
    text-align: left;
    color: ${`var(--beige-dark)`};
`;
const Title = styled.div`
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 32px;
    color: ${`var(--dusty-pink-dark)`};
`;
const Box = styled.div`
    display: flex;
`;
const Content = styled.button`
    background-color: ${`var(--white)`};
    margin-right: 10px;
    margin-left: 10px;
    width: 350px;
    height: 150px;
    border-radius: 5px;
    font-size: 32px;
`;

const Quiz = (props) => {
    const { title, text1, text2 } = props;
    const dispatch = useDispatch();
    const [answerer, setAnswerer] = useState("홍주영");
    // const RequestAnswerer = async (roomId) => {
    //     try {
    //         const response = await fetch(`/pub/start-quiz-info/${roomId}`);
    //         const data = await response.json();
    //         setAnswerer(data.answerer);
    //         openChooseModal();
    //     } catch (error) {
    //         console.error("정답자 요청 에러 :", error);
    //     }
    // };

    // const roomId = "exampleRoomId";

    // useEffect(() => {
    //     RequestAnswerer(roomId);
    // });

    const openChooseModal = () => {
        dispatch(
            openModal({
                modalType: "ChooseModal",
                isOpen: true,
                answerer: answerer,
            }),
        );
    };

    return (
        <Container>
            <Timer />
            <Head>Q. 다음 중 더 ~ 한 것을 고르시오.</Head>
            <Button
                onClick={() => {
                    openChooseModal(answerer);
                }}
            ></Button>
            <Title>{title}</Title>
            <Box>
                <Content>{text1}</Content>
                <Content>{text2}</Content>
            </Box>
            {/* {answerer && <ChooseModal answerer={answerer} />} */}
        </Container>
    );
};

export default Quiz;
