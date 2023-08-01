package com.mung.mung.stomp.service;

import com.mung.mung.db.entity.GameRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    @Override
    public GameRoom findById(String roomId) {
        return null;
    }
}
