package com.mung.mung.api.service;

import com.mung.mung.api.request.QuizCountReq;
import com.mung.mung.api.request.QuizPlayersRoleReq;
import com.mung.mung.api.request.QuizResultReq;
import com.mung.mung.api.response.QuizPlayersRoleRes;
import com.mung.mung.api.response.QuizResultRes;
import com.mung.mung.api.response.QuizStartRes;
import com.mung.mung.api.response.VoteResultRes;
import com.mung.mung.common.exception.custom.QuizNotFoundException;
import com.mung.mung.common.exception.custom.SetNotExistException;
import com.mung.mung.db.entity.Game;
import com.mung.mung.db.entity.GameSet;
import com.mung.mung.db.entity.Quiz;
import com.mung.mung.db.enums.GameProcessType;
import com.mung.mung.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService{

    private final QuizRepository quizRepository;
    private final PlayerRepository playerRepository;
    private final GameRepository gameRepository;
    private final GameSetRepository gameSetRepository;
    private final WordRepository wordRepository;

    @Override
    public QuizStartRes startQuiz(String roomId) {

        Quiz quiz = quizRepository.findRandomQuiz();
        if (quiz == null) {
            throw new QuizNotFoundException();
        }

        return QuizStartRes.builder()
                .quiz(quiz)
                .build();
    }

    private final Map<String, Set<String>> positiveQuizsByRoom = new ConcurrentHashMap<>();
    private final Map<String, Set<String>> negativeQuizsByRoom = new ConcurrentHashMap<>();

    public void submitPositiveQuiz(QuizCountReq quizCountReq) {
        String roomId = quizCountReq.getRoomId();
        String playerNickname = quizCountReq.getPlayerNickname();

        if (!positiveQuizsByRoom.containsKey(roomId)) {
            positiveQuizsByRoom.put(roomId, ConcurrentHashMap.newKeySet());
        }
        positiveQuizsByRoom.get(roomId).add(playerNickname);

    }

    public void submitNegativeQuiz(QuizCountReq quizCountReq) {
        String roomId = quizCountReq.getRoomId();
        String playerNickname = quizCountReq.getPlayerNickname();

        if (!negativeQuizsByRoom.containsKey(roomId)) {
            negativeQuizsByRoom.put(roomId, ConcurrentHashMap.newKeySet());
        }
        negativeQuizsByRoom.get(roomId).add(playerNickname);

    }

    @Transactional
    public QuizResultRes getQuizResult(QuizResultReq quizResultReq) {
        String roomId = quizResultReq.getRoomId();

        int positiveCount = positiveQuizsByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet()).size();
        int negativeCount = negativeQuizsByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet()).size();
        log.info("positive : {} - negative : {}" , positiveQuizsByRoom.get(roomId), negativeQuizsByRoom.get(roomId));

        String selectedPlayerNickname = null;
        int pickedAnswer;
        if (positiveCount > negativeCount) {
            pickedAnswer=1;

            Set<String> positiveVoters = positiveQuizsByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet());
            selectedPlayerNickname = getRandomNickname(positiveVoters);
        } else if (negativeCount > positiveCount) {
            pickedAnswer=2;

            Set<String> negativeVoters = negativeQuizsByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet());
            selectedPlayerNickname = getRandomNickname(negativeVoters);
        } else {
            pickedAnswer=0; // 무승부
            List<String> players = playerRepository.findPlayers(roomId);
            log.info("[Draw] players : {}" , players);
            int randomIndex = new Random().nextInt(players.size());
            selectedPlayerNickname = players.get(randomIndex);
        }

        log.info("answerer : {}", selectedPlayerNickname);
        Long gameId = quizResultReq.getGameId();

        Game game = gameRepository.findByGameId(gameId);

        GameSet gameSet = GameSet.builder()
                .answerer(selectedPlayerNickname)
                .setFirst(1)
                .game(game)
                .build();

        gameSetRepository.save(gameSet);

        Long setId = gameSet.getSetId();

        // 해당 room의 투표 정보 삭제
        resetVote(roomId);

        return new QuizResultRes(setId, pickedAnswer, selectedPlayerNickname);

    }

    @Override
    public QuizPlayersRoleRes getPlayersRole(QuizPlayersRoleReq quizPlayersRoleReq) {
        Long gameId = quizPlayersRoleReq.getGameId();
        Long setId = quizPlayersRoleReq.getSetId();

        String roomId = quizPlayersRoleReq.getRoomId();
        String answerer = quizPlayersRoleReq.getAnswerer();

        // answerer 을 제외한 player 리스트
        List<String> players = playerRepository.findPlayers(roomId);
        players.removeIf(s -> s.equals(answerer));

        // 해당 category 해당하는 제시어 2개 랜덤으로 가져오기
        String category = quizPlayersRoleReq.getCategory();
        List<String> randomTitles = wordRepository.getRandomTitlesByCategory(category);

        // 플레이어들 Role 저장
        List<Map<String, String>> playersRoleInfo = new ArrayList<>();

        // 랜덤하게 선택된 2개의 title
        String answer = randomTitles.get(0);
        String wrongAnswer = randomTitles.get(1);

        // players 목록에서 한 명의 player 랜덤으로 liar로 선정
        String liar = players.get((int) (Math.random() * players.size()));

        for (String player : players) {
            Map<String, String> userInfo = new HashMap<>();

            if (player.equals(liar)) {
                userInfo.put("playerNickname", player);
                userInfo.put("word", wrongAnswer);
            } else {
                userInfo.put("playerNickname", player);
                userInfo.put("word", answer);
            }
            playersRoleInfo.add(userInfo);
        }

        Game game = gameRepository.findByGameId(gameId);

        Optional<GameSet> gameSetOptional = gameSetRepository.findById(setId);

        // GameSet 테이블 업데이트
        if(gameSetOptional.isPresent()){
            GameSet gameSet = gameSetOptional.get();

            GameSet updatedGameSet = GameSet.builder()
                    .setId(gameSet.getSetId())
                    .answer(answer)
                    .answerer(answerer)
                    .category(category)
                    .liar(liar)
                    .setFirst(1)
                    .wrongAnswer(wrongAnswer)
                    .game(game)
                    .build();

            gameSetRepository.save(updatedGameSet);
            
        }
        else {
            throw new SetNotExistException();
        }

        return new QuizPlayersRoleRes(setId, playersRoleInfo, GameProcessType.Desc);
    }

    private String getRandomNickname(Set<String> votersSet) {
        List<String> votersList = new ArrayList<>(votersSet);
        int randomIndex = new Random().nextInt(votersList.size());
        return votersList.get(randomIndex);
    }

    private void resetVote(String roomId) {
        positiveQuizsByRoom.remove(roomId);
        negativeQuizsByRoom.remove(roomId);
    }


}
