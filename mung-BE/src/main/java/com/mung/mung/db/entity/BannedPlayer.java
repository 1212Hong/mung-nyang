package com.mung.mung.db.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BannedPlayer {

    @Id
    @GeneratedValue
    private  Long banId;

    private String banIp;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private GameRoom gameRoom;

}
