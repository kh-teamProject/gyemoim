package com.team.gyemoim.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankHistoryDTO {
  private Integer uNo;
  private String bankName;
  private String bankAccountNumber;
  private Integer transactionAmount;
  private String bankHistory;
}
