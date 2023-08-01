package com.mung.mung.db.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Game {

    @Id
    @GeneratedValue
    private Long gameId;

    private String imageUrl;

    private String videoUrl;

    private String startTime;

    private String endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_Id")
    private GameRoom gameRoom;

    @OneToMany(mappedBy = "game")
    private List<GameSet> gameSets = new ArrayList<>();


}
