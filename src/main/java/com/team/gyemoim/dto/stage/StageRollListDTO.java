package com.team.gyemoim.dto.stage;

import lombok.Data;

@Data
public class StageRollListDTO {
  private Integer uNo; //회원번호
  private Integer pfID; //계모임 식별번호
  private String name;
  private Integer receiveTurn; //곗돈 수령순서
  private String pfMaster; //계모임 장
}
