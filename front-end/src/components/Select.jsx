import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectCategory, signalCategory, startDesc } from "../api/game";
import { changePhase } from "../store/phaseSlice";
import { closeModal } from "../store/modalSlice";
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
        "과일",
        "과일",
        "과일",
        "과일",
        "과일",
        "과일",
        "과일",
        "과일",
    ];
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { gameId } = game;
    const { session, mySessionId, answerer } = openvidu;

    const goDesc = async (category) => {
        const setInfo = await selectCategory(
            mySessionId,
            gameId,
            category,
            answerer,
        );
        console.log(setInfo);
        if (setInfo) {
            const setId = setInfo.setId;
            dispatch(gameActions.saveSetId(setId));
            session.signal({
                data: setId,
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
                            goDesc(item);
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
