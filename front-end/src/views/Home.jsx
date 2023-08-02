import React, { useState } from "react";
import {
    ButtonBox,
    HomeContainer,
    LeftBox,
    RightBox,
} from "../components/layout/home";
import CreateRoom from "./home/CreateRoom";
import JoinRoom from "./home/JoinRoom";
import Button from "../components/Button";

const Home = () => {
    const [view, setView] = useState(false);
    console.log(view);

    const changeView = () => {
        setView(!view);
    };

    return (
        <HomeContainer>
            <LeftBox className="leftbox">
                {view ? <CreateRoom /> : <JoinRoom />}
                <ButtonBox>
                    <Button
                        text={view ? "방생성" : "입장하기"}
                        width="100px"
                        margin="20px"
                    />
                    <Button
                        text={view ? "입장하러가기" : "방생성하러가기"}
                        onClick={changeView}
                        width="100px"
                        margin="20px"
                    />
                </ButtonBox>
            </LeftBox>
            <RightBox className="rightbox" />
        </HomeContainer>
    );
};

export default Home;
