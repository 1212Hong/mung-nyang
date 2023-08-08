import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Game from "../views/Game";
import Error from "../views/Error";
import ConnectionTest from "../views/game/ConnectionTest";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<ConnectionTest />} />
                <Route path="/game" element={<Game />} />
                <Route path="/error" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
