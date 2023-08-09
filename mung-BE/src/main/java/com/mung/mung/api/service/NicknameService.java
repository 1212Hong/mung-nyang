package com.mung.mung.api.service;

import com.mung.mung.db.entity.Dog;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.entity.Player;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.NicknameRepository;
import com.mung.mung.db.repository.PlayerRepository;
import com.mung.mung.db.repository.PlayerRepositoryImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class NicknameService {
    private final NicknameRepository nicknameRepository;
    private final GameRoomRepository gameRoomRepository;
    private final PlayerRepository playerRepository;
    private long nicknameCount;
    private long randomNumber;

    @PostConstruct
    public void init() {
        nicknameCount = nicknameRepository.count();
            if (nicknameCount < 1) {
                nicknameCount = 1;
            }
            Random random=new Random();
        randomNumber = (long) random.nextInt((int) nicknameCount)+ 1;
    }

    @Transactional
    public String giveNickname(String roomId) {

        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        List<String> players = playerRepository.findPlayers(roomId);
        int playerCount = players.size();
        int ChangeCount = 0;
        String returnNickname="NotAllowNickname";
        this.randomNumber = (this.randomNumber) % nicknameCount + 1;
        log.info("randomNumber{}",this.randomNumber);
        for (int i=0; i<=10; i++){
            Dog existingDog = nicknameRepository.findByDogId(this.randomNumber);
            String checkNickname=existingDog.getDogNickname();
           if (players.contains(checkNickname)){
               // 존재한다면
               this.randomNumber = ((this.randomNumber) % nicknameCount) + 1;
           }else{
               log.info("최종 randomNumber : {}",this.randomNumber);
               log.info("최종 returnNickname : {}",checkNickname);
               returnNickname=checkNickname;
            return returnNickname;
           }
            log.info("randomNumber{}",this.randomNumber);
            log.info("checkNickname : {}",checkNickname);
        }
        return returnNickname;
    }
//        String returnNickname="NotAllowNickname";
//        String playerNickname="null";
//        for (int i = 0; i < 10; i++) {
//            ChangeCount += 1;
//
////            log.info("randomNumber 확인 : {}",this.randomNumber);
//            Dog existingNickname = nicknameRepository.findByDogId(this.randomNumber);
//            if (existingNickname !=null){
//                playerNickname=existingNickname.getDogNickname();
//            }else{
//                log.info("여기 통과하니??? : {}", returnNickname);
//                return returnNickname;
//            }
//            int playerNameCount = 0;
//            for (Player player : players) {
//                log.info("randomNumber 변화 확인 : {} ", this.randomNumber);
//                if (player.getPlayerNickname().equals(playerNickname)) {
//                    log.info("randomNumber 확인 : {} ", this.randomNumber, "returnNickname 확인 : {}", this.randomNumber);
//                    this.randomNumber = (this.randomNumber) % nicknameCount+1;
//                    break;
//                }
//                playerNameCount += 1;
//            }
//            if (playerNameCount == playerCount) {
//                log.info("playerCount확인 : {} ", playerCount);
//                log.info("randomNumber 변화 2 확인 : {} ", this.randomNumber);
//                log.info("강아지 이름 : {}",playerNickname);
//                returnNickname = playerNickname;
////
//                log.info("randomNumber 변화 3 확인 : {} ", this.randomNumber);
//                return returnNickname;
//            }
//        }
//        if (ChangeCount >= 10) {
//            return returnNickname;
//        } else {
//            return returnNickname;
//        }
//    }
}
