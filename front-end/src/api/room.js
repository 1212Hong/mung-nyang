import API from "./base";

export const createRoom = (roomId, roomPw) => {
    API.post(`/api/game-sessions`, { roomId: roomId, roomPw: roomPw })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};
