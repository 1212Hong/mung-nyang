package com.mung.mung.db.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameSet {

    @Id
    @GeneratedValue
    private Long setId;

    private int setFirst;

    private String category;

    private String answerer;

    private String liar;

    private String answer;

    private String wrongAnswer;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

}
