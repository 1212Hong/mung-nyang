import React from "react";
import Timer from "../components/Timer";

const Home = () => {
    return (
        <div>
            <h1>홈페이지</h1>
            <Timer time={10} />
        </div>
    );
};

export default Home;
