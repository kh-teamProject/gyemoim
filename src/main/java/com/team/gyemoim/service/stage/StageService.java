package com.team.gyemoim.service.stage;


import com.team.gyemoim.dto.stage.RollDTO;
import com.team.gyemoim.dto.stage.StageListDTO;

import com.team.gyemoim.dto.stage.*;

import com.team.gyemoim.vo.MemberVO;
import com.team.gyemoim.vo.RollVO;


import java.util.List;



public interface StageService {
 /*(유진) getPFList -> 전체버튼일때 리스트 전부 가져옴
         getRollList -> 참여인원 가지고 옴.
         filterList -> deposit에 따라서 리스트 해당하는것만 가져옴
         recommend -> 입금액에 맞춰 무작위 추천
  */
 List<StageListDTO> getPFList();
 List<RollDTO> getRoll();
 List<StageListDTO> filterList(int deposit);
 List<StageListDTO> recommend(int uno);


 //(현지) <스테이지 생성> _스테이지 생성(PF)
  void stageCreate(StageCreateDTO stageCreateDTO);
 // (현지)<스테이지생성>_참가 데이터(pfID,receiveTurn,pfMaster) 생성(ROLL)
  void stageParticipate(StageParticipateDTO stageParticipateDTO);
 // (현지)<스테이지생성>_중복체크
  int checkPfName(String pfName);
 // (현지)  <스테이지생성>_수령예정표
  List <ImportDTO> importGet(ImportDTO importDTO);

  //Read
  //(현지)<스테이지생성>_스테이지 pfID 가져오기
  List <StageCreateDTO> stagePartIn1(String pfName);
 //(현지)<스테이지생성>_스테이지 정보 가져오기
  List <ImportDTO> stagePartIn2(ImportDTO importDTO);


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
 //(찬희) 자동으로 곗돈 지급
 void performUpdate();

 //(찬희) 수익보고서 user 정보 갖고오기
 List<MemberVO> getMemberInfo(StageRollDTO dto);


 //(지연)선택한 계모임 정보 가져오기, 스테이지에 관한 pfInfo
 List<StageSelectDTO> getPfInfo(Integer pfID);

 //(지연)개인 Roll 정보 갖고오기
 List<RollDTO> getStageSelectRoll(RollDTO dto);

 // (지연)수령예정표 가져오기
 List<PfDTO> getReceipt(Integer pfID);

// (지연)참여 순번 가져오기
List<PartiListDTO> getParti(PartiListDTO dto);

 // (지연)참여 순번 가져오기
List<RollVO> getPartRoll(RollVO vo);

 // (지연)참여 순번 가져오기
List<PartiListDTO> getTurnRoll(PartiListDTO dto);

}

