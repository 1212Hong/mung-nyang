import store from "../store/";
import { DanceUrl, getPenaltyUser } from "../api/game";
import { gameActions } from "../store/gameSlice";
import { ovActions } from "../store/openviduSlice";

export const useDanceUrl = () => {
    const fetchDanceUrl = async () => {
        try {
            const danceResponse = await DanceUrl();
            const { danceUrl, difficulty } = danceResponse.data;
            console.log("URL 확인 :", danceUrl, difficulty);
            const videoId = danceUrl.split("/shorts/")[1];
            store.dispatch(ovActions.saveVideoId(videoId));
            return { videoId, difficulty };
        } catch (error) {
            console.log(error);
        }
    };

    return { fetchDanceUrl };
};

export const usePenaltyUser = (roomId) => {
    const fetchPenaltyUser = async () => {
        try {
            const penaltyUser = await getPenaltyUser(roomId);
            if (penaltyUser) {
                store.dispatch(gameActions.savePenaltyUser(penaltyUser));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { fetchPenaltyUser };
};
