package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.stage.StageListDTO;
import com.team.gyemoim.dto.stage.ImportDTO;
import com.team.gyemoim.dto.stage.StageCreateDTO;
import com.team.gyemoim.dto.stage.StageParticipateDTO;
import com.team.gyemoim.vo.ParticipationVO;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import com.team.gyemoim.dto.stage.*;

import java.util.Date;
import java.util.List;

@Mapper
public interface StageMapper {
  /*(유진) getPFList -> 전체버튼일때 리스트 전부 가져옴
         filterList -> deposit에 따라서 리스트 해당하는것만 가져옴 */
  List<StageListDTO> getPFList();
  
  List<StageListDTO> filterList(int deposit);

// (유진) 수령순서 가져오기.
  List<ParticipationVO> getRecTurn();
  // (현지)
    void stageCreate(StageCreateDTO stageCreateDTO);
    // (현지)
    void stageParticipate(StageParticipateDTO stageParticipateDTO);
  // (현지)
    int checkPfName(String pfName);
  // (현지)
    List<ImportDTO> importGet(BigDecimal pfRate);
  // (현지)
    List<StageCreateDTO> stagePartIn1(String pfName);
    // (현지)
    List<ImportDTO> stagePartIn2(String pfName);
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
    //(찬희) 현재 pf의 지급순서 조회
    int getPaymentOrderValue(StageRollDTO dto);

}
