import React, { useEffect } from "react";
import VideoComponent from "../../components/VideoComponent";
import Card from "../../components/Card";
import imageSrc from "../../assets/img/clock.png";
import Timer from "../../components/Timer";
import {
    Container,
    OtherUsers,
    SmallText,
} from "../../components/layout/common";
import {
    AnswerBox,
    AnswerItem,
    UserBox,
} from "../../components/layout/otherView";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../store/gameSlice";
import AnswerModal from "../../components/modal/AnswerModal";

const FinAns = () => {
    const text = "정답자가 정답을 입력중입니다.";
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { session } = openvidu;
    const answerer = useSelector((state) => state.game.answerer);

    useEffect(() => {
        const timer = setTimeout(() => {
            session.on("signal:startFinAns", (event) => {
                dispatch(changePhase("LiarVote"));
            });
        }, 10000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Container>
            <Timer />
            <AnswerBox>
                {session.streamManagers &&
                    session.streamManagers.map((user, i) => (
                        <React.Fragment key={i}>
                            {user.stream.connection.data === answerer && (
                                <AnswerItem>
                                    <SmallText>
                                        {user.stream.connection.data}
                                    </SmallText>
                                    <VideoComponent
                                        width="500px"
                                        height="400px"
                                        streamManager={user}
                                    />
                                </AnswerItem>
                            )}
                        </React.Fragment>
                    ))}
                {answerer ? (
                    <AnswerModal />
                ) : (
                    <Card imageSrc={imageSrc} description={text} />
                )}
            </AnswerBox>
            <UserBox>
                {session.streamManagers &&
                    session.streamManagers.map((user, i) => (
                        <React.Fragment key={i}>
                            {user.stream.connection.data !== answerer && (
                                <OtherUsers>
                                    <SmallText>
                                        {user.stream.connection.data}
                                    </SmallText>
                                    <VideoComponent
                                        width="232px"
                                        height="235px"
                                        streamManager={user}
                                    />
                                </OtherUsers>
                            )}
                        </React.Fragment>
                    ))}
            </UserBox>
        </Container>
    );
};

export default FinAns;
