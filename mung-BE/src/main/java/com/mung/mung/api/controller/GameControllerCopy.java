//package com.mung.mung.api.controller;
//
//import com.mung.mung.api.response.GameStartRes;
//import com.mung.mung.api.service.GameService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.Duration;
//import java.time.Instant;
//import java.util.HashSet;
//import java.util.Map;
//import java.util.Set;
//import java.util.concurrent.ConcurrentHashMap;
//
//@Slf4j
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/api/game")
//public class GameControllerCopy {
//
//    private final GameService gameService;
//
//    private final Duration votingDuration = Duration.ofSeconds(20);
//
//    // 방 - 현재인원 Map 형식으로 저장
//    private final Map<String, Integer> roomPlayers = new ConcurrentHashMap<>();
//
//    // 투표 시작한 방을 저장하는 Set
//    private final Set<String> startedRooms = new HashSet<>();
//
//    // ConcurrentHashMap 사용
//    private final Map<String, Integer> roomVotesMap = new ConcurrentHashMap<>();
//
//    // 각 방의 투표 시작 시간 저장
//    private final Map<String, Instant> roomVoteStartTime = new ConcurrentHashMap<>();
//
//
//    @PostMapping("/startvote")
//    public ResponseEntity<GameStartRes> startVote(@RequestParam(required = true) String roomId){
//        roomVoteStartTime.put(roomId, Instant.now());
////        int cntPlayers = gameService.countPlayers(roomId);
//        int cntPlayers = 6;
//        roomPlayers.put(roomId, cntPlayers);
//
//        return ResponseEntity.ok(new GameStartRes(roomId));
//    }
//    @PostMapping("/vote")
//    public ResponseEntity<String> countVote(@RequestParam(required = true) String roomId){
//
//        Instant voteStartTime = roomVoteStartTime.get(roomId);
//        Instant curTime = Instant.now();
//
//        if (curTime.isBefore(voteStartTime.plus(votingDuration))) {
//
//            // 해당 방의 투표 수 증가
//            roomVotesMap.merge(roomId, 1, Integer::sum);
//
//            return ResponseEntity.ok("투표 완료");
//        }else{
//            return ResponseEntity.badRequest().body("투표 완료");
//        }
//    }
//
//    @GetMapping("/voteResult")
//    public ResponseEntity<String> getVoteResult(@RequestParam String roomId) {
//        int requiredVotes = roomPlayers.get(roomId); // 각 방에 필요한 투표 수
//        int votes = roomVotesMap.getOrDefault(roomId, 0);
//
//        if (votes >= requiredVotes) {
//            resetVote(roomId); // 투표 완료 시 초기화
//            return ResponseEntity.ok("Success");
//        } else {
//            return ResponseEntity.ok("Fail");
//        }
//    }
//
//    private void resetVote(String roomId) {
//        startedRooms.remove(roomId);
//        roomVotesMap.remove(roomId);
//        roomVoteStartTime.remove(roomId);
//    }
//
//}
