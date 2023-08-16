package com.mung.mung.api.controller;

import com.mung.mung.api.request.*;
import com.mung.mung.api.response.CreateRoomRes;
import com.mung.mung.api.service.GameRoomService;
import com.mung.mung.api.service.PlayerService;
import com.mung.mung.common.exception.custom.*;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;


//@CrossOrigin(origins = "*")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class GameRoomController {

    private final int LIMIT = 6;
    private final GameRoomService gameRoomService;
    private final PlayerService playerService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    // 녹화중인지 확인
    private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();
    // 방 비밀번호 체크용이라서 HashMap사용, 동기화 필요 X
    private Map<String, String> gameConnectionInfoMap = new HashMap<>();

    // 방과 Session을 매칭 시켜주기 위함 => 한글로 방 생성 가능
    private Map<String, String> sessionRoomConvert = new HashMap<>();

    // 한 방에 여러개의 영상을 가지기 위함
    private Map<String, String> sessionRecordMap = new HashMap<>();

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @PostMapping("/game-sessions")
    public ResponseEntity<?> createRoom(@RequestBody GameRoomCreateReq gameRoomCreateReq)
            throws OpenViduJavaClientException, OpenViduHttpException {

        // makeRoom에서 return으로 중복된 Id가 있는지 없는지를 판단 후 중복이라면 Data 생성 없이 false값을 return함

        gameRoomService.makeRoom(gameRoomCreateReq.getRoomId(), gameRoomCreateReq);
        String roomId = gameRoomCreateReq.getRoomId();
        String roomPw = gameRoomCreateReq.getRoomPw();
        // 방별로 Pw 저장해서 관리
        this.gameConnectionInfoMap.put(roomId, roomPw);
        String StringUUID = UUID.randomUUID().toString();
        String RoomUUID = StringUUID.replaceAll("[^a-zA-Z0-9]", "");
        log.info("test UUID : {}", RoomUUID);
        log.info("test UUID : {}", StringUUID);
        this.sessionRoomConvert.put(roomId, RoomUUID);

        // GameRoomCreateReq 정보를 Map으로 변환 내장 라이브러리를 사용하기 위해서는 customSessionId로 hashMap을 만들어 주어야 함
        Map<String, Object> gameInfoMap = new HashMap<>();
        gameInfoMap.put("customSessionId", this.sessionRoomConvert.get(roomId));

        SessionProperties properties = SessionProperties.fromJson(gameInfoMap).build();
//        log.info("properties : ", String.valueOf(properties));
        Session session = openvidu.createSession(properties);
        CreateRoomRes createRoomRes = CreateRoomRes.builder()
                .roomId(roomId)
                .roomPw(roomPw)
                .build();
//        log.info("session : ",String.valueOf(session));
        return new ResponseEntity<>(createRoomRes, HttpStatus.OK);
    }


    @PostMapping("/game-sessions/connections")
    public ResponseEntity<String> createConnection(@RequestBody GameRoomConnectReq gameRoomConnectReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("어떤 오류인지 로그 : {}", gameRoomConnectReq);
        String roomId = gameRoomConnectReq.getRoomId();
        String sessionId = sessionRoomConvert.get(roomId);
        log.info("세션 아이디 확인 로그 : {}", sessionId);
        Session session = openvidu.getActiveSession(sessionId); // 이 부분에서 열린 session을 찾아옴
        if (session == null) {
            throw new SessionNotExistException();
        }
        // 방 게임이 이미 시작됐으면 접속 차단.
        if (!gameRoomService.getRoomStatus(roomId).equals("waiting")) {
            throw new RoomAlreadyStartException();
        }
        //
        if (!this.gameConnectionInfoMap.get(roomId).equals(gameRoomConnectReq.getRoomPw())) {
            throw new RoomPasswordWrongException();
        }

        // session 생성을 위해 Map으로 변환
        Map<String, String> gameInfoMap = new HashMap<>();
        gameInfoMap.put("customSessionId", this.sessionRoomConvert.get(roomId));
        // player pk 생성 필요.
        ConnectionProperties properties = ConnectionProperties.fromJson(gameInfoMap).build();
//        ConnectionProperties properties = ConnectionProperties.fromJson(gameConnectionInfoMap).build();
        Connection connection = session.createConnection(properties); //이 부분이 연결을 담당하는 부분
        log.info("Connection 확인 : {} ", connection);
        log.info("Connection.token() 확인 : {} ", connection.getToken());
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }


    @DeleteMapping("/game-sessions/leave/{encodeRoomId}/{encodePlayerNickname}")
    public ResponseEntity<String> leaveRoom(@PathVariable String encodeRoomId,
                                            @PathVariable String encodePlayerNickname) throws UnsupportedEncodingException {
        String roomId = URLDecoder.decode(encodeRoomId, StandardCharsets.UTF_8);
        String playerNickname = URLDecoder.decode(encodePlayerNickname, StandardCharsets.UTF_8);
        // roomId와 playerId가 유효하지 않은 경우 예외 처리
        if (roomId == null || roomId.isEmpty() || !gameRoomService.isRoomExists(roomId)) {
            throw new RoomNotExistException();
        }
        log.info("roomId info : {}", roomId);

        // DB에서 playerData 삭제하기 전에 roomID, playerNickname으로 DB에 있는지 확인
        long playerId = playerService.GetPlayerId(playerNickname, roomId);
        // DB에서 playerData 삭제
        gameRoomService.leaveRoom(playerId);

        long playersCnt = gameRoomService.playersCnt(roomId);
        if (playersCnt == 0) {
            // 만약 모든 사람이 방을 떠나면 GameRoom 데이터 삭제
            gameRoomService.deleteRoom(roomId); // DB에서 Room 삭제
            this.gameConnectionInfoMap.remove(roomId); // game 비밀번호 map 삭제
            this.sessionRoomConvert.remove(roomId); //roomId,SessionID 삭제
        }

        return new ResponseEntity<>("Leave 처리 성공", HttpStatus.OK);
    }

    @PutMapping("/game-sessions/initialize")
    public ResponseEntity<String> roomInitialize(
            @RequestBody RoomIdReq roomIdReq) {
        String roomId = roomIdReq.getRoomId();

        gameRoomService.roomInitialize(roomId);
        // All Player Initialize => 점수 초기화
        playerService.playerInitailize(roomId);

        return new ResponseEntity<>("방을 대기 중으로 변경 완료했습니다.", HttpStatus.OK);

    }

    // 동영상 기록

    @PostMapping("/room/recording/start")
    public ResponseEntity<?> startRecording(@RequestBody RecordingStartReq recordingStartReq) {
        // Session으로 반환
        String sessionId = sessionRoomConvert.get(recordingStartReq.getRoomId());
        log.info("sessionId {}", sessionId);
        log.info("sessionRoomConvert : {}", sessionRoomConvert);
        if (sessionId == null) {
            throw new RoomNotExistException();
        }
//            Recording.OutputMode outputMode = Recording.OutputMode.valueOf((String) params.get("outputMode"));
        Recording.OutputMode outputMode = Recording.OutputMode.COMPOSED;
//            boolean hasAudio = (boolean) params.get("hasAudio");
//            boolean hasVideo = (boolean) params.get("hasVideo");
        boolean hasAudio = true;
        boolean hasVideo = true;

        RecordingProperties properties = new RecordingProperties.Builder()
                .outputMode(outputMode).hasAudio(hasAudio).hasVideo(hasVideo)
                .resolution("640x480")
                .frameRate(24)
                .build();

        try {
            Recording recording = this.openvidu.startRecording(sessionId, properties);
            this.sessionRecordings.put(sessionId, true);
            this.sessionRecordMap.put(sessionId, recording.getId());

            return new ResponseEntity<>("Recording Start", HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/room/recording/stop")
    public ResponseEntity<?> stopRecording(@RequestBody RecordingStopReq recordingStopReq) {
        String sessionId = sessionRoomConvert.get(recordingStopReq.getRoomId());
        if (sessionId == null) {
            throw new RoomNotExistException();
        }
        String recordingId = this.sessionRecordMap.get(sessionId);
        if (recordingId == null) {
            throw new RecordingNotStartedException();
        }
        long gameId = recordingStopReq.getGameId();
        log.info("Stoping recording | {}=", recordingId);

        try {
            Recording recording = this.openvidu.stopRecording(recordingId);
            this.sessionRecordings.remove(recording.getSessionId());
            //recording 기록 확인
            // 확인 후 제거
            this.sessionRecordMap.remove(sessionId);
            gameRoomService.saveRecording(gameId, recording.getUrl());
            return new ResponseEntity<>("Recording Over", HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/room/recording/delete")
    public ResponseEntity<?> deleteRecording(@RequestBody Map<String, Object> params) {
        // 삭제가 필요한 경우
        String recordingId = sessionRoomConvert.get((String) params.get("recording"));

        try {
            this.openvidu.deleteRecording(recordingId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/room/recording/get/{encodeRoomId}")
    public ResponseEntity<?> getRecording(@PathVariable String encodeRoomId) {
        String roomId = URLDecoder.decode(encodeRoomId, StandardCharsets.UTF_8);
        // 동영상 url로 반환
        return new ResponseEntity<>(gameRoomService.returnRecording(roomId), HttpStatus.OK);

    }

}