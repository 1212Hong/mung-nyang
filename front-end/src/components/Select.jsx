import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectCategory } from "../api/game";
import { gameActions } from "../store/gameSlice";
import { changePhase } from "../store/phaseSlice";

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
    const { session, mySessionId, myUserName, answerer } = openvidu;

    const goDesc = async (category) => {
        const roleInfo = await selectCategory(
            mySessionId,
            gameId,
            category,
            answerer,
        );
        // roomId, gameId, category, answerer
        // 접근 실패 시 symbol 타입으로 접근

        console.log(roleInfo);
        if (roleInfo) {
            const playersRoleInfo = roleInfo.playersRoleInfo;
            playersRoleInfo.map((item) => {
                if (item.playerNickname === myUserName) {
                    dispatch(gameActions.saveWord(item.word));
                }
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
