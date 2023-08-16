package com.mung.mung.common.exception;

import com.mung.mung.common.exception.custom.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {RoomNotExistException.class})
    public ResponseEntity<Object> handelRoomNotExistException(RoomNotExistException e) {

        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.ROOM_NOT_EXIST_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);

    }

    @ExceptionHandler(value = {GameNotExistException.class})
    public ResponseEntity<Object> handelGameNotExistException(GameNotExistException e) {

        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.GAME_NOT_EXIST_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);

    }

    @ExceptionHandler(value = {QuizNotFoundException.class})
    public ResponseEntity<Object> handleQuizNotFoundException(QuizNotFoundException e) {
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        ApiException apiException = new ApiException(
                ExceptionMessage.QUIZ_NOT_FOUND_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {SetNotExistException.class})
    public ResponseEntity<Object> handleSetNotExistException(SetNotExistException e) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.SET_NOT_EXIST_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {LiarVoteResultNotFoundException.class})
    public ResponseEntity<Object> handleLiarVoteResultNotFoundException(LiarVoteResultNotFoundException e) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.LIAR_VOTE_RESULT_NOT_FOUND_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {LiarAnswerOptionsNotExistException.class})
    public ResponseEntity<Object> handleLiarAnswerOptionsNotExistException(LiarAnswerOptionsNotExistException e) {
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        ApiException apiException = new ApiException(
                ExceptionMessage.LIAR_ANSWER_OPTIONS_NOT_EXIST_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {PlayerNotExistException.class})
    public ResponseEntity<Object> handlePlayerNotExistException(PlayerNotExistException e) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.PLAYER_NOT_EXIST_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {VotesNotStartException.class})
    public ResponseEntity<Object> handleVotesNotStartException(VotesNotStartException e) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.VOTES_NOT_START_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {RoomAlreadyExistsException.class})
    public ResponseEntity<Object> roomAlreadyExistsException(RoomAlreadyExistsException e) {
        HttpStatus httpStatus = HttpStatus.CONFLICT;

        ApiException apiException = new ApiException(
                ExceptionMessage.ROOM_ALREADY_EXISTS_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {RoomAlreadyStartException.class})
    public ResponseEntity<Object> gameRoomAlreadyStartException(RoomAlreadyStartException e) {
        HttpStatus httpStatus = HttpStatus.SERVICE_UNAVAILABLE;

        ApiException apiException = new ApiException(
                ExceptionMessage.ROOM_ALREADY_START_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }


    @ExceptionHandler(value = {SessionNotExistException.class})
    public ResponseEntity<Object> sessionNotExistException(SessionNotExistException e) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.SESSION_NOT_EXIST_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = {RoomPasswordWrongException.class})
    public ResponseEntity<Object> roomPasswordWrongException(RoomPasswordWrongException e) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

        ApiException apiException = new ApiException(
                ExceptionMessage.ROOM_PASSWORD_WRONG_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }


    @ExceptionHandler(value = {RoomAlreadyFullException.class})
    public ResponseEntity<Object> roomAlreadyFullException(RoomAlreadyFullException e) {
        HttpStatus httpStatus = HttpStatus.CONFLICT;

        ApiException apiException = new ApiException(
                ExceptionMessage.ROOM_ALREADY_FULL_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }


    @ExceptionHandler(value = {PenaltyNotExistException.class})
    public ResponseEntity<Object> penaltyNotExistException(PenaltyNotExistException e) {
        HttpStatus httpStatus = HttpStatus.CONFLICT;

        ApiException apiException = new ApiException(
                ExceptionMessage.PENALTY_NOT_EXIST_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }


    @ExceptionHandler(value = {NicknameNotExistException.class})
    public ResponseEntity<Object> nicknameNotExistException(NicknameNotExistException e) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.NICKNAME_NOT_EXIST_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }


    @ExceptionHandler(value = {NicknameAlreadyExistException.class})
    public ResponseEntity<Object> nicknameAlreadyExistException(NicknameAlreadyExistException e) {
        HttpStatus httpStatus = HttpStatus.CONFLICT;

        ApiException apiException = new ApiException(
                ExceptionMessage.NICKNAME_ALREADY_EXIST_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }


    @ExceptionHandler(value = {WordNotFoundException.class})
    public ResponseEntity<Object> handelWordNotFoundException(WordNotFoundException e) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.WORD_NOT_FOUND_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }


    @ExceptionHandler(value = {RecordingNotStartedException.class})
    public ResponseEntity<Object> recordingNotStartedException(RecordingNotStartedException e) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                ExceptionMessage.RECORDING_NOT_STARTED_MESSAGE,
                httpStatus,
                ZonedDateTime.now(ZoneId.of("Z"))
        );

        return new ResponseEntity<>(apiException, httpStatus);
    }

}
