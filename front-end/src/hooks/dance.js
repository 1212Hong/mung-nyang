import { DanceUrl } from "../api/game";

export const useDanceUrl = async () => {
    try {
        const danceUrlResponse = await DanceUrl();
        const { dancUrl, difficulty } = danceUrlResponse.data;

        return { dancUrl, difficulty };
    } catch (error) {
        console.log(error);
    }
};

export default useDanceUrl;
