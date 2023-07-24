package com.mung.mung.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class GameRoom {

    @Id
    @GeneratedValue
    private Long roomPk;

    private String roomTitle;

    private LocalDateTime roomPw;
    private LocalDateTime roomUrl;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_pk")
//    private User user;

}
