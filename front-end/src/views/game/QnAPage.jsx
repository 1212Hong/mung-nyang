import VideoComponent from "../../components/VideoComponent";
import styled from "styled-components";
import Timer from "../../components/Timer";
import { useDispatch, useSelector } from "react-redux";
import { SmallText } from "../../components/layout/common";
import { useEffect } from "react";
import { changePhase } from "../../store/phaseSlice";
import { gameActions } from "../../store/gameSlice";

const Container = styled.div`
    height: 100%;
    margin: 0;
`;
const DescContainer = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
`;
const VideoContainer = styled.div`
    width: 100%;
    height: 38%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`;
const VideoBox = styled.div`
    margin: auto;
    width: 30%;
    height: 80%;
    box-sizing: border-box;
    border-radius: 5px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
const DescBox = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 0 30px;
    height: 100%;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    background: var(--vanilla-cream);
    box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.5);
`;

function QnAPage() {
    const openvidu = useSelector((state) => state.openvidu);
    const game = useSelector((state) => state.game);
    const { session, myUserName } = openvidu;
    const { lastRound, answerer } = game;
    console.log(session.streamManagers);
    const streams = session.streamManagers;
    const newOtherStreams = streams.filter(
        (streamManager) => streamManager.stream.connection.data !== answerer,
    );
    const dispatch = useDispatch();

    const upside =
        streams.length % 2 === 1
            ? parseInt(streams.length / 2) + 1
            : streams.length / 2;

    const upside_list = streams.slice(0, upside);
    console.log(upside_list);
    const downside_list = streams.slice(upside, streams.length);
    console.log(downside_list);

    useEffect(() => {
        if (myUserName === answerer)
            newOtherStreams.map((item) => {
                item.subscribeToAudio(false);
            });
        console.log(lastRound);
        if (!lastRound) {
            dispatch(gameActions.updateLastRound());
            const timer = setTimeout(() => {
                dispatch(changePhase("Desc"));
            }, 7000);
            return () => {
                clearTimeout(timer);
            };
        } else {
            const timer = setTimeout(() => {
                dispatch(changePhase("FinAns"));
            }, 7000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, []);

    return (
        <Container>
            <Timer time={7} />
            <VideoContainer>
                {upside_list.map((user, index) => (
                    <VideoBox key={index}>
                        <SmallText>{user.stream.connection.data}</SmallText>
                        <VideoComponent
                            width={"100%"}
                            height={"180px"}
                            streamManager={user}
                        />
                    </VideoBox>
                ))}
            </VideoContainer>
            <DescContainer>
                <DescBox>정답자의 질문에 답해주세요. </DescBox>
            </DescContainer>
            <VideoContainer>
                {downside_list.map((user, index) => (
                    <VideoBox key={index}>
                        <VideoComponent
                            width={"100%"}
                            height={"180px"}
                            streamManager={user}
                        />
                        <SmallText>{user.stream.connection.data}</SmallText>
                    </VideoBox>
                ))}
            </VideoContainer>
        </Container>
    );
}
export default QnAPage;
