package com.mung.mung.api.service;

import com.mung.mung.api.request.QuizCountReq;
import com.mung.mung.api.request.QuizPlayersRoleReq;
import com.mung.mung.api.response.QuizPlayersRoleRes;
import com.mung.mung.api.response.QuizPlayersWordRes;
import com.mung.mung.api.response.QuizResultRes;
import com.mung.mung.api.response.QuizStartRes;
import com.mung.mung.common.exception.custom.*;
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
    private final Map<String, Set<String>> positiveQuizByRoom = new ConcurrentHashMap<>();
    private final Map<String, Set<String>> negativeQuizByRoom = new ConcurrentHashMap<>();

    @Override
    public QuizStartRes startQuiz(Long gameId) {

        Game game = gameRepository.findByGameId(gameId);
        if (game == null) {
            throw new GameNotExistException();
        }

        Quiz quiz = quizRepository.findQuizById(game.getRanQuiz());

        if (quiz == null) {
            throw new QuizNotFoundException();
        }

        return QuizStartRes.builder()
                .quiz(quiz)
                .build();
    }

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

            Set<String> positiveVoters = positiveQuizByRoom.get(roomId);

            selectedPlayerNickname = getRandomNickname(positiveVoters);
        } else if (negativeCount > positiveCount) {
            pickedAnswer = 2;

            Set<String> negativeVoters = negativeQuizByRoom.get(roomId);
            selectedPlayerNickname = getRandomNickname(negativeVoters);
        } else if (positiveCount == 0 && negativeCount == 0) {
            // 아무도 투표 안했을 경우
            pickedAnswer = 3;
            List<String> players = playerRepository.findPlayers(roomId);
            log.info("[아무도 투표 안함] players : {}", players);
            int randomIndex = new Random().nextInt(players.size());
            selectedPlayerNickname = players.get(randomIndex);

        } else {
            // 무승부 났을 경우
            pickedAnswer = 0; // 무승부
            Set<String> positiveVoters = positiveQuizByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet());
            Set<String> negativeVoters = negativeQuizByRoom.getOrDefault(roomId, ConcurrentHashMap.newKeySet());

            List<String> combinedVoters = new ArrayList<>();
            combinedVoters.addAll(positiveVoters);
            combinedVoters.addAll(negativeVoters);

            log.info("[무승부] players : {}", combinedVoters);

            int randomIndex = new Random().nextInt(combinedVoters.size());

            selectedPlayerNickname = combinedVoters.get(randomIndex);
        }

        log.info("answerer : {}", selectedPlayerNickname);

        return new QuizResultRes(pickedAnswer, selectedPlayerNickname);


    }

    @Override
    public QuizPlayersRoleRes getPlayersRole(QuizPlayersRoleReq quizPlayersRoleReq) {
        Long gameId = quizPlayersRoleReq.getGameId();

        String roomId = quizPlayersRoleReq.getRoomId();
        String answerer = quizPlayersRoleReq.getAnswerer();

        List<String> players = playerRepository.findPlayers(roomId);
        if (players.isEmpty()) {
            throw new PlayerNotExistException();
        }

        // answerer 을 제외한 player 닉네임 리스트
        players.removeIf(s -> s.equals(answerer));

        // 해당 category 해당하는 제시어 2개 랜덤으로 가져오기
        String category = quizPlayersRoleReq.getCategory();

        // 랜덤으로 제시어 2개 받아오기
        List<String> randomTitles = wordRepository.getRandomTitlesByCategory(category);

        if (randomTitles.isEmpty()) {
            throw new WordNotFoundException();
        }


        // 랜덤하게 선택된 2개의 제시어
        String answer = randomTitles.get(0);
        String wrongAnswer = randomTitles.get(1);

        // players 목록에서 한 명의 player 랜덤으로 liar로 선정
        String liar = players.get((int) (Math.random() * players.size()));


        Game game = gameRepository.findByGameId(gameId);
        if (game == null) {
            throw new GameNotExistException();
        }
        Long updateQuiz = (long) randomQuiz();
        // game curSet+1, 퀴즈 업데이트
        game.updateCurSetAndQuiz(updateQuiz);

        // GameSet 생성
        GameSet gameSet = GameSet.builder()
                .answer(answer)
                .answerer(answerer)
                .category(category)
                .liar(liar)
                .wrongAnswer(wrongAnswer)
                .game(game)
                .build();

        gameRepository.save(game);
        gameSetRepository.save(gameSet);

        Long setId = gameSet.getSetId();

        // 해당 room의 투표 정보 삭제
        resetVote(roomId);

        return new QuizPlayersRoleRes(setId, GameProcessType.Desc);
    }

    @Override
    public QuizPlayersWordRes getPlayerWord(Long setId, String playerNick) {
        GameSet curSet = gameSetRepository.findBySetId(setId);
        log.info("닉네임 한글 확인 decode 유무 : {}", playerNick);

        if (curSet == null) {
            throw new SetNotExistException();
        }
        String liarName = curSet.getLiar();
        // 라이어일 경우
        if (playerNick.equals(liarName)) {
            return new QuizPlayersWordRes(curSet.getWrongAnswer(), liarName);
        } else {
            return new QuizPlayersWordRes(curSet.getAnswer(), liarName);

        }
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

    // Set 가 여러개일 경우 Game 테이블의 Quiz 를 바꿔줘야함
    private int randomQuiz() {

        List<Quiz> quizList = quizRepository.findAll();

        if (quizList.isEmpty()) {
            throw new QuizNotFoundException();
        }

        return ThreadLocalRandom.current().nextInt(quizList.size()) + 1;
    }


}
