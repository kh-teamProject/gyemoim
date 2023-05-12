package com.team.gyemoim.dto;

import lombok.Data;

import java.util.Date;

@Data
public class StageParticipationDTO {
  private Integer uNo; //회원번호
  private Integer pfID; //계모임 식별번호
  private Integer stageBalance; //계모임 잔액
  private Integer receiveTurn;//곗돈 수령순서
}
