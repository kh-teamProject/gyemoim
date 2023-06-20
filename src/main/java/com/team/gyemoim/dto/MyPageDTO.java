package com.team.gyemoim.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyPageDTO {
  @JsonProperty(value = "uNo")
  private Integer uNo; // 회원번호
  private String email; //이메일
  private String name; //이름
  private String phone; //전화번호
  private String bankName; //은행명
  private String bankAccountNumber; //계좌번호
  private String accountHolder; // 계좌명의
  @JsonProperty(value = "userRole")
  private String userRole; // 회원 식별자
  private String enrollDate; //회원가입일
  private Integer monthlySalary; // 월급여
  private Integer medicalCost; // 의료비
  private Integer housingCost; // 주거비
  private Integer foodCost; // 식비
  private Integer culturalCost; // 문화비
  private Integer etc; // 기타비용

}
