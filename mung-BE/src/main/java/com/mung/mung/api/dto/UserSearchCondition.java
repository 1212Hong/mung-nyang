package com.mung.mung.api.dto;

import lombok.Data;

@Data
public class UserSearchCondition {
    // 회원 명, 팀명, 나이(ageGoe >  > ageLow)를 조건으로
    private String userEmail;
}
