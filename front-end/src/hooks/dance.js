import { DanceUrl, PenaltyUser } from "../api/game";
import store from "../store";
import { gameActions } from "../store/gameSlice";

export const getDanceUrl = async () => {
    try {
        const danceResponse = await DanceUrl();
        console.log("리턴값 :", danceResponse.data);
        return danceResponse.data;
    } catch (error) {
        console.log(error);
    }
};

export const getPenaltyUser = async (roomId) => {
    try {
        const penaltyUser = await PenaltyUser(roomId);
        console.log(penaltyUser);

        return penaltyUser;
    } catch (error) {
        console.log(error);
    }
};
