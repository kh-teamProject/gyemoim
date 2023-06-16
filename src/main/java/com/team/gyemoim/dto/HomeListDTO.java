package com.team.gyemoim.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class HomeListDTO {
  private int pfID; //계모임 식별번호
  private String pfName; //계이름
  private int pfEntry; //참가자수
  private int payment; //월입금액
  private BigDecimal pfRate; //계모임이율
  private int deposit; //약정금
  private String startFlag; //계모임시작여부
  private String pRank; //등급
  private String interest; //관심사

  private int receiveTurn;
  private int stageBalance;
  private int paymentOrder;

  private int uNo;

}
