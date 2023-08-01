import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { MainText, SubText } from "../components/layout/common";
import {
    ButtonBox,
    FormBox,
    HeaderBox,
    HomeContainer,
    LeftBox,
    RightBox,
} from "../components/layout/home";

const Home = () => {
    const [view, setView] = useState(true);

    return (
        <HomeContainer>
            {view ? (
                <LeftBox className="leftbox">
                    <HeaderBox>
                        <MainText>멍 마을의 냥</MainText>
                    </HeaderBox>
                    <HeaderBox>
                        <SubText>
                            화상 서비스로 제시어를 몸으로 설명하고 맞추는
                            라이어게임
                        </SubText>
                    </HeaderBox>
                    <FormBox>
                        <Input width="250px" />
                        <Input type="password" width="250px" />
                    </FormBox>
                    <ButtonBox>
                        <Button text={"방생성"} width="100px" margin="20px" />
                        <Button text={"입장하기"} width="100px" margin="20px" />
                    </ButtonBox>
                </LeftBox>
            ) : (
                <LeftBox></LeftBox>
            )}
            <RightBox className="rightbox" />
        </HomeContainer>
    );
};

export default Home;
