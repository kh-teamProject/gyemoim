package com.team.gyemoim.vo;

import lombok.Data;

@Data
public class Participation {
  private int uNo; //회원번호
  private int pfID; // 계모임 식별번호
  private String progress; //계모임 진행상태
  private int receiveTurn; //곗돈수령순서
  private String paymentCheck; //입금확인식별자

}
