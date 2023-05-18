package com.team.gyemoim.service.stage;


import com.team.gyemoim.dto.stage.ImportDTO;
import com.team.gyemoim.dto.stage.StageCreateDTO;
import com.team.gyemoim.dto.stage.StageListDTO;
import com.team.gyemoim.dto.stage.StageParticipateDTO;
import com.team.gyemoim.mapper.StageMapper;
import com.team.gyemoim.vo.ParticipationVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
  public List<ImportDTO> importGet(BigDecimal pfRate) {
    System.out.println("[서비스] 수령예정표 가져오기");
    return stageMapper.importGet(pfRate);
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
}
