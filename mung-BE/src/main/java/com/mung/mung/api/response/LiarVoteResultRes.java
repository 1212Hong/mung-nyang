package com.mung.mung.api.response;

import com.mung.mung.db.enums.GameProcessType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LiarVoteResultRes {

    List<String> MostVotedNicknames;

    private GameProcessType gameProcessType;
}
