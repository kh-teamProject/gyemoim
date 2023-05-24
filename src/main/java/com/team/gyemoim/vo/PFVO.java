package com.team.gyemoim.vo;


import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class PFVO {
  private int pfID; //계모임 식별번호
  private String pfMaster; //계주
  private String pfName; //계이름
  private int pfEntry; //참가자수
  private int payment; //월입금액
  private BigDecimal pfRate; //계모임이율
  private int deposit; //약정금
  private String startFlag; //계모임시작여부
  private int pRank; //등급
  private String interest; //관심사
}
