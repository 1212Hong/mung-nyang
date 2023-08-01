import React, { useState } from "react";
import { HomeContainer, RightBox } from "../components/layout/home";
import CreateRoom from "./home/CreateRoom";
import JoinRoom from "./home/JoinRoom";

const Home = () => {
    const [view, setView] = useState(true);

    return (
        <HomeContainer>
            {view ? <CreateRoom /> : <JoinRoom />}
            <RightBox className="rightbox" />
        </HomeContainer>
    );
};

export default Home;
