package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.stage.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.Date;
import java.util.List;

@Mapper
public interface StageMapper {
  //(찬희) 스테이지 Pf 정보 갖고오기
  List<StagePfDTO> getPfList(Integer pfID);
  //(찬희) 개인 Roll 정보 갖고오기
  List<StageRollDTO> getRollList(StageRollDTO dto);
  //(찬희) 참여중인 Member 리스트 정보 갖고오기
  List<StageRollListDTO> getMemList(Integer pfID);
  //(찬희) 수령예정표 갖고오기
  List<StageImportDTO> getImportList(Integer pfID);
    //(찬희)스테이지 참여 시 roll insert
  void rollIn(StageINDTO dto);
  //(찬희)Roll의 uNo 갯수 조회
  int RollUnoCount(StageINDTO dto);
  //(찬희)PF의 pfEntry 값 조회
  int pfEntryValue(StageINDTO dto);
  //(찬희)PF의 startFlag를 '참여중'으로 update
  void stageStart(StageINDTO dto);
  //(찬희)PF의 startDate를 SYSDATE update
  void startDateInsert(StageINDTO dto);
  //(찬희)PF의 startDate 값 조회
  Date getStartDate(StageINDTO dto);
  //(찬희)PF의 endDate update
  void endDateInsert(StageINDTO dto);
  //(찬희)스테이지 나갈 때 Participation_uNo:null
  void partUNoNull(StageINDTO dto);
  //(찬희)스테이지 나갈 때 roll_uNo:delete
  void rollDelete(StageINDTO dto);
  //(찬희) 스테이지 my계좌 정보 불러오기
  Integer getMyAccount(StageRollDTO dto);
  //(찬희)1. 계좌잔액 업데이트 -> uPayment 금액을 insert
  void stageBalanceUpdate(StageRollDTO dto);
  //(찬희)2.my계좌 잔액 -> 현금액 - uPayment
  void myAccountUPaymentUpdate(StageRollDTO dto);
  //(찬희)4. 입금 횟수 mapper.xml에서 +1
  void depositCntPlus(StageRollDTO dto);
  //(찬희)5. 입금 누적 금액 update
  void stageAmountUpdate(StageRollDTO dto);
}
