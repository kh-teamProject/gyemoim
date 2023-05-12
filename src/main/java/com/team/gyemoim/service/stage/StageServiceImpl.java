package com.team.gyemoim.service.stage;


import com.team.gyemoim.dto.StageListDTO;
import com.team.gyemoim.mapper.StageMapper;
import com.team.gyemoim.vo.PFVO;
import com.team.gyemoim.vo.ParticipationVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StageServiceImpl implements StageService {
  /*(유진) getPFList -> 전체버튼일때 리스트 전부 가져옴
          filterList -> deposit에 따라서 리스트 해당하는것만 가져옴
   */
  private final StageMapper stageMapper;
  @Override
  public List<StageListDTO> getPFList() {
    return stageMapper.getPFList();
  }

  @Override
  public List<StageListDTO> filterList(int deposit) {
    System.out.println("필터작동서비스");
    return stageMapper.filterList(deposit);}

//  (유진)수령순서가져오기
  @Override
  public List<ParticipationVO> getRecTurn() {
    return stageMapper.getRecTurn();}
}
