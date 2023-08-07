package com.mung.mung.api.controller;

import com.mung.mung.api.request.FinalAnswerReq;
import com.mung.mung.api.response.DanceRes;
import com.mung.mung.api.service.PenaltyService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/penalty")
public class PenaltyController {
    private final PenaltyService penaltyService;


    @GetMapping("")
    public ResponseEntity<DanceRes> getPenalty()
    {
        return new ResponseEntity<>(penaltyService.getRandomDance(), HttpStatus.OK);
    }

}
