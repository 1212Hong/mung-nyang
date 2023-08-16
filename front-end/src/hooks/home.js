import store from "../store/";
import { connectRoom, createRoom } from "../api";
import { ovActions } from "../store/openviduSlice";
import { getNickname } from "../api/room";

export const makeRoom = async (roomInfo) => {
    console.log("방생성 api호출");
    console.log(roomInfo);

    try {
        // createRoom 호출 후 sessionId를 받기 위해 await 사용
        const createRoomResponse = await createRoom(
            roomInfo.roomId,
            roomInfo.roomPw,
        );
        const sessionId = createRoomResponse.data.roomId;
        const sessionPw = createRoomResponse.data.roomPw;

        console.log(createRoomResponse);

        // connectRoom 호출 후 결과 출력
        const connectRoomResponse = await connectRoom(
            sessionId,
            roomInfo.roomPw,
        );
        console.log(connectRoomResponse);

        store.dispatch(ovActions.saveSessionId(sessionId));
        store.dispatch(ovActions.saveSessionPw(sessionPw));
        store.dispatch(ovActions.saveToken(connectRoomResponse.data));

        const firstNickName = await getNickname(sessionId);
        console.log(firstNickName);
        store.dispatch(ovActions.saveUserName(firstNickName));
        // 여기에서 sessionId와 connectRoomResponse 등을 필요에 따라 처리할 수 있음
    } catch (error) {
        console.log(error);
    }
};

export const enterRoom = async (roomInfo) => {
    console.log("생성된 방에 연결(테스트화면으로)");
    console.log(roomInfo);
    const firstNickName = await getNickname(roomInfo.roomId);
    store.dispatch(ovActions.saveUserName(firstNickName));
    try {
        const res = await connectRoom(roomInfo.roomId, roomInfo.roomPw);
        console.log(res);
        store.dispatch(ovActions.saveSessionId(roomInfo.roomId));
        store.dispatch(ovActions.saveToken(res.data));
        return res.data; // Return
    } catch (error) {
        console.log(error);
        return { error: "Room not found" };
    }
};
