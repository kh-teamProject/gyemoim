package com.team.gyemoim.service.stage;


import com.team.gyemoim.dto.stage.*;
import com.team.gyemoim.mapper.StageMapper;
import com.team.gyemoim.vo.ParticipationVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional
@EnableScheduling
@Component
public class StageServiceImpl implements StageService {
  /*(유진) getPFList -> 전체버튼일때 리스트 전부 가져옴
          filterList -> deposit에 따라서 리스트 해당하는것만 가져옴
   */
  private final StageMapper stageMapper;
  private StageRollDTO stageRollDTO;
  @Override
  public List<StageListDTO> getPFList() {
    return stageMapper.getPFList();
  }

  @Override
  public List<StageListDTO> filterList(int deposit) {
    System.out.println("필터작동서비스");
    return stageMapper.filterList(deposit);
  }

//  (유진)수령순서가져오기
  @Override
  public List<ParticipationVO> getRecTurn() {
    return stageMapper.getRecTurn();
  }

  @Override
  public void stageCreate(StageCreateDTO stageCreateDTO) {
    System.out.println("[서비스] 스테이지 생성 ");
    stageMapper.stageCreate(stageCreateDTO);

  }

  @Override
  public void stageParticipate(StageParticipateDTO stageParticipateDTO) {
    System.out.println("[서비스] 스테이지 참가 ");
    stageMapper.stageParticipate(stageParticipateDTO);
  }

  @Override
  public int checkPfName(String pfName) {
    System.out.println("[서비스] 스테이지 이름 중복체크 ");
    return stageMapper.checkPfName(pfName);
  }

  @Override
  public List<ImportDTO> importGet(ImportDTO importDTO) {
    System.out.println("[서비스] 수령예정표 가져오기");
    return stageMapper.importGet(importDTO);
  }

  @Override
  public List<StageCreateDTO> stagePartIn1(String pfName) {
    System.out.println("[서비스] 참가스테이지 번호 가져오기");
    return stageMapper.stagePartIn1(pfName);
  }

  @Override
  public List<ImportDTO> stagePartIn2(String pfName) {
    System.out.println("[서비스] 참가스테이지 정보 가져오기");
    return stageMapper.stagePartIn2(pfName);
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
    stageMapper.rollDelete(dto); // roll 테이블 uNo 삭제
  }
  //(찬희) 스테이지 my계좌 정보 불러오기
  @Override
  public Integer getMyAccount(StageRollDTO dto) {
    return stageMapper.getMyAccount(dto);
  }
  //(찬희) 스테이지 입금하기
  @Override
  public void stageDeposit(StageRollDTO dto) {
    log.info("+++++++++++++++++서비스" + dto);
    //1. 계좌잔액 업데이트 -> uPayment 금액을 insert
    stageMapper.stageBalanceUpdate(dto);
    //2. my계좌 잔액 -> 현금액 - uPayment
    stageMapper.myAccountUPaymentUpdate(dto);
    //3. 계좌이력도 남겨야 함
    //4. 입금 횟수 mapper.xml에서 +1
    stageMapper.depositCntPlus(dto);
    //5. 입금 누적 금액 update
    stageMapper.stageAmountUpdate(dto);
    //6. 입금식별 -> update
    stageMapper.stagePaymentCheckUpdate(dto);
    //7. 현재 dto를 저장
    //(현재 paymentOrder 값 조회)
    this.stageRollDTO = dto;
    this.stageRollDTO.setPaymentOrder(stageMapper.getPaymentOrderValue(stageRollDTO));
  }
  //(찬희). 스테이지 금액 -> my계좌로 순서에 맞게 update
  @Override
  @Scheduled(cron = "0 08 17 18 * ?") // 매달 25일 0시 0분 0초에 실행
  public void performUpdate() {
    log.info("제발 실행이 되어주세요 플리즈" + stageRollDTO);
    if( stageRollDTO != null) {
      int currentStageBalance = stageMapper.getStageBalance(stageRollDTO);
      int stageDeposit = stageMapper.getStageDeposit(stageRollDTO);
      // stageBalance >= deposit : stageBalance -> uPayment 이동

      if (currentStageBalance >= stageDeposit) {
        //stageBalance - *번의 uPayment
        stageMapper.stageBalanceMinus(stageRollDTO);
        //*번의 uPayment + stageBalance
        stageMapper.stagePaymentOrder(stageRollDTO);
        // 지급순서 올리기 if(pfEntry >= paymentOrder)

      }
    }
  }
}
