package com.mung.mung.api.service;


import com.mung.mung.api.request.EmergencyAnswerReq;
import com.mung.mung.api.request.FinalAnswerReq;
import com.mung.mung.api.request.LiarAnswerReq;
import com.mung.mung.common.exception.custom.PlayerNotExistException;
import com.mung.mung.common.exception.custom.RoomNotExistException;
import com.mung.mung.common.exception.custom.SetNotExistException;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.entity.GameSet;
import com.mung.mung.db.entity.Player;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.GameSetRepository;
import com.mung.mung.db.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScoreService {
    private final GameRoomRepository gameRoomRepository;
    private final PlayerRepository playerRepository;
    private final GameSetRepository gameSetRepository;

    @Transactional // 긴급 정답 시 정답 여부 판별
    public void calcScoreEmergency(EmergencyAnswerReq emergencyAnswerReq, int liarScore, int noLiarScore, int elseScore) {
        long setId = emergencyAnswerReq.getSetId();
        String roomId = emergencyAnswerReq.getRoomId();
        String playerNickname = emergencyAnswerReq.getPlayerNickname();

        GameSet gameSet = gameSetRepository.findBySetId(setId);
        if (gameSet == null) {
            throw new SetNotExistException();
        }
        String liar = gameSet.getLiar();

        GameRoom gameroom = gameRoomRepository.findByRoomId(roomId);
        if (gameroom == null) {
            throw new RoomNotExistException();
        }

        List<Player> players = gameroom.getPlayers();
        if (players.isEmpty()) {
            throw new PlayerNotExistException();
        }

        for (Player player : players) {
            if (player.getPlayerNickname().equals(liar)) {
                // 라이어 점수 반영
                player.changeScore(player.getPlayerScore() + liarScore);
                playerRepository.save(player);

            } else {
                //시민 + 정답자 팀 점수 반영
                player.changeScore(player.getPlayerScore() + noLiarScore);
                playerRepository.save(player);
            }
            // 비상정답 버튼 사람에 따른 점수 차별성 부여
            if (player.getPlayerNickname().equals(playerNickname)) {
                player.changeScore(player.getPlayerScore() + elseScore);
                playerRepository.save(player);
            }
        }
    }


    @Transactional // 정답자의 최종 정답이 맞았을 시 점수 부여
    public void calcScoreFinal(FinalAnswerReq finalAnswerReq, int noLiarScore, int answererScore) {
        long setId = finalAnswerReq.getSetId();
        String roomId = finalAnswerReq.getRoomId();

        GameSet gameSet = gameSetRepository.findBySetId(setId);
        if (gameSet == null) {
            throw new SetNotExistException();
        }

        String liar = gameSet.getLiar();
        String answerer = gameSet.getAnswerer();

        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        if (gameRoom == null) {
            throw new RoomNotExistException();
        }

        List<Player> players = gameRoom.getPlayers();
        if (players.isEmpty()) {
            throw new PlayerNotExistException();
        }
        for (Player player : players) {
            if (!player.getPlayerNickname().equals(liar)) {
                //시민 + 정답자 팀 점수 반영
                player.changeScore(player.getPlayerScore() + noLiarScore);
                playerRepository.save(player);
            }
            // 정답자가 맞췄으므로 추가점수 부여할지 여부
            if (player.getPlayerNickname().equals(answerer)) {
                player.changeScore(player.getPlayerScore() + answererScore);
                playerRepository.save(player);
            }
        }
    }

    @Transactional // 라이어정답 단계 수행 후 최종 점수 정산
    public void calcScoreLiar(LiarAnswerReq liarAnswerReq, int liarScore, int noLiarScore) {
        long setId = liarAnswerReq.getSetId();
        String roomId = liarAnswerReq.getRoomId();

        GameSet gameSet = gameSetRepository.findBySetId(setId);
        if (gameSet == null) {
            throw new SetNotExistException();
        }

        String liar = gameSet.getLiar();

        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        if (gameRoom == null) {
            throw new RoomNotExistException();
        }

        List<Player> players = gameRoom.getPlayers();
        if (players.isEmpty()) {
            throw new PlayerNotExistException();
        }

        for (Player player : players) {
            if (player.getPlayerNickname().equals(liar)) {
                //라이어 점수 반영
                player.changeScore(player.getPlayerScore() + liarScore);
                playerRepository.save(player);
            } else {
                //시민 + 정답자 팀 점수 반영
                player.changeScore(player.getPlayerScore() + noLiarScore);
                playerRepository.save(player);
            }
        }
    }


    @Transactional
    public HashMap<String, Integer> returnScore(String roomId) {
        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        if (gameRoom == null) {
            throw new RoomNotExistException();
        }
        HashMap<String, Integer> playerScore = new HashMap<>();
        if (gameRoom.getPlayers().isEmpty()) {
            throw new PlayerNotExistException();
        }
        for (Player player : gameRoom.getPlayers()) {
            playerScore.put(player.getPlayerNickname(), player.getPlayerScore());
        }
        return playerScore;
    }
}
