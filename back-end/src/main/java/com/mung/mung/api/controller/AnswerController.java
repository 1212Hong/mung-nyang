package com.mung.mung.api.controller;


import com.mung.mung.api.request.EmergencyAnswerReq;
import com.mung.mung.api.request.FinalAnswerReq;
import com.mung.mung.api.request.LiarAnswerReq;
import com.mung.mung.api.response.AnswerRes;
import com.mung.mung.api.service.AnswerService;
import com.mung.mung.api.service.ScoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/answer")
public class AnswerController {

    private final AnswerService answerService;
    private final ScoreService scoreService;

    //비상정답
    @PostMapping("/emergency")
    public ResponseEntity<AnswerRes> emergencyAnswer(@RequestBody EmergencyAnswerReq emergencyAnswerReq) {

        AnswerRes returnAnswer = answerService.emergencyAnswer(emergencyAnswerReq);
        //returnAnswer의 경우에 따라 점수 산정 방식이 다르다.
        Map<String, Integer> scoreMap = answerService.emergencyAnswerScore(returnAnswer);
        scoreService.calcScoreEmergency(emergencyAnswerReq, scoreMap.get("liarScore"), scoreMap.get("noLiarScore"), scoreMap.get("elseScore"));
        return new ResponseEntity<>(returnAnswer, HttpStatus.OK);
    }

    // 최종 정답
    @PostMapping("/final")
    public ResponseEntity<AnswerRes> finalAnswer(@RequestBody FinalAnswerReq finalAnswerReq) {

        AnswerRes returnAnswer = answerService.finalAnswer(finalAnswerReq);
        if (returnAnswer.getResultReturn().equals("LiarLose_Final")) {
            // 정답자가 정답을 맞추는데 성공함
            scoreService.calcScoreFinal(finalAnswerReq, 1, 0);
        }
        return new ResponseEntity<>(returnAnswer, HttpStatus.OK);
    }

    @PostMapping("/liar")
    public ResponseEntity<AnswerRes> pickedLiarAnswer(@RequestBody LiarAnswerReq liarAnswerReq) {

        AnswerRes returnAnswer = answerService.pickedLiarAnswer(liarAnswerReq);
        Map<String, Integer> scoreMap = answerService.liarAnswerScore(returnAnswer);

        scoreService.calcScoreLiar(liarAnswerReq, scoreMap.get("liarScore"), scoreMap.get("noLiarScore"));
        return new ResponseEntity<>(returnAnswer, HttpStatus.OK);
    }
}
