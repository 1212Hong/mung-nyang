import { DanceUrl, getPenaltyUser } from "../api/game";
import { useDispatch } from "react-redux";
import { gameActions } from "../store/gameSlice";
import { ovActions } from "../store/openviduSlice";

export const useDanceUrl = () => {
    const dispatch = useDispatch();

    const fetchDanceUrl = async () => {
        try {
            const danceResponse = await DanceUrl();
            const { danceUrl, difficulty } = danceResponse.data;
            console.log("URL 확인 :", danceUrl, difficulty);
            const videoId = danceUrl.split("/shorts/")[1];
            dispatch(ovActions.saveVideoId(videoId));
            return { videoId, difficulty };
        } catch (error) {
            console.log(error);
        }
    };

    return { fetchDanceUrl };
};

export const usePenaltyUser = (roomId) => {
    const dispatch = useDispatch();

    const fetchPenaltyUser = async () => {
        try {
            const penaltyUser = await getPenaltyUser(roomId);
            if (penaltyUser) {
                dispatch(gameActions.savePenaltyUser(penaltyUser));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { fetchPenaltyUser };
};
