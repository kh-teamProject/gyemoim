package com.team.gyemoim.service.admin;

import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import com.team.gyemoim.mapper.admin.AdminStageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor //생성자를 자동으로 생성해주는 어노테이션
public class AdminStageServiceImpl implements AdminStageService{
//(유진) 스테이지 참여 회원정보 가져오기

  private final AdminStageMapper adminStageMapper;
  @Override
  public List<AdminStageDetailDTO> getStageMemList(int pfID) {
    System.out.println("관리자 스테이지 서빗스");
    return adminStageMapper.getStageMemList(pfID);
  }
//(유진)스테이지 상태 업데이트
  @Override
  public void setStageComplete(int pfID) {
    System.out.println("관리자 스테이지 상태 서비스");
    adminStageMapper.setStageComplete(pfID);
  }
}
