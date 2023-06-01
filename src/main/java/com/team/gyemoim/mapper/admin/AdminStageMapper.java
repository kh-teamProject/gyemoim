package com.team.gyemoim.mapper.admin;

import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminStageMapper {

  //(현지) 계모임 리스트 조회
  List<AdminStageDetailDTO> getStageList();

  List<AdminStageDetailDTO> getStageMemList(int pfID);
}
