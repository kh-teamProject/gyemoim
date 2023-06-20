package com.team.gyemoim.dto.stage;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PfDTO {

    private BigDecimal pfRate; // 계모임 이율
    private int receiveTurn; // 곗돈 수령순서
    private double uPayment; // 월 입금액
    private double uTotalPayment; // 총 입금액
    private double uTotalReceipts; // 실 지급금
    private double uRate; // 적용이율(세후)
    private double uReceipt; // 실 이자(세후)

}
