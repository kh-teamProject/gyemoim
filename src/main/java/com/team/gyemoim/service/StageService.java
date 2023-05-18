package com.team.gyemoim.service;

import com.team.gyemoim.dto.stage.*;

import java.util.List;

public interface StageService {
  //(찬희) 스테이지 PF 정보 갖고오기
  List<StagePfDTO> getPfList(Integer pfID);
  //(찬희) 개인 Roll 정보 갖고오기
  List<StageRollDTO> getRollList(StageRollDTO dto);
  //(찬희) 참여중인 Member 리스트 정보 갖고오기
  List<StageRollListDTO> getMemList(Integer pfID);
  //(찬희) 수령예정표 정보 갖고오기
  List<StageReceiptDTO> getImportList(Integer pfID);
  //(찬희)stageSelect페이지-> stage 참여할때
  void stageIn(StageINDTO dto);
  //(찬희)참가자 수가 다 차면 stage 시작
  void stageStart(StageINDTO dto);
  //(찬희)스테이지 나가기
  void stageOut(StageINDTO dto);
  //(찬희) 스테이지 my계좌 정보 불러오기
  Integer getMyAccount(StageRollDTO dto);
  //(찬희) 스테이지 입금하기
  void stageDeposit(StageRollDTO dto);
  //(찬희) 자동으로 곗돈 수령
  void performUpdate();
}
