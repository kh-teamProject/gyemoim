package com.team.gyemoim.dto.stage;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StageReceiptDTO {
  private BigDecimal pfRate; //계모임 이율
  private Integer deposit; //약정금
  private Integer receiveTurn; //곗돈 수령순서
  private Integer payment; //월 입금액

  private Integer uPayment; //개인별 월 입금액
  private Integer uTotalPayment; //개인별 총 입금액
  private Integer uTotalReceipts; //개인별 실 지급금
  private BigDecimal uRate; //개인별 적용이율


}
