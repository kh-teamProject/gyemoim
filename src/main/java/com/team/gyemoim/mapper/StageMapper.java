package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.stage.StageListDTO;

import com.team.gyemoim.vo.RollVO;

import com.team.gyemoim.dto.stage.ImportDTO;
import com.team.gyemoim.dto.stage.StageCreateDTO;
import com.team.gyemoim.dto.stage.StageParticipateDTO;
import com.team.gyemoim.vo.MemberVO;


import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import com.team.gyemoim.dto.stage.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface StageMapper {
  /*(유진) getPFList -> 전체버튼일때 리스트 전부 가져옴
         filterList -> deposit에 따라서 리스트 해당하는것만 가져옴 
         recommend -> 입금액에 맞춰 무작위 추천*/
  List<StageListDTO> getPFList();
  
  List<StageListDTO> filterList(int deposit);

  List<StageListDTO> recommend(int uno);


  // (현지)
    void stageCreate(StageCreateDTO stageCreateDTO);
    // (현지)
    void stageParticipate(StageParticipateDTO stageParticipateDTO);
  // (현지)
    int checkPfName(String pfName);
  // (현지)
    List<ImportDTO> importGet(ImportDTO importDTO);
  // (현지)
    List<StageCreateDTO> stagePartIn1(String pfName);
    // (현지)
    List<ImportDTO> stagePartIn2(ImportDTO importDTO);
    //(찬희) 스테이지 Pf 정보 갖고오기
    List<StagePfDTO> getPfList(Integer pfID);
    //(찬희) 개인 Roll 정보 갖고오기
    List<StageRollDTO> getRollList(StageRollDTO dto);
    //(찬희) 참여중인 Member 리스트 정보 갖고오기
    List<StageRollListDTO> getMemList(Integer pfID);
    //(찬희) 수령예정표 갖고오기
    List<StageReceiptDTO> getImportList(Integer pfID);
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
    //(찬희)6. 입금식별 Y로 update
    void stagePaymentCheckUpdate(StageRollDTO dto);
    //(찬희)현재 pf의 잔액 조회
    int getStageBalance(StageRollDTO dto);
    //(찬희) 현재 pf의 약정금 조회
    int getStageDeposit(StageRollDTO dto);
    //(찬희) stageBalance - *번의 uPayment
    void stageBalanceMinus(StageRollDTO dto);
    //(찬희)*번의 uPayment + stageBalance
    void stagePaymentOrder(StageRollDTO dto);
    //(찬희)현재 pf의 지급순서 조회
    int getPaymentOrderValue(StageRollDTO dto);

    //(찬희)전원 입금식별자 'Y' -> 'N'
    void AllPaymentCheckUpdate(StageRollDTO stageRollDTO);
    //(찬희)지급 순서 저장
    void paymentOrderSave(StageRollDTO stageRollDTO);
    //(찬희) member 정보 불러오기
    List<MemberVO> getMemberInfo(StageRollDTO dto);
    //(찬희) 방장 : 제일 최근 들어온 사람 정보
    Date getLatestStageInDate(StageINDTO dto);
    //(찬희) 방장 : 다음사람 pfMaster 업데이트
    void pfMasterUpdate(Map<String, Object> parameterMap);
   //(찬희) 방장 : 방장이 맞는지 확인하기 위해 정보 갖고오기
    String getPfMasterInfo(StageINDTO dto);
    //(찬희) 스테이지 출금 이력
    void stageWithdraw(StageRollDTO dto);
    //(찬희) 스테이지 입금 이력
    void depositHistoryInsert(StageRollDTO dto);
    //(찬희) 현재 *번째의 UTotalReceipts 정보 갖고오기
    int getUTotalReceipts(StageRollDTO stageRollDTO);
    //(찬희) 현재 *번째의 uNo 정보 갖고오기
    int getUNoForMyAccount(StageRollDTO stageRollDTO);

  // (지연)선택한 계모임 정보 가져오기
  HashMap<String, Object> getStageSelect(Integer pfID);

    // (지연)수령예정표 가져오기
    List<ReceiptDTO> getReceipt(BigDecimal pfRate);

    //(찬희) 나가는 사람이 마지막 사람이면 스테이지 삭제
    void stageDelete(StageINDTO dto);
}
