package com.mung.mung.db.entity;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class GameRoom {

    @Id
    private String roomId;

    private String roomPw;

    private String owner;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

//    @OneToMany(mappedBy = "gameRoom")// default : LAZY
//    private List<Player> players = new ArrayList<>();
//
//    @OneToMany(mappedBy = "gameRoom")// default : LAZY
//    private List<Game> games = new ArrayList<>();
//
//    @OneToMany(mappedBy = "gameRoom")// default : LAZY
//    private List<BannedPlayer> bannedPlayers = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "gameRoom")// default : LAZY
    private List<Player> players = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "gameRoom")// default : LAZY
    private List<Game> games = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "gameRoom")// default : LAZY
    private List<BannedPlayer> bannedPlayers = new ArrayList<>();

//    public static GameRoomBuilder builder(long roomPk, String roomTitle, String roomPw, String roomUrl ) {
//        return new GameRoomBuilder().roomPk(roomPk).roomTitle(roomTitle).roomPw(roomPw)
//                .roomUrl(roomUrl);
//    }

}

