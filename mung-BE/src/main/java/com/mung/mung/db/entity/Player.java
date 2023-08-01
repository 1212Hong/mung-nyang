package com.mung.mung.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Player {

    @Id
    @GeneratedValue
    private  Long playerId;

    private String pNickname;

    private int pScore;

    private String pIp;

    private int owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_pk")
    private GameRoom gameRoom;

}
