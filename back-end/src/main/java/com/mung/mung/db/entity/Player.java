package com.mung.mung.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerId;

    private String playerNickname;

    @ColumnDefault("0")
    private int playerScore;

//    @ColumnDefault("0")
//    private int playerVote;

    private String playerWord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private GameRoom gameRoom;

    public void changeScore(int newScore) {
        this.playerScore = newScore;
    }


}
