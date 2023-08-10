package com.mung.mung.api.service;

import com.mung.mung.api.request.QuizCountReq;
import com.mung.mung.api.request.QuizPlayersRoleReq;
import com.mung.mung.api.response.QuizPlayersRoleRes;
import com.mung.mung.api.response.QuizResultRes;
import com.mung.mung.api.response.QuizStartRes;
import com.mung.mung.common.exception.custom.GameNotExistException;
import com.mung.mung.common.exception.custom.QuizNotFoundException;
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
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final PlayerRepository playerRepository;
    private final GameRepository gameRepository;
    private final GameSetRepository gameSetRepository;
    private final WordRepository wordRepository;

    @Override
    public QuizStartRes startQuiz(String roomId) {

        List<Quiz> quizList = quizRepository.findAll();
        if (quizList.isEmpty()) {
            throw new QuizNotFoundException();
        }

        int randomIndex = ThreadLocalRandom.current().nextInt(quizList.size());
        Quiz quiz = quizList.get(randomIndex);

        return QuizStartRes.builder()
                .quiz(quiz)
                .build();
    }

    private final Map<String, Set<String>> positiveQuizByRoom = new ConcurrentHashMap<>();
    private final Map<String, Set<String>> negativeQuizByRoom = new ConcurrentHashMap<>();

    public void submitPositiveQuiz(QuizCountReq quizCountReq) {
        String roomId = quizCountReq.getRoomId();
        String playerNickname = quizCountReq.getPlayerNickname();

        positiveQuizByRoom.computeIfAbsent(roomId, key -> ConcurrentHashMap.newKeySet());

        positiveQuizByRoom.get(roomId).add(playerNickname);

    }

    public void submitNegativeQuiz(QuizCountReq quizCountReq) {
        String roomId = quizCountReq.getRoomId();
        String playerNickname = quizCountReq.getPlayerNickname();

        negativeQuizByRoom.computeIfAbsent(roomId, key -> ConcurrentHashMap.newKeySet());

        negativeQuizByRoom.get(roomId).add(playerNickname);

    }

    @Transactional
    public QuizResultRes getQuizResult(String roomId) {

        int positiveCount = positiveQuizByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet()).size();
        int negativeCount = negativeQuizByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet()).size();
        log.info("positive : {} - negative : {}", positiveQuizByRoom.get(roomId), negativeQuizByRoom.get(roomId));

        String selectedPlayerNickname = null;
        int pickedAnswer;
        if (positiveCount > negativeCount) {
            pickedAnswer = 1;

            Set<String> positiveVoters = positiveQuizByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet());
            selectedPlayerNickname = getRandomNickname(positiveVoters);
        } else if (negativeCount > positiveCount) {
            pickedAnswer = 2;

            Set<String> negativeVoters = negativeQuizByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet());
            selectedPlayerNickname = getRandomNickname(negativeVoters);
        } else {
            pickedAnswer = 0; // 무승부
            List<String> players = playerRepository.findPlayers(roomId);
            log.info("[Draw] players : {}", players);
            int randomIndex = new Random().nextInt(players.size());
            selectedPlayerNickname = players.get(randomIndex);
        }

        log.info("answerer : {}", selectedPlayerNickname);

        return new QuizResultRes(pickedAnswer, selectedPlayerNickname);


    }

    @Override
    public QuizPlayersRoleRes getPlayersRole(QuizPlayersRoleReq quizPlayersRoleReq) {
        Long gameId = quizPlayersRoleReq.getGameId();

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

            // liar만 wrongAnswer를 줌
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
        if (game == null) {
            throw new GameNotExistException();
        }

        // GameSet 생성
        GameSet gameSet = GameSet.builder()
                .answer(answer)
                .answerer(answerer)
                .category(category)
                .liar(liar)
                .wrongAnswer(wrongAnswer)
                .game(game)
                .build();

        gameSetRepository.save(gameSet);

        Long setId = gameSet.getSetId();

        // 해당 room의 투표 정보 삭제
        resetVote(roomId);

        return new QuizPlayersRoleRes(setId, playersRoleInfo, GameProcessType.Desc);
    }

    private String getRandomNickname(Set<String> votersSet) {
        List<String> votersList = new ArrayList<>(votersSet);
        int randomIndex = new Random().nextInt(votersList.size());
        return votersList.get(randomIndex);
    }

    private void resetVote(String roomId) {
        log.info("Quiz 투표 정보 삭제 : {}", roomId);
        positiveQuizByRoom.remove(roomId);
        negativeQuizByRoom.remove(roomId);
    }


}
