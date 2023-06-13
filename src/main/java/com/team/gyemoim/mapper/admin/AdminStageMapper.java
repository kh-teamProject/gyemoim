package com.team.gyemoim.mapper.admin;

import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminStageMapper {

  //(현지) 계모임 리스트 조회
  List<AdminStageDetailDTO> getStageList();

  //(현지) 스테이지 리스트 상태 업데이트

Integer updateStatus(Integer pfID);

  List<AdminStageDetailDTO> getStageMemList(int pfID);
}
