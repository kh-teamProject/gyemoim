package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.stage.StageListDTO;
import com.team.gyemoim.dto.stage.ImportDTO;
import com.team.gyemoim.dto.stage.StageCreateDTO;
import com.team.gyemoim.dto.stage.StageParticipateDTO;
import com.team.gyemoim.vo.ParticipationVO;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
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

}
