package com.team.gyemoim.dto.admin;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class AdminStageDetailDTO {
   //스테이지 기본 정보
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

    private String  startFlag; //대기중(디폴트)->참여중->완료
    private Integer paymentOrder; //지급순서
    private Integer stageBalance; //계모임 통장 잔액



    //스테이지 상세정보
    private Integer depositCnt; // 입금횟수(roll)
    private Integer stageAmount; //입금 누적 잔액(roll)
   private String pfMaster; //계모임 장(roll)

}
