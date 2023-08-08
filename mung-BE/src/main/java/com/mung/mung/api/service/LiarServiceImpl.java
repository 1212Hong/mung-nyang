package com.mung.mung.api.service;

import com.mung.mung.api.request.LiarSetIdReq;
import com.mung.mung.api.request.LiarSubmitVoteReq;
import com.mung.mung.api.response.LiarAnswerOptionsRes;
import com.mung.mung.api.response.LiarVoteResultRes;
import com.mung.mung.common.exception.custom.LiarAnswerOptionsNotExistException;
import com.mung.mung.common.exception.custom.LiarVoteResultNotFoundException;
import com.mung.mung.common.exception.custom.SetNotExistException;
import com.mung.mung.db.entity.GameSet;
import com.mung.mung.db.enums.GameProcessType;
import com.mung.mung.db.repository.GameSetRepository;
import com.mung.mung.db.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class LiarServiceImpl implements LiarService {

    private final GameSetRepository gameSetRepository;
    private final WordRepository wordRepository;

    private final Map<Long, Map<String, Integer>> votingData = new ConcurrentHashMap<>();

    @Override
    public String submitLiarVote(LiarSubmitVoteReq liarSubmitVoteReq) {
        long curSetId = liarSubmitVoteReq.getSetId();
        String votedNickname = liarSubmitVoteReq.getPlayerNickname();

        // 해당 setID에 해당하는 내부 맵 생성 혹은 가져오기
        Map<String, Integer> setVotingData = votingData.computeIfAbsent(curSetId, k -> new ConcurrentHashMap<>());

        // 해당 닉네임의 투표수 증가
        setVotingData.put(votedNickname, setVotingData.getOrDefault(votedNickname, 0) + 1);

        // votingData 맵에 업데이트
        votingData.put(curSetId, setVotingData);

        log.info("setId : {} 투표 반영여부 : {}", curSetId, votingData.get(curSetId));
        return votedNickname + " 를 투표하였습니다";
    }

    @Override
    public LiarVoteResultRes getLiarVoteResult(LiarSetIdReq liarSetIdReq) {

        long setId = liarSetIdReq.getSetId();
        log.info("setId : {} 투표 현황 : {}", setId, votingData.get(setId));
        Map<String, Integer> setVotingData = votingData.get(setId);

        if (setVotingData == null || setVotingData.isEmpty()) {
            throw new LiarVoteResultNotFoundException();
        }

        List<String> mostVotedNicknames = new ArrayList<>();
        int maxVotes = 0;
        for (Map.Entry<String, Integer> entry : setVotingData.entrySet()) {
            if (entry.getValue() > maxVotes) {
                mostVotedNicknames.clear();
                mostVotedNicknames.add(entry.getKey());
                maxVotes = entry.getValue();
            } else if (entry.getValue() == maxVotes) {
                mostVotedNicknames.add(entry.getKey());
            }
        }
        resetVote(setId);
        // 1명만 뽑힌 경우
        if(mostVotedNicknames.size()==1){
            return new LiarVoteResultRes(mostVotedNicknames, GameProcessType.SelectAns);
        }else {
            //무승부가 났을 경우
            return new LiarVoteResultRes(mostVotedNicknames, GameProcessType.LiarVote);

        }

    }

    @Override
    public LiarAnswerOptionsRes getLiarAnswerOptions(LiarSetIdReq liarSetIdReq) {
        long setId = liarSetIdReq.getSetId();
        GameSet gameSet = gameSetRepository.findBySetId(setId);

        if(gameSet==null){
            throw new SetNotExistException();
        }

        String category = gameSet.getCategory();
        List<String> randomAnswerOptions = wordRepository.findRandomLiarAnswers(category);

        if(randomAnswerOptions==null){
            throw new LiarAnswerOptionsNotExistException();
        }

        String answer = gameSet.getAnswer();
        String wrongAnswer = gameSet.getWrongAnswer();

        randomAnswerOptions.add(answer);
        randomAnswerOptions.add(wrongAnswer);

        Collections.shuffle(randomAnswerOptions);

        return new LiarAnswerOptionsRes(randomAnswerOptions);
    }

    private void resetVote(long setId) {
        votingData.remove(setId);
    }
}