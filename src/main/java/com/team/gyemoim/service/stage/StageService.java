package com.team.gyemoim.service.stage;

import com.team.gyemoim.dto.stage.ImportDTO;
import com.team.gyemoim.dto.stage.StageCreateDTO;
import com.team.gyemoim.dto.stage.StageListDTO;
import com.team.gyemoim.dto.stage.StageParticipateDTO;
import com.team.gyemoim.vo.ParticipationVO;

import java.math.BigDecimal;
import java.util.List;

public interface StageService {
 /*(유진) getPFList -> 전체버튼일때 리스트 전부 가져옴
         filterList -> deposit에 따라서 리스트 해당하는것만 가져옴
  */
 List<StageListDTO> getPFList();
 List<StageListDTO> filterList(int deposit);

// (유진) 수령순서 가져오기
 List<ParticipationVO> getRecTurn();

  void stageCreate(StageCreateDTO stageCreateDTO);
  void stageParticipate(StageParticipateDTO stageParticipateDTO);

  int checkPfName(String pfName);
  List <ImportDTO> importGet(BigDecimal pfRate);


  //Read
  List <StageCreateDTO> stagePartIn1(String pfName);
  List <ImportDTO> stagePartIn2(String pfName);
}
