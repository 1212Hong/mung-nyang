import API from "./base";

export const createRoom = () => {
    API.post("/api/game-sessions");
};
