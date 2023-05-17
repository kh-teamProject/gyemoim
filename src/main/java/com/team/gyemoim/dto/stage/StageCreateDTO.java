package com.team.gyemoim.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StageCreateDTO {
    private Integer pfID; // 번호(시퀀스)
    private String pfName; //이름(유니크)
    private  Integer pfEntry;//참가자 수(5,7)
    private  BigDecimal pfRate; //이율
    private Integer deposit;//약정금
    private Integer receiveTurn; //순번
    private String  interest; //관심사
    private String pRank; //신용등급

    private String  startDate; //시작일자
    private String  endDate; //종료일자
    private Integer StageBalance; //순번
    private String  startFlag; //대기중(디폴트)->참여중->완료
}
