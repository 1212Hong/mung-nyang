package com.mung.mung.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LiarAnswerOptionsRes {

    List<String> answerOptions;
}
