package com.team.gyemoim.dto.admin;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class AdminStageDetailDTO {
  //계모임정보
  private Integer pfID; //계모임 식별번호
  private String pfMaster; //계주
  private String pfName; //계이름
  private Integer pfEntry; //참가자수
  private Integer payment; //월입금액
  private BigDecimal pfRate; //계모임이율
  private Integer deposit; //약정금
  private String startFlag; //계모임시작여부
  private Integer pRank; //등급
  private String interest; //관심사
  private Integer receiveTurn; //곗돈수령순서
  private Date startDate; //계모임 시작일
  private Date endDate; //계모임 종료일

  // (유진)스테이지 참여 회원 정보
  private Integer uNo; //회원번호
  private String name; //회원 이름
  private Integer uPayment; //개인별 월입금액
  private Integer uTotalPayment;// 개인별 총 입금액
  private Integer uTotalReceipts; //개인별 실 지급
  private Integer uReceipt; // 개인별 이득


}
