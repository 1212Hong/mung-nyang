import React from "react";
import PonitedPersonAnswer from "./components/PonitedPersonAnswer";

const Home = () => {
    const title = "아래 단어들 중 정답을 골라 주세요";
    const Answerlst = [
        "고구마",
        "토마토",
        "날치알",
        "짜게치",
        "짜게치",
        "짜게치",
        "짜게치",
        "짜게치",
        "짜게치",
        "짜게치",
        "짜게치",
        "짜게치",
        "짜게치",
        "짜게치",
        "짜게치",
    ];
    return <PonitedPersonAnswer title={title} Answerlst={Answerlst} />;
};

export default Home;
