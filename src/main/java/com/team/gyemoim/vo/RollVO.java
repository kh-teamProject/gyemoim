package com.team.gyemoim.vo;

import lombok.Data;

import java.util.Date;

@Data
public class RollVO {
  private int uNo; //회원번호
  private int pfID; // 계모임 식별번호
  private int receiveTurn; //곗돈수령순서
  private int depositCnt; // 입금 횟수
  private int stageAmount; // 입금 누적
  private String paymentCheck; //입금확인식별자
  private String pfMaster; //계모임 장 식별
  private Date stageInDate; //계모임 입장 시간
}
