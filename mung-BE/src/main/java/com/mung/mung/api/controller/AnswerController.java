package com.mung.mung.api.controller;


import com.mung.mung.api.request.EmergencyAnswerReq;
import com.mung.mung.api.request.FinalAnswerReq;
import com.mung.mung.api.request.GameRoomCreateReq;
import com.mung.mung.api.request.LiarAnswerReq;
import com.mung.mung.api.service.AnswerService;
import com.mung.mung.api.service.ScoreService;
import com.mung.mung.db.entity.GameSet;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/answer")
public class AnswerController {

    private final AnswerService answerService;
    private final ScoreService scoreService;
    //비상정답
    @PostMapping("/emergency")
    public ResponseEntity<String> emergencyAnswer(@RequestBody EmergencyAnswerReq emergencyAnswerReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String returnAnswer = answerService.emergencyAnswer(emergencyAnswerReq);
        //returnAnswer의 경우에 따라 점수 산정 방식이 다르다.
        int liarScore;
        int noLiarScore;
        int elseScore;
        if (returnAnswer.equals("LiarLose_AnsPick")){
            liarScore=0; noLiarScore=1; elseScore=1;
        } else if (returnAnswer.equals("LiarWin_AnsPick")) {
            liarScore=1; noLiarScore=0; elseScore=-1;
        }else if (returnAnswer.equals("LiarWin_LiarPick")) {
            liarScore=1; noLiarScore=0; elseScore=1;
        }else if (returnAnswer.equals("LiarLose_LiarPick")) {
            liarScore=0; noLiarScore=1; elseScore=0; //-1?
        }else{
            // 시민이 눌러서 패배당함
            liarScore=1; noLiarScore=0; elseScore=-1;
        }
        scoreService.calcScoreEmergency(emergencyAnswerReq,liarScore,noLiarScore,elseScore);
        return new ResponseEntity<>(returnAnswer, HttpStatus.OK);
    }

    // 최종 정답
    @PostMapping("/final")
    public ResponseEntity<String> finalAnswer(@RequestBody FinalAnswerReq finalAnswerReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String returnAnswer=answerService.finalAnswer(finalAnswerReq);
        if (returnAnswer.equals("LiarLose_Final")){
            // 정답자가 정답을 맞추는데 성공함
            scoreService.calcScoreFinal(finalAnswerReq,1,0);
        }
        return new ResponseEntity<>(returnAnswer, HttpStatus.OK);
    }

    @PostMapping("/liar")
    public ResponseEntity<String> pickedLiarAnswer(@RequestBody LiarAnswerReq liarAnswerReq)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String returnAnswer=answerService.pickedLiarAnswer(liarAnswerReq);
        int liarScore; int noLiarScore;
        if (returnAnswer.equals("LiarWin_Success")){
            // 라이어가 정답을 맞추는데 성공함
            liarScore = 1; noLiarScore = 0;
        } else if (returnAnswer.equals("LiarLose_Fail")) {
            // 라이어가 정답을 못 맞춤
            liarScore = 0; noLiarScore = 1;
        }else{
            // 라이어 지목에 실패함
            liarScore = 1; noLiarScore =0;
        }
        scoreService.calcScoreLiar(liarAnswerReq,liarScore,noLiarScore);
        return new ResponseEntity<>(returnAnswer, HttpStatus.OK);
    }
}
