package com.mung.mung.api.service;

import com.mung.mung.db.entity.Dog;
import com.mung.mung.db.entity.GameRoom;
import com.mung.mung.db.entity.Player;
import com.mung.mung.db.repository.GameRoomRepository;
import com.mung.mung.db.repository.NicknameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class NicknameService {
    private final NicknameRepository nicknameRepository;
    private final GameRoomRepository gameRoomRepository;

    private long nicknameCount;
    private long randomNumber;

    @PostConstruct
    public void init() {
        nicknameCount = nicknameRepository.count();
            if (nicknameCount < 1) {
                nicknameCount = 1;
            }
        randomNumber = new Random().nextLong() % nicknameCount + 1;
    }

    @Transactional
    public String giveNickname(String roomId) {

        GameRoom gameRoom = gameRoomRepository.findByRoomId(roomId);
        List<Player> players = gameRoom.getPlayers();
        int playerCount = players.size();
        int ChangeCount = 0;
        String returnNickname="NotAllowNickname";
        String playerNickname="null";
        for (int i = 0; i < 100; i++) {
            ChangeCount += 1;
            System.out.println("아오");
            System.out.println(randomNumber);
            Dog existingNickname = nicknameRepository.findByDogId(randomNumber);
            if (existingNickname !=null){
                playerNickname=existingNickname.getDogNickname();
            }else{
                return returnNickname;
            }
            int playerNameCount = 0;
            for (Player player : players) {
                if (player.getPlayerNickname().equals(playerNickname)) {
                    randomNumber = (randomNumber + 1) % nicknameCount + 1;
                    break;
                }
                playerNameCount += 1;
            }
            if (playerNameCount == playerCount) {
                returnNickname = playerNickname;
                randomNumber = (randomNumber + 1) % nicknameCount + 1;
                break;
            }
        }
        if (ChangeCount >= 100) {
            return returnNickname;
        } else {
            return returnNickname;
        }
    }
}
