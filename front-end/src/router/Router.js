import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import WaitingRoom from "../views/WaitingRoom";
import ConnectionTest from "../views/ConnectionTest";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/waiting" element={<WaitingRoom />} />
                <Route path="/testpage" element={<ConnectionTest />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
