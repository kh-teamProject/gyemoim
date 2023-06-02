package com.team.gyemoim.dto.stage;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StageSelectDTO {

    private Integer uNo; // 회원번호
    private Integer pfID; // 계모임 식별번호
    private String pfMaster; // 계모임 장 등록
    private String pfName; // 계모임 이름
    private double payment; // 월 입금액
    private BigDecimal pfRate; // 계모임 이율
    private double deposit; // 약정금
    private int receiveTurn; // 곗돈 수령순서
    private double uPayment; // 개인별 월 입금액
}
