package com.team.gyemoim.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StageRollDTO {
  private Integer uNo; //회원번호
  private Integer pfID; //계모임 식별번호
  private Integer depositCnt; //입금횟수
  private Integer stageAmount; //스테이지 입금누적
  private String paymentCheck; //입금확인 식별자
  private Integer receiveTurn; //곗돈 수령순서
  private Integer uPayment; //개인별 월 입금액
  private String pfMaster; //계모임 장
  private Integer myBalance; //myAccount 잔액
}
