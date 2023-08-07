import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Game from "../views/Game";
import Loading from "../views/Loading";
import Error from "../views/Error";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/error" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
