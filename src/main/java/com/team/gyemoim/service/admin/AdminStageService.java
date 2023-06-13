package com.team.gyemoim.service.admin;

import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import java.util.List;

public interface AdminStageService {
  //(유진) 스테이지 참여회원 정보 가져오기
  List<AdminStageDetailDTO> getStageMemList(int pfID);

  //(현지) 스테이지 리스트 가져오기
  List<AdminStageDetailDTO> getStageList();

  //(현지) 스테이지 리스트 상태 업데이트
  Integer checkPFID(Integer pfID);

}
