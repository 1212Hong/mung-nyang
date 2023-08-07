package com.mung.mung.api.service;

import com.mung.mung.api.request.EmergencyAnswerReq;
import com.mung.mung.api.request.FinalAnswerReq;
import com.mung.mung.api.request.LiarAnswerReq;
import com.mung.mung.db.entity.GameSet;
import com.mung.mung.db.repository.GameSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final GameSetRepository gameSetRepository;

    // 긴근정답에 따른 승패 여부 처리
    public String emergencyAnswer(EmergencyAnswerReq emergencyAnswerReq){
        long setId=emergencyAnswerReq.getSetId();
        String playerNickname=emergencyAnswerReq.getPlayerNickname();
        String answer=emergencyAnswerReq.getAnswer();
        GameSet gameSet=gameSetRepository.findBySetId(setId);
        if (gameSet.getAnswerer().equals(playerNickname))
        {
            if (gameSet.getAnswer().equals(answer)){
                // 정답자가 눌러서 정답을 맞춤
                return "LiarLose_AnsPick";
            }else {
                // 정답자가 눌렀지만 정답을 못 맞춤
                return "LiarWin_AnsPick";
            }
        }
        else if (gameSet.getLiar().equals(playerNickname)) {
            if(gameSet.getAnswer().equals(answer)){
                // 라이어가 눌러서 정답을 맞춤
                return "LiarWin_LiarPick";
            }else{
                // 라이어가 눌렀지만 정답을 못 맞춤
                return "LiarLose_LiarPick";
            }

        }
        // 두 경우가 아니면 시민이 라이어라고 속았으므로 시민의 패배
        return "LiarWin_ElsePick";
    }

    public Map<String,Integer> emergencyAnswerScore(String returnAnswer){
        Map<String, Integer> scoreHash=new HashMap<>();
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
        scoreHash.put("liarScore", liarScore);
        scoreHash.put("noLiarScore", noLiarScore);
        scoreHash.put("elseScore", elseScore);
        return scoreHash;

    }

    //정답자의 최종 정답 여부만 판별
    public  String finalAnswer(FinalAnswerReq finalAnswerReq){
        GameSet gameSet=gameSetRepository.findBySetId(finalAnswerReq.getSetId());
        if (gameSet.getAnswer().equals(finalAnswerReq.getAnswer())){
            return "LiarLose_Final";
        }else {
            return "Pick to Liar";
        }
    }

    // 뽑힌 사람이 라이어인지, 정답을 맞췄는지 여부 판별
    public String pickedLiarAnswer(LiarAnswerReq liarAnswerReq){
        long setId=liarAnswerReq.getSetId();
        String pickedLiar=liarAnswerReq.getPickedLiar();
        String answer=liarAnswerReq.getAnswer();
        GameSet gameSet=gameSetRepository.findBySetId(setId);
        if (gameSet.getLiar().equals(pickedLiar)){
            // Liar를 맞췄을때
            if (gameSet.getAnswer().equals(answer)){
                // 뽑힌 Liar가 정답을 맞춘다면
                return "LiarWin_Success";
            }else{
                // Liar가 정답을 못 맞췄다면
                return "LiarLose_Fail";
            }
        }else{
            // Liar를 못 맞췄다면
            return "LiarWin_NotLiar";
        }
    }

    public Map<String, Integer>liarAnswerScore(String returnAnswer){
        int liarScore; int noLiarScore;
        Map<String, Integer> scoreHash=new HashMap<>();
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
        scoreHash.put("liarScore",liarScore);
        scoreHash.put("noLiarScore",noLiarScore);
        return scoreHash;
    }
}
