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
public class GameSet {

    @Id
    @GeneratedValue
    private Long setId;

    private int setFirst;


    private String answerer;

    private String lier;

    private String answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_pk")
    private Game game;

}
