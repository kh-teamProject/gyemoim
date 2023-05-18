package com.team.gyemoim.vo;

import lombok.Data;

@Data
public class MemberVO {

  private Integer uno; // 회원번호
  private String email; // 이메일
  private String password; // 패스워드
  private String name; // 이름
  private String phone; // 전화번호
  private String interest; // 관심사
  private String bankName; // 은행명
  private String bankAccountNumber; // 계좌번호
  private String accountHolder; // 예금주
  private String identifier; // 식별자
  private double creditRating; // 신용등급
  private String enrollDate; // 회원가입일
  private String isLeave; // 탈퇴여부
}