package com.team.gyemoim.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ImportDTO {
    private BigDecimal pfRate; //이율

    private Integer receiveTurn; //순번
    private Integer deposit; //약정금
    private  Integer pfEntry;//초기 몇명
    private Integer uPayment; //개인별월입금액
    private Integer uTotalPayment; //개인별총입금액
    private Integer uRate; //개인별 적용이율
    private Integer uInterest; //개인별 실 이자

    private Integer uTotalReceipts; //개인별 실 지급금

}
