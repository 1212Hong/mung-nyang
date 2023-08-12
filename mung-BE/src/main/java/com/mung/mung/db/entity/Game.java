package com.mung.mung.db.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;

    private int maxSet;

    private int curSet;

    private String imageUrl;

    private String videoUrl;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Long ranQuiz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private GameRoom gameRoom;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<GameSet> gameSets = new ArrayList<>();

    public void updateCurSet() {
        this.curSet = this.curSet+1;
    }

}
