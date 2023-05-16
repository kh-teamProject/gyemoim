package com.team.gyemoim.dto;

import lombok.Data;

@Data
public class MemberDTO {
  private Integer uno; // 회원번호
  private String email; //이메일
  private String name; //이름
  private String phone; //전화번호
  private String address; //주소
  private String postcode; //우편번호
  private String addressDetail; //상세주소
  private String bankName; //은행명
  private String bankAccountNumber; //계좌번호
  private Integer creditRating; //신용등급
  private String enrollDate; //회원가입일
}
