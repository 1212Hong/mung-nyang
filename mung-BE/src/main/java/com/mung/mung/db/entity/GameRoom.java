package com.mung.mung.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameRoom {

    @Id
    private String roomId;

    private String roomPw;

    private String owner;

    private String status;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Builder.Default
    @OneToMany(mappedBy = "gameRoom", cascade = CascadeType.ALL)// default : LAZY
    private List<Player> players = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "gameRoom", cascade = CascadeType.ALL)// default : LAZY
    private List<Game> games = new ArrayList<>();

//    @Builder.Default
//    @OneToMany(mappedBy = "gameRoom" ,cascade = CascadeType.ALL)// default : LAZY
//    private List<BannedPlayer> bannedPlayers = new ArrayList<>();

    public void updateOwner(String newOwner) {
        this.owner = newOwner;
    }

    public void updateStatus(String newStatus) {
        this.status = newStatus;

    }


}

