package com.team.gyemoim.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyAccountHistory {
  private Integer uNo;
  private String bankName;
  private String bankAccountNumber;
  private Integer transactionAmount;
  private String bankHistory;
  private Date tradingHours;
}
