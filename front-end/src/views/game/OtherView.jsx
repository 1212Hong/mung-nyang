import React, { useState, useEffect } from "react";
import VideoComponent from "../../components/VideoComponent";
import Card from "../../components/Card";
import imageSrc from "../../assets/img/clock.png";
import Timer from "../../components/Timer";
import { Container, OtherUsers } from "../../components/layout/common";
import {
    AnswerBox,
    AnswerItem,
    UserBox,
    Center,
    NickName,
} from "../../components/layout/otherView";
import { changePhase } from "../../store/phaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../store/gameSlice";
import { MidText, SubText, MainText } from "../../components/layout/common";

const OtherView = () => {
    const text = "의심받은 강아지가 정답을 선택 중입니다.";
    const dispatch = useDispatch();
    const openvidu = useSelector((state) => state.openvidu);
    const { session } = openvidu;
    const pickedLiar = useSelector((state) => state.game.selectedLiar);

    useEffect(() => {
        const timer = setTimeout(() => {
            // siganl 받기
            session.on("signal:startOpenLiar", (event) => {
                console.log(event.data);
                dispatch(gameActions.updateSelectedAnswer(event.data));
                dispatch(changePhase("OpenLiar"));
            });
        });

        return () => clearTimeout(timer);
    }, []);

    return (
        <Container>
            <Timer />
            <AnswerBox>
                {session.streamManagers &&
                    session.streamManagers.map((sub, i) => (
                        <React.Fragment key={i}>
                            {sub.stream.connection.data === pickedLiar && (
                                <Center>
                                    <SubText>
                                        의심받은 강아지 : {pickedLiar}
                                    </SubText>
                                    <VideoComponent
                                        width="500px"
                                        height="400px"
                                        streamManager={sub}
                                    />
                                </Center>
                            )}
                        </React.Fragment>
                    ))}
                <Card imageSrc={imageSrc} description={text} />
            </AnswerBox>
            <UserBox>
                {session.streamManagers &&
                    session.streamManagers.map((sub, i) => (
                        <React.Fragment key={i}>
                            {sub.stream.connection.data !== pickedLiar && (
                                <OtherUsers>
                                    <VideoComponent
                                        width="232px"
                                        height="200px"
                                        streamManager={sub}
                                    />
                                    <NickName>
                                        <SubText>
                                            {sub.stream.connection.data}
                                        </SubText>
                                    </NickName>
                                </OtherUsers>
                            )}
                        </React.Fragment>
                    ))}
            </UserBox>
        </Container>
    );
};

export default OtherView;
