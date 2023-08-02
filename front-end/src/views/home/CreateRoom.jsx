import React from "react";
import Input from "../../components/Input";
import { MainText, SubText } from "../../components/layout/common";
import { FormBox, HeaderBox } from "../../components/layout/home";

const CreateRoom = () => {
    return (
        <>
            <HeaderBox>
                <MainText>멍 마을의 냥</MainText>
            </HeaderBox>
            <HeaderBox>
                <SubText>
                    화상 서비스로 제시어를 몸으로 설명하고 맞추는 라이어게임
                </SubText>
            </HeaderBox>
            <FormBox>
                <Input width="250px" placeholder="방제목" />
                <Input type="password" width="250px" />
            </FormBox>
        </>
    );
};

export default CreateRoom;
