package com.mung.mung.db.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long setId;

    private String category;

    private String answerer;

    private String liar;

    private String answer;

    private String wrongAnswer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

}
