import React, { useState } from "react";
import {
    Container,
    HeaderBox,
    VideoBox,
    StateBox,
    Footer,
    AnswerBox,
    FooterBox,
} from "../../components/layout/topbottomvideo";
import VideoComponent from "../../components/VideoBoxing";
import Quiz from "../../components/Quiz";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/Button";

function TopBottomVideo() {
    const list = ["임시", "임시", "임시"];
    const title = "제시어 카테고리";
    const [view, setView] = useState("");
    const user_list = [
        "권영재",
        "김대홍",
        "손임현",
        "이민규",
        "홍주영",
        "이현우",
    ];
    const upside =
        user_list.length % 2 === 1
            ? parseInt(user_list.length / 2) + 1
            : user_list.length / 2;

    const upside_list = user_list.slice(0, upside);
    const downside_list = user_list.slice(upside, user_list.length);

    return (
        <Container className="Container">
            <HeaderBox className="HeaderBox">
                {upside_list.map((user, index) => (
                    <VideoBox key={index}>
                        <VideoComponent width={"280px"} height={"150px"} />
                    </VideoBox>
                ))}
            </HeaderBox>
            <StateBox>
                {view === "Quiz" ? (
                    <Quiz />
                ) : view === "Category" ? (
                    <Select list={list} title={title} />
                ) : view === "EmgAns" ? (
                    <AnswerBox>
                        <h3>정답을 입력해 주세요.</h3>
                        <br />
                        <Footer>
                            <Input width={"300px"}></Input>
                            <Button width={"150px"} heigth={"50px"}>
                                확인
                            </Button>
                        </Footer>
                    </AnswerBox>
                ) : null}
            </StateBox>
            <FooterBox className="FooterBox">
                {downside_list.map((user, index) => (
                    <VideoBox key={index}>
                        <VideoComponent width={"280px"} height={"150px"} />
                    </VideoBox>
                ))}
            </FooterBox>
        </Container>
    );
}

export default TopBottomVideo;
