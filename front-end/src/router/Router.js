import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Game from "../views/Game";
import Error from "../views/Error";
import ConnectionTest from "../views/game/ConnectionTest";
import TopBottomVideo from "../views/game/TopBottomVideo";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<ConnectionTest />} />
                <Route path="/game" element={<Game />} />
                <Route path="/error" element={<Error />} />
                <Route path="/quizpage" element={<TopBottomVideo />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
