package com.mung.mung.db.repository;

import java.util.List;

public interface PlayerRepositoryCumstom {

    List<String> findPlayers(String roomId);

    Long GetPlayerId(String playerNickname, String roomId);
}
