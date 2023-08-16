package com.mung.mung.api.service;

import com.mung.mung.api.request.LiarSubmitVoteReq;
import com.mung.mung.api.response.LiarAnswerOptionsRes;
import com.mung.mung.api.response.LiarVoteResultRes;
import com.mung.mung.common.exception.custom.LiarAnswerOptionsNotExistException;
import com.mung.mung.common.exception.custom.SetNotExistException;
import com.mung.mung.db.entity.GameSet;
import com.mung.mung.db.enums.GameProcessType;
import com.mung.mung.db.repository.GameSetRepository;
import com.mung.mung.db.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
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
    public LiarVoteResultRes getLiarVoteResult(long setId) {

        log.info("setId : {} 투표 현황 : {}", setId, votingData.get(setId));
        Map<String, Integer> setVotingData = votingData.get(setId);

        // 아무도 투표 하지 않았을 경우
        if (setVotingData == null || setVotingData.isEmpty()) {
            //라이어가 이김
            return new LiarVoteResultRes(new ArrayList<>(), GameProcessType.NoLiar);

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
        // 1명만 뽑힌 경우
        if (mostVotedNicknames.size() == 1) {
            return new LiarVoteResultRes(mostVotedNicknames, GameProcessType.SelectAns);
        } else {
            //무승부가 났을 경우
            return new LiarVoteResultRes(mostVotedNicknames, GameProcessType.LiarVote);

        }

    }

    @Override
    public LiarAnswerOptionsRes getLiarAnswerOptions(long setId) {

        GameSet gameSet = gameSetRepository.findBySetId(setId);

        if (gameSet == null) {
            throw new SetNotExistException();
        }

        String category = gameSet.getCategory();
        List<String> randomAnswerOptions = wordRepository.findRandomLiarAnswers(category);
        log.info("정답 예시들 : {}", randomAnswerOptions);
        if (randomAnswerOptions.isEmpty()) {
            throw new LiarAnswerOptionsNotExistException();
        }

        String answer = gameSet.getAnswer();
        String wrongAnswer = gameSet.getWrongAnswer();

        randomAnswerOptions.add(answer);
        randomAnswerOptions.add(wrongAnswer);

        Collections.shuffle(randomAnswerOptions);

        return new LiarAnswerOptionsRes(randomAnswerOptions);
    }

    public void resetVote(long setId) {
        log.info("Liar 투표 정보 삭제 : {}", setId);

        votingData.remove(setId);
    }
}
