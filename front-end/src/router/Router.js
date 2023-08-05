import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Game from "../views/Game";
<<<<<<< HEAD
import Loading from "../views/Loading";
=======
import Error from "../views/Error";
>>>>>>> cd1b8e037ae1b458ed4a117e3163bf2c23c62ca6

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
<<<<<<< HEAD
                <Route path="/loading" element={<Loading />} />
=======
                <Route path="/error" element={<Error />} />
>>>>>>> cd1b8e037ae1b458ed4a117e3163bf2c23c62ca6
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
