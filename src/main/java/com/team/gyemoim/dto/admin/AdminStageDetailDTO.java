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
    private String  startDate; //시작일자
    private String  endDate; //종료일자
    private String  startFlag; //대기중(디폴트)->참여중->완료
    private Integer paymentOrder; //지급순서
    private Integer stageBalance; //계모임 통장 잔액

  // (유진)스테이지 참여 회원 정보
  private Integer uNo; //회원번호
  private String name; //회원 이름
  private Integer uPayment; //개인별 월입금액
  private Integer uTotalPayment;// 개인별 총 입금액
  private Integer uTotalReceipts; //개인별 실 지급
  private Integer uReceipt; // 개인별 이득



}
