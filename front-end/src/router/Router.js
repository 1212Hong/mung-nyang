import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Game from "../views/Game";
import QnAPage from "../views/game/QnAPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<QnAPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
