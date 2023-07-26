import React from "react";
import Card from "../components/Card";
import imgA from "../assets/img/clock.png";

const Home = () => {
    const description = "정답자가 정답을 입력 중입니다...";
    return <Card description={description} imageSrc={imgA}></Card>;
};

export default Home;
