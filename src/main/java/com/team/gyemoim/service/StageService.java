package com.team.gyemoim.service;

import com.team.gyemoim.dto.*;

import java.util.Date;
import java.util.List;

public interface StageService {
  //(찬희) 참여중인 Participation 정보 갖고오기
  List<StageParticipationDTO> getPartList(Integer pfID);
  //(찬희) 스테이지 PF 정보 갖고오기
  List<StagePfDTO> getPfList(Integer pfID);
  //(찬희) 개인 Roll 정보 갖고오기
  List<StageRollDTO> getRollList(StageRollDTO dto);
  //(찬희) 참여중인 Member 리스트 정보 갖고오기
  List<StageRollListDTO> getMemList(Integer pfID);
  //(찬희) 수령예정표 정보 갖고오기
  List<StageImportDTO> getImportList(Integer pfID);
  //(찬희)stageSelect페이지-> stage 참여할때
  void stageIn(StageINDTO dto);
  //(찬희)참가자 수가 다 차면 stage 시작
  void stageStart(StageINDTO dto);
  //(찬희)스테이지 나가기
  void stageOut(StageINDTO dto);

  Integer getMyAccount(StageRollDTO dto);
}
