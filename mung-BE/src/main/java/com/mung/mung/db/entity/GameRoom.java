package com.mung.mung.db.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameRoom {

    @Id
    @GeneratedValue
    private Long roomPk;

    private String roomTitle;

    private String roomPw;

    private String roomUrl;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @OneToMany(mappedBy = "gameRoom")// default : LAZY
    private List<Player> players = new ArrayList<>();

    @OneToMany(mappedBy = "gameRoom")// default : LAZY
    private List<Game> games = new ArrayList<>();

    @OneToMany(mappedBy = "gameRoom")// default : LAZY
    private List<BannedPlayer> bannedPlayers = new ArrayList<>();

}
