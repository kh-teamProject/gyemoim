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

//(현지) 스테이지 차트 조회
List<AdminStageDetailDTO> getStageChart();

//(유진) 스테이지 상세 조회
  List<AdminStageDetailDTO> getStageMemList(int pfID);

  //(유진) 스테이지 완료 처리
  void setStageComplete(int pfID);
}
