package com.team.gyemoim.dto.stage;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class StagePfDTO {
  private Integer pfID; //계모임 식별번호
  private String pfName; //계모임 이름
  private String startFlag; //계모임 시작여부
  private Integer deposit; //약정금
  private Integer pfEntry; //계모임 참가자 수
  private BigDecimal pfRate; //계모임 이율
  private Integer receiveTurn; //곗돈 수령순서
  private Date startDate; //계모임 시작날짜
  private Date endDate; //계모임 종료날짜
  private String startDay; // 계모임 시작 날짜의 '일'
  private Integer StageBalance; //계모임 잔액
}
