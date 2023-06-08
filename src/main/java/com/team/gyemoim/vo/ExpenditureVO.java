package com.team.gyemoim.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenditureVO {
  private Integer uNo;
  private Integer medicalCost; // 의료비
  private Integer housingCost; // 주거비
  private Integer foodCost; // 식비
  private Integer culturalCost; // 문화비
  private Integer etc; // 기타비용
}
