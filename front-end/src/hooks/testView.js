import store from "../store";
import { joinRoom } from "../api";
import { ovActions } from "../store/openviduSlice";

export const enterGameRoom = async (sessionId, nickname) => {
    console.log("joinRoom호출 -> 대기화면가기 전에 플레이어 정보 저장");

    try {
        const res = await joinRoom(sessionId, nickname);
        console.log(res);
        const playerInfo = res.data;
        store.dispatch(
            ovActions.savePlayerInfo({
                owner: playerInfo.owner,
                playerId: playerInfo.playerId,
                score: playerInfo.playerScore,
            }),
        );
    } catch (error) {
        console.log(error);
    }
};
