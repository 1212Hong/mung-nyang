import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import WaitingRoom from "../views/WaitingRoom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/waiting" element={<WaitingRoom />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
