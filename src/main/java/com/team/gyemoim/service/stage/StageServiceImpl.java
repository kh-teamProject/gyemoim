package com.team.gyemoim.service.stage;


import com.team.gyemoim.dto.stage.*;
import com.team.gyemoim.mapper.StageMapper;
import com.team.gyemoim.vo.MemberVO;
import com.team.gyemoim.vo.RollVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional
@EnableScheduling
@Component
public class StageServiceImpl implements StageService {
  /*(유진) getPFList -> 전체버튼일때 리스트 전부 가져옴
          getRoll -> roll 테이블 값 가져옴
          filterList -> deposit에 따라서 리스트 해당하는것만 가져옴
          recommend -> 입금액에 맞춰 무작위 추천
   */
  private final StageMapper stageMapper;
  private StageRollDTO stageRollDTO;
  @Override
  public List<StageListDTO> getPFList() {
    return stageMapper.getPFList();
  }

  @Override
  public List<RollDTO> getRoll() {
    return stageMapper.getRoll();
  }

  @Override
  public List<StageListDTO> filterList(int deposit) {
    return stageMapper.filterList(deposit);
  }

  @Override
  public List<StageListDTO> recommend(int uno) {
    return stageMapper.recommend(uno);
  }


  //(현지) <스테이지 생성> _스테이지 생성(PF)
  @Override
  public void stageCreate(StageCreateDTO stageCreateDTO) {
    stageMapper.stageCreate(stageCreateDTO);

  }

  // (현지)<스테이지생성>_참가 데이터(pfID,receiveTurn,pfMaster) 생성(ROLL)
  @Override
  public void stageParticipate(StageParticipateDTO stageParticipateDTO) {
    stageMapper.stageParticipate(stageParticipateDTO);
  }

  // (현지)<스테이지생성>_중복체크
  @Override
  public int checkPfName(String pfName) {
    return stageMapper.checkPfName(pfName);
  }

  //(현지)<스테이지생성>_스테이지 pfID 가져오기
  @Override
  public List<StageCreateDTO> stagePartIn1(String pfName) {
    return stageMapper.stagePartIn1(pfName);
  }

  // (현지)  <스테이지생성>_수령예정표
  @Override
  public List<ImportDTO> importGet(ImportDTO importDTO) {
    return stageMapper.importGet(importDTO);
  }

  //(현지)<스테이지생성>_스테이지 정보 가져오기
  @Override
  public List<ImportDTO> stagePartIn2(ImportDTO importDTO) {
    return stageMapper.stagePartIn2(importDTO);
  }

  //(찬희) 스테이지 PF 정보 갖고오기
  @Override
  public List<StagePfDTO> getPfList(Integer pfID) {
    return stageMapper.getPfList(pfID);
  }
  //(찬희) 개인 Roll 정보 갖고오기
  @Override
  public List<StageRollDTO> getRollList(StageRollDTO dto) {
    return stageMapper.getRollList(dto);
  }
  //(찬희)참여중인 MEMBER 리스트 정보 갖고오기
  @Override
  public List<StageRollListDTO> getMemList(Integer pfID) {
    return stageMapper.getMemList(pfID);
  }
  //(찬희)수령예정표 갖고오기
  @Override
  public List<StageReceiptDTO> getImportList(Integer pfID) {
    return stageMapper.getImportList(pfID);
  }
  //(찬희)stageSelect페이지-> stage 참여할때
  @Override
  public void stageIn(StageINDTO dto) {
    stageMapper.rollIn(dto); // Roll에 insert
  }
  //(찬희)참가자 수가 다 차면 stage 시작
  @Override
  public void stageStart(StageINDTO dto) {
    // roll에서 pfid=1일때의 uNo 수
    int uNoCount = stageMapper.RollUnoCount(dto);

    // PF의 pfEntry 값 조회
    int pfEntry = stageMapper.pfEntryValue(dto);
    if(uNoCount == pfEntry) {
      //진행상태 update
      stageMapper.stageStart(dto);
      //시작날짜 SYSDATE update
      stageMapper.startDateInsert(dto);

      //종료날짜 계산해서 넣기
      //1.시작날짜 갖고오기
      Date startDate = stageMapper.getStartDate(dto);
      //2.endDate : startDate + (entry)개월 계산
      Calendar calendar = Calendar.getInstance();
      calendar.setTime(startDate);
      calendar.add(Calendar.MONTH, pfEntry);
      Date endDate = calendar.getTime();
      //3.StageInDTO endDate 할당
      dto.setEndDate(endDate);
      // 3.endDate update
      stageMapper.endDateInsert(dto);
    }
  }
  //(찬희)스테이지 나가기
  public void stageOut(StageINDTO dto){
    //1. 삭제 전 pfMaster가 맞는지 확인해야 함
    String pfMaster = stageMapper.getPfMasterInfo(dto);
    //2.  roll 테이블 uNo 삭제
    stageMapper.rollDelete(dto);
    //3. 나가는 사람이 방장이면 다음사람에게 방장을 넘겨주기
    if (pfMaster != null) {
      Date latestRollDate = stageMapper.getLatestStageInDate(dto);
      if(latestRollDate == null){
        //마지막 사람이면 stage삭제
        stageMapper.stageDelete(dto);
      }else {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("stageInDate", latestRollDate);
        parameterMap.put("pfMaster", "M");
        stageMapper.pfMasterUpdate(parameterMap);
      }
    }
  }
  //(찬희) 스테이지 my계좌 정보 불러오기
  @Override
  public Integer getMyAccount(StageRollDTO dto) {
    return stageMapper.getMyAccount(dto);
  }
  //(찬희) 스테이지 입금하기
  @Override
  public void stageDeposit(StageRollDTO dto) {
    //1. 계좌잔액 업데이트 -> uPayment 금액을 insert
    stageMapper.stageBalanceUpdate(dto);
    //2. my계좌 잔액 -> 현금액 - uPayment
    stageMapper.myAccountUPaymentUpdate(dto);
    //3. 계좌이력도 남겨야 함 (출금 insert)
    stageMapper.stageWithdraw(dto);
    //4. 입금 횟수 mapper.xml에서 +1
    stageMapper.depositCntPlus(dto);
    //5. 입금 누적 금액 update
    stageMapper.stageAmountUpdate(dto);
    //6. 입금식별 -> update
    stageMapper.stagePaymentCheckUpdate(dto);
    //7. 현재 dto를 저장
    // 전원이 다 입금하면 조건문 걸기
    //(현재 paymentOrder 값 조회)
    this.stageRollDTO = dto;
    this.stageRollDTO.setPaymentOrder(stageMapper.getPaymentOrderValue(stageRollDTO));




  }
  //(찬희). 스테이지 금액 -> my계좌로 순서에 맞게 update / 자동으로 곗돈 지급
  @Override
  @Scheduled(cron = "0 06 21 20 * ?") // 매달 25일 0시 0분 0초에 실행
  public void performUpdate() {
    if( stageRollDTO != null) {
      int currentStageBalance = stageMapper.getStageBalance(stageRollDTO);
      int stageDeposit = stageMapper.getStageDeposit(stageRollDTO);
      int uTotalReceipts = stageMapper.getUTotalReceipts(stageRollDTO);
      int uNo = stageMapper.getUNoForMyAccount(stageRollDTO);

      //dto에 정보저장
      stageRollDTO.setUTotalReceipts(uTotalReceipts);
      stageRollDTO.setUNo(uNo);
      // stageBalance >= deposit : stageBalance -> uPayment 이동
      if (currentStageBalance >= stageDeposit) {
        //1. 스테이지(pf) stageBalance - *번의 uPayment
        stageMapper.stageBalanceMinus(stageRollDTO);
        //2. *번의 계좌(myAccount)의 uPayment + stageBalance
        stageMapper.stagePaymentOrder(stageRollDTO);
        //3. 지급순서 올리기
        stageMapper.paymentOrderSave(stageRollDTO);
        //4. 전원 입금식별자 'Y' -> 'N'
        stageMapper.AllPaymentCheckUpdate(stageRollDTO);
        //5. 계좌이력 남기기(입금)
        stageMapper.depositHistoryInsert(stageRollDTO);
      }
    }
  }
  //(찬희) 수익보고서 member 정보 불러오기
  @Override
  public List<MemberVO> getMemberInfo(StageRollDTO dto) {
    return stageMapper.getMemberInfo(dto);
  }


  //(지연)선택한 계모임 정보 가져오기, 스테이지에 관한 pfInfo
  @Override
  public List<StageSelectDTO> getPfInfo(Integer pfID) { return stageMapper.getPfInfo(pfID);}

  //(지연)계모임 장 Roll 가져오기
  @Override
  public List<RollDTO> getStageSelectRoll(RollDTO dto) {return stageMapper.getStageSelectRoll(dto);}

  // (지연)수령예정표 가져오기
  @Override
  public List<PfDTO> getReceipt(Integer pfID) {
    return stageMapper.getReceipt(pfID);
  }

  // (지연)참여 순번 가져오기
  public List<PartiListDTO> getParti(PartiListDTO dto) {
    return stageMapper.getParti(dto);
  }

  //(지연)참여 순번 가져오기
  public List<RollVO> getPartRoll(RollVO vo) { return stageMapper.getPartRoll(vo);}

  //(지연)참여 순번 가져오기
  public List<PartiListDTO> getTurnRoll(PartiListDTO dto) { return stageMapper.getTurnRoll(dto);}
}
