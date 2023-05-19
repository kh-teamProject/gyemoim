package com.team.gyemoim.service.stage;

import com.team.gyemoim.dto.stage.StageListDTO;
import com.team.gyemoim.vo.RollVO;

import java.util.List;

public interface StageService {
 /*(유진) getPFList -> 전체버튼일때 리스트 전부 가져옴
         filterList -> deposit에 따라서 리스트 해당하는것만 가져옴
  */
 List<StageListDTO> getPFList();
 List<StageListDTO> filterList(int deposit);

// (유진) 수령순서 가져오기
 List<RollVO> getRecTurn();
}
