package com.team.gyemoim.dto.stage;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class StageINDTO {
  private Integer uNo; //회원번호
  private Integer pfID; //계모임 식별번호
  private Integer receiveTurn; //곗돈 수령순서
  private Date startDate; //계모임 시작날짜
  private Date endDate; //계모임 종료날짜
}
