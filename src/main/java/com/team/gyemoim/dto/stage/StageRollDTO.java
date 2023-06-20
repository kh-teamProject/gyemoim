package com.team.gyemoim.dto.stage;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class StageRollDTO {
  private Integer uNo; //회원번호
  private Integer pfID; //계모임 식별번호
  private Integer depositCnt; //입금횟수
  private Integer stageAmount; //스테이지 입금누적
  private String paymentCheck; //입금확인 식별자
  private Integer receiveTurn; //곗돈 수령순서
  private Integer uPayment; //개인별 월 입금액
  private String pfMaster; //계모임 장
  private Integer myBalance; //myAccount 잔액
  private Integer paymentOrder;//지급순서
  private Integer pfEntry; //계모임 참가자 수
  private Integer uTotalReceipts; //개인별 실 지급금
  private Integer uTotalPayment; //개인별 총 입금액
  private Integer uReceipt; //개인별 실 이득
  private Date stageInDate; // 스테이지 입장 시간

  //출입금 이력 로그를 남겨야 함
  private String pfName; // 계모임 이름
}
