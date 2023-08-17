import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectCategory, signalCategory, startDesc } from "../api/game";
import { changePhase } from "../store/phaseSlice";
import { closeModal, openModal } from "../store/modalSlice";
import { gameActions } from "../store/gameSlice";

const Container = styled.div`
    padding: 20px;
    width: 600px;
    height: 300px;
    background: ${`var(--beige)`};
    text-align: center;
    border-radius: 5px;
`;
const Head = styled.div`
    padding-bottom: 30px;
    font-size: 32px;
`;
const Line = styled.div`
    margin-bottom: 5px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 210px 210px 210px;
`;
const Content = styled.button`
    width: 150px;
    height: 50px;
    font-size: 16px;
    background-color: ${`var(--white)`};
    border-color: ${`var(--white)`};
    margin-bottom: 30px;
    border-radius: 5px;
    color: ${`var(--brown-dark)`};
`;

const Select = (props) => {
    const { title } = props;
    const list = [
        "과일",
        "음식",
        "직업",
        "동물",
        "물건",
        "스포츠",
        "배우",
        "가수",
        "게임",
    ];
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { gameId, answerer } = game;
    const { session, mySessionId } = openvidu;
    console.log(answerer);
    const goDesc = async (category) => {
        const setInfo = await selectCategory(
            mySessionId,
            gameId,
            category,
            answerer,
        );
        console.log(setInfo);
        if (setInfo) {
            dispatch(gameActions.saveSetId(setInfo.data.setId));
            session.signal({
                data: setInfo.data.setId,
                to: [],
                type: "setId",
            });
        }
        dispatch(changePhase("Desc"));
    };

    return (
        <Container>
            <Head>{title}</Head>
            <Line>
                {list.map((item, index) => (
                    <Content
                        key={index}
                        onClick={() => {
                            answerer && goDesc(item);
                        }}
                    >
                        {item}
                    </Content>
                ))}
            </Line>
        </Container>
    );
};

export default Select;
