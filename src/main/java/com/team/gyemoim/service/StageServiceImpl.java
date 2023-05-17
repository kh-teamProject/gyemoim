package com.team.gyemoim.service;

import com.team.gyemoim.dto.*;
import com.team.gyemoim.mapper.StageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional
public class StageServiceImpl implements StageService {

  private final StageMapper stageMapper;


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
  public List<StageImportDTO> getImportList(Integer pfID) {
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

    //stageMapper.stageDeposit(dto);
  }


}
