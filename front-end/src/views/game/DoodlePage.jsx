import React from "react";
import styled from "styled-components";
import VideoBoxing from "../../components/VideoBoxing";
import Button from "../../components/Button";
import { ReactComponent as PencilIcon } from "../../assets/img/pencil.svg";
import { ReactComponent as BrushIcon } from "../../assets/img/brush.svg";
import { ReactComponent as PaletteIcon } from "../../assets/img/palette.svg";
import { ReactComponent as EraserIcon } from "../../assets/img/eraser.svg";
import { ReactComponent as EmoticonIcon } from "../../assets/img/emoticon.svg";

const Container = styled.div`
    margin: 0;
`;
const Participants = styled.div`
    width: ${(props) => (props.width ? props.width : "100%")};
    height: ${(props) => (props.height ? props.height : "500px")};
    display: flex;
`;
const CurParticipants = styled.div`
    width: ${(props) => (props.width ? props.width : "50%")};
    height: ${(props) => (props.height ? props.height : "480px")};
    margin: ${(props) => (props.margin ? props.margin : "10px")};
    display: flex;
    justify-content: space-between;
`;
const PaintBar = styled.div`
    width: ${(props) => (props.width ? props.width : "50%")};
    height: ${(props) => (props.height ? props.height : "480px")};
    background: ${(props) =>
        props.background ? props.background : `var(--dusty-pink)`};
    border-radius: 10px;
`;

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const WaitingParticipants = styled.div`
    width: 20%;
    margin: 5px;
    border-radius: 5px;
`;
const user_list = ["권영재", "김대홍", "손임현", "이민규", "홍주영"];
function DoodlePage() {
    return (
        <Container>
            <Participants>
                <CurParticipants width={"90%"}>
                    <VideoBoxing width={"35%"} height={"100%"}></VideoBoxing>
                    <VideoBoxing width={"60%"} height={"100%"}></VideoBoxing>
                </CurParticipants>
                <CurParticipants width={"10%"}>
                    <PaintBar width={"100%"} height={"100%"}>
                        <IconWrapper>
                            {[
                                {
                                    icon: (
                                        <PencilIcon
                                            width="64px"
                                            height="64px"
                                        />
                                    ),
                                },
                                {
                                    icon: (
                                        <BrushIcon width="64px" height="64px" />
                                    ),
                                },
                                {
                                    icon: (
                                        <PaletteIcon
                                            width="64px"
                                            height="64px"
                                        />
                                    ),
                                },
                                {
                                    icon: (
                                        <EraserIcon
                                            width="64px"
                                            height="64px"
                                        />
                                    ),
                                },
                                {
                                    icon: (
                                        <EmoticonIcon
                                            width="64px"
                                            height="64px"
                                        />
                                    ),
                                },
                            ].map((item, index) => (
                                <Button
                                    key={index}
                                    type="icon"
                                    background={`var(--dusty-pink)`}
                                >
                                    {item.icon}
                                </Button>
                            ))}
                        </IconWrapper>
                    </PaintBar>
                </CurParticipants>
            </Participants>
            <Participants height={"200px"}>
                {user_list.map((user, index) => (
                    <WaitingParticipants>
                        <VideoBoxing key={index} width={"100%"}>
                            {user}
                        </VideoBoxing>
                    </WaitingParticipants>
                ))}
            </Participants>
        </Container>
    );
}

export default DoodlePage;
