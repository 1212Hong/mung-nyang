package com.mung.mung.api.service;

import com.mung.mung.api.response.DanceRes;
import com.mung.mung.db.entity.Dance;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.repository.DanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PenaltyService {
    private final DanceRepository danceRepository;

    @Transactional
    public DanceRes getRandomDance(){
        long danceCnt=danceRepository.count();
        DanceRes danceRes;
        if (danceCnt == 0) {
            danceRes = DanceRes.builder()
                    .danceUrl("https://www.youtube.com/watch?v=Rvd2Viqkf8c")
                    .difficulty("어려움")
                    .build();
            return danceRes;
        }
        else{
        Random random = new Random();
        long randomNumber = (long) random.nextInt((int) danceCnt) + 1;
        Dance dance = danceRepository.findByDanceId(randomNumber);
        danceRes = DanceRes.builder()
                .danceUrl(dance.getDanceUrl())
                .difficulty(dance.getDifficulty())
                .build();
        return danceRes;
        }
    }

}
