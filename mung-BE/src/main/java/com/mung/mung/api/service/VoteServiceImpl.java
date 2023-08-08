package com.mung.mung.api.service;

import com.mung.mung.api.request.VoteCountReq;
import com.mung.mung.api.request.VoteSetReq;
import com.mung.mung.api.response.VoteCountRes;
import com.mung.mung.api.response.VoteResultRes;
import com.mung.mung.common.exception.custom.PlayerNotExistException;
import com.mung.mung.common.exception.custom.RoomNotExistException;
import com.mung.mung.db.entity.Game;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.enums.GameProcessType;
import com.mung.mung.db.repository.GameRepository;
import com.mung.mung.db.repository.GameRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final GameRoomRepository gameRoomRepository;

    private final GameRepository gameRepository;


    private final Duration votingDuration = Duration.ofSeconds(10);

    // 방 - 현재인원 Map 형식으로 저장
    private final Map<String, Integer> roomPlayers = new ConcurrentHashMap<>();

    // 투표 시작한 방을 저장하는 Set
    private final Set<String> startedRooms = new HashSet<>();

    // ConcurrentHashMap 사용
    private final Map<String, Integer> roomVotesMap = new ConcurrentHashMap<>();

    // 각 방의 투표 시작 시간 저장

    public void startVote(String roomId){

        if (startedRooms.contains(roomId)) {
            resetVote(roomId); // 전에 투표 기록이 있으면 초기화
        }
        startedRooms.add(roomId);
        Instant voteStartTime = Instant.now();

        int cntPlayers = countPlayers(roomId);

        if(cntPlayers==0){
            throw new PlayerNotExistException();
        }

        roomPlayers.put(roomId, cntPlayers);
        log.info("startVote - roomID : {} - voteStartTime : {}, Players : {}", roomId, voteStartTime, cntPlayers);

    }
    public VoteCountRes countVote(VoteCountReq voteCountReq){

        GameRoom gameRoom = gameRoomRepository.findByRoomId(voteCountReq.getRoomId());

        if(gameRoom==null){
            log.info("RoomNotExistException 예외처리");
            throw new RoomNotExistException();
        }

        String voted = voteCountReq.getVoteMessage();
        String roomId = voteCountReq.getRoomId();

        if(voted.equals("T")){
            roomVotesMap.merge(roomId, 1, Integer::sum);
        }

        return new VoteCountRes(voted);

    }
    @Transactional
    public VoteResultRes getVoteResult(VoteSetReq voteSetReq) {

        String roomId = voteSetReq.getRoomId();
        int maxGameSet = voteSetReq.getMaxSet();

        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);

        if(gameRoom==null){
            throw new RoomNotExistException();
        }

        int requiredVotes = roomPlayers.get(roomId); // 각 방에 필요한 투표 수
        int votes = roomVotesMap.getOrDefault(roomId, 0);
        log.info("getVoteResult - requiredVotes : {} - votes : {}", requiredVotes, votes);

        if (votes >= requiredVotes) {

            gameRoom.updateStatus("Start");

            gameRoomRepository.save(gameRoom);

            Game game = Game.builder()
                    .curSet(1)
                    .maxSet(maxGameSet)
                    .startTime(LocalDateTime.now())
                    .gameRoom(gameRoom)
                    .build();

            gameRepository.save(game);

            Long gameId = game.getGameId();

            resetVote(roomId); // 투표 완료 시 초기화

            return new VoteResultRes(roomId,gameId, GameProcessType.Quiz);
        } else {
            resetVote(roomId); // 투표 완료 시 초기화

            return new VoteResultRes(roomId, null, GameProcessType.Wait);
        }
    }

    private void resetVote(String roomId) {
        startedRooms.remove(roomId);
        roomVotesMap.remove(roomId);
    }

    private int countPlayers(String roomId){

        return gameRoomRepository.findByRoomId(roomId).getPlayers().size();
    }




}
