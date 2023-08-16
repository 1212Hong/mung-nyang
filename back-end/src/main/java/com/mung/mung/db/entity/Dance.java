package com.mung.mung.db.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long danceId;

    private String danceUrl;

    private String difficulty;


}
