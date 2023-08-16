package com.mung.mung.api.service;

import com.mung.mung.api.request.VoteCountReq;
import com.mung.mung.api.request.VoteSetReq;
import com.mung.mung.api.response.VoteCountRes;
import com.mung.mung.api.response.VoteResultRes;
import com.mung.mung.common.exception.custom.PlayerNotExistException;
import com.mung.mung.common.exception.custom.QuizNotFoundException;
import com.mung.mung.common.exception.custom.RoomNotExistException;
import com.mung.mung.common.exception.custom.VotesNotStartException;
import com.mung.mung.db.entity.Game;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.entity.Quiz;
import com.mung.mung.db.enums.GameProcessType;
import com.mung.mung.db.repository.GameRepository;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final GameRoomRepository gameRoomRepository;

    private final GameRepository gameRepository;

    private final QuizRepository quizRepository;

    // 방 - 현재인원 Map 형식으로 저장
    private final Map<String, Integer> roomPlayers = new ConcurrentHashMap<>();

    // 투표 시작한 방을 저장하는 Set
    private final Set<String> startedRooms = new HashSet<>();

    // ConcurrentHashMap 사용
    private final Map<String, Integer> roomVotesMap = new ConcurrentHashMap<>();

    public void startVote(String roomId) {

        if (startedRooms.contains(roomId)) {
            resetVote(roomId); // 전에 투표 기록이 있으면 초기화
        }

        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        if (gameRoom == null) {
            throw new RoomNotExistException();
        }

        int cntPlayers = gameRoom.getPlayers().size();

        if (cntPlayers == 0) {
            throw new PlayerNotExistException();
        }

        startedRooms.add(roomId);

        roomPlayers.put(roomId, cntPlayers);

        log.info("startVote - roomID : {} , Players : {}", roomId, cntPlayers);

    }

    public VoteCountRes countVote(VoteCountReq voteCountReq) {

        Integer requiredVotes = roomPlayers.get(voteCountReq.getRoomId()); // 각 방에 필요한 투표 수

        if (requiredVotes == null) {
            throw new VotesNotStartException();
        }

        String voted = voteCountReq.getVoteMessage();
        String roomId = voteCountReq.getRoomId();

        if (voted.equals("T")) {
            roomVotesMap.merge(roomId, 1, Integer::sum);
        }
        log.info("시작투표 현황 - roomID : {} - 동의한 수 : {}", roomId, roomVotesMap.get(roomId));

        return new VoteCountRes(voted);

    }

    @Transactional
    public VoteResultRes getVoteResult(VoteSetReq voteSetReq) {

        String roomId = voteSetReq.getRoomId();
        int maxGameSet = voteSetReq.getMaxSet();

        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);

        if (gameRoom == null) {
            throw new RoomNotExistException();
        }


        Integer requiredVotes = roomPlayers.get(roomId); // 각 방에 필요한 투표 수

        if (requiredVotes == null) {
            throw new VotesNotStartException();
        }

        int votes = roomVotesMap.getOrDefault(roomId, 0);

        log.info("getVoteResult - requiredVotes : {} - votes : {}", requiredVotes, votes);

        if (votes >= requiredVotes) {

            gameRoom.updateStatus("Start");

            gameRoomRepository.save(gameRoom);

            // Game 테이블에 Quiz 정보 미리 저장
            Long quizId = (long) randomQuiz();

            Game game = Game.builder()
                    .curSet(0)
                    .maxSet(maxGameSet)
                    .startTime(LocalDateTime.now())
                    .gameRoom(gameRoom)
                    .ranQuiz(quizId)
                    .build();

            gameRepository.save(game);

            Long gameId = game.getGameId();

            return new VoteResultRes(roomId, gameId, GameProcessType.Quiz);
        } else {

            return new VoteResultRes(roomId, null, GameProcessType.Wait);
        }
    }

    public void resetVote(String roomId) {
        log.info("시작 투표 정보 삭제 : {}", roomId);
        Integer requiredVotes = roomPlayers.get(roomId); // 각 방에 필요한 투표 수

        if (requiredVotes == null) {
            throw new VotesNotStartException();
        }

        startedRooms.remove(roomId);
        roomVotesMap.remove(roomId);
        roomPlayers.remove(roomId);
        log.info("투표 정보 삭제 확인: {}", roomVotesMap.get(roomId));

    }

    private int randomQuiz() {
        List<Quiz> quizList = quizRepository.findAll();
        if (quizList.isEmpty()) {
            throw new QuizNotFoundException();
        }

        return ThreadLocalRandom.current().nextInt(quizList.size()) + 1;
    }


}
