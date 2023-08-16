package com.mung.mung.api.service;

import com.mung.mung.api.response.DanceRes;
import com.mung.mung.db.entity.Dance;
import com.mung.mung.db.repository.DanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PenaltyService {
    private final DanceRepository danceRepository;

    @Transactional
    public DanceRes getRandomDance() {
        Dance dance = danceRepository.getRandomDance();
        return DanceRes.builder()
                .danceUrl(dance.getDanceUrl())
                .difficulty(dance.getDifficulty())
                .build();
    }

    @Transactional
    public String getPenaltyPlayer(HashMap<String, Integer> scoreMap) {
        Set<String> keySet = scoreMap.keySet();
        int minScore = 1000;
        List<String> players = new ArrayList<>();
        for (String key : keySet) {
            if (scoreMap.get(key) < minScore) {
                minScore = scoreMap.get(key);
            }
        }
        for (String key : keySet) {
            if (scoreMap.get(key).equals(minScore)) {
                players.add(key);
            }
        } // 목록 return
        Random random = new Random();
        // 동점자 중 랜덤으로 유저 제공
        return players.get(random.nextInt(players.size()));
    }

//    1~cnt까지 랜덤으로 벌칙 선정 => DB에 1이라는 key값이나 중간에 비어있으면 오류
//    @Transactional
//    public DanceRes getRandomDance(){
//        long danceCnt=danceRepository.count();
//        DanceRes danceRes;
//        if (danceCnt == 0) {
//            throw new PenaltyNotExistException();
//        }
//        Random random = new Random();
//        long randomNumber = (long) random.nextInt((int) danceCnt) + 1;
//        Dance dance = danceRepository.findByDanceId(randomNumber);
//        danceRes = DanceRes.builder()
//                .danceUrl(dance.getDanceUrl())
//                .difficulty(dance.getDifficulty())
//                .build();
//        return danceRes;
//    }

}
