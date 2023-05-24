package com.team.gyemoim.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ParticipationVO {
  private int receiveTurn; //곗돈수령순서
  private int pfID; // 계모임 식별번호
  private int uNo; //회원번호
  private Date startDate; //계모임 시작일
  private Date endDate; //계모임 종료일
}
