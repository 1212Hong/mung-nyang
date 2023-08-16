package com.mung.mung.api.controller;

import com.mung.mung.api.request.QuizCountReq;
import com.mung.mung.api.request.QuizPlayersRoleReq;
import com.mung.mung.api.response.QuizPlayersRoleRes;
import com.mung.mung.api.response.QuizPlayersWordRes;
import com.mung.mung.api.response.QuizResultRes;
import com.mung.mung.api.response.QuizStartRes;
import com.mung.mung.api.service.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/start/{gameId}")
    public ResponseEntity<QuizStartRes> startQuiz(@PathVariable Long gameId) {
        QuizStartRes quizStartRes = quizService.startQuiz(gameId);

        return ResponseEntity.ok(quizStartRes);
    }

    @PostMapping("/positive")
    public ResponseEntity<String> submitPositiveQuiz(@RequestBody QuizCountReq quizCountReq) {

        quizService.submitPositiveQuiz(quizCountReq);

        return ResponseEntity.ok("1번 투표 완료");

    }

    @PostMapping("/negative")
    public ResponseEntity<String> submitNegativeQuiz(@RequestBody QuizCountReq quizCountReq) {

        quizService.submitNegativeQuiz(quizCountReq);

        return ResponseEntity.ok("2번 투표 완료");

    }

    @GetMapping("/result")
    public ResponseEntity<QuizResultRes> getQuizResult(@RequestParam String roomId) {
        QuizResultRes quizResultRes = quizService.getQuizResult(roomId);

        return ResponseEntity.ok(quizResultRes);
    }

    @PostMapping("/category")
    public ResponseEntity<QuizPlayersRoleRes> getPlayersRole(@RequestBody QuizPlayersRoleReq quizPlayersRoleReq) {

        QuizPlayersRoleRes quizPlayersRoleRes = quizService.getPlayersRole(quizPlayersRoleReq);

        return ResponseEntity.ok(quizPlayersRoleRes);

    }

    @GetMapping("/word/{setId}/{playerNick}")
    public ResponseEntity<QuizPlayersWordRes> getQuizWord(@PathVariable Long setId, @PathVariable String playerNick) {


        QuizPlayersWordRes quizPlayersWordRes = quizService.getPlayerWord(setId, playerNick);

        return ResponseEntity.ok(quizPlayersWordRes);

    }


}
