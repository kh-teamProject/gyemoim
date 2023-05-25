package com.team.gyemoim.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse{
    private boolean success; // 요청 성공 여부
    private String message; // 응답 메세지

    private Integer uno; // 회원번호
    private String email; //이메일
    private String password; //패스워드
    private String name; //이름
    private String phone; //전화번호
    private String bankName; //은행명
    private String bankAccountNumber; //계좌번호
    private String accountHolder; //예금주
    private double creditRating; //신용등급
    private int interest; //관심사
    private String enrollDate; //회원가입일
    private String isLeave; // 탈퇴여부
    private String userRole;// 권한
}
