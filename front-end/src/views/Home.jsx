import React from "react";
import Select from "../components/Select";

const Home = () => {
    const names = ["드라마", "영화", "스포츠"];
    const nameList = names.map((name) => <Select name={name} />);
    return <div>{nameList}</div>;
};

export default Home;
