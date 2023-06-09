package com.team.gyemoim.service.admin;

import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import com.team.gyemoim.mapper.admin.AdminStageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor //생성자를 자동으로 생성해주는 어노테이션
public class AdminStageServiceImpl implements AdminStageService{

  //(현지) 계모임 리스트 조회
  @Override
  public List<AdminStageDetailDTO> getStageList() {

    return adminStageMapper.getStageList();
  }

//(현지) 스테이지 리스트 상태 업데이트
  @Override
  public Integer checkPFID(Integer pfID) {
    return adminStageMapper.updateStatus(pfID);
  }

  //(현지) PF 데이터 가져와서 차트 보내기
  @Override
  public List<AdminStageDetailDTO> getStageChart() {

    return adminStageMapper.getStageChart();
  }

  //(유진) 스테이지 참여 회원정보 가져오기

  private final AdminStageMapper adminStageMapper;
  @Override
  public List<AdminStageDetailDTO> getStageMemList(int pfID) {
    return adminStageMapper.getStageMemList(pfID);
  }
//(유진)스테이지 상태 업데이트
  @Override
  public void setStageComplete(int pfID) {
    adminStageMapper.setStageComplete(pfID);
  }
}
