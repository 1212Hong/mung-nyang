import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Game from "../views/Game";
import TopBottomVideo from "../views/game/TopBottomVideo";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/quizpage" element={<TopBottomVideo />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
