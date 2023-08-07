package com.mung.mung.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@AllArgsConstructor
@Getter
public class ApiException {

    private final ExceptionMessage message;
    private final HttpStatus httpStatus;
    private final ZonedDateTime timestamp;


}
