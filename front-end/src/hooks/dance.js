import { DanceUrl, getPenaltyUser } from "../api/game";
import { useDispatch } from "react-redux";
import { gameActions } from "../store/gameSlice";

export const useDanceUrl = async () => {
    try {
        const danceUrlResponse = await DanceUrl();
        const { dancUrl, difficulty } = danceUrlResponse.data;

        return { dancUrl, difficulty };
    } catch (error) {
        console.log(error);
    }
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
