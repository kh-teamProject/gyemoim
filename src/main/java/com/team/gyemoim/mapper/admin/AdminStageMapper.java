package com.team.gyemoim.mapper.admin;

import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminStageMapper {

  List<AdminStageDetailDTO> getStageMemList(int pfID);

  void setStageComplete(int pfID);
}
