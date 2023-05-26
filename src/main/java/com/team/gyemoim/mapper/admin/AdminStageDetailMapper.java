package com.team.gyemoim.mapper.admin;

import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminStageDetailMapper {

    //(현지) 계모임 리스트 조회
    List<AdminStageDetailDTO> getStageList();
    //(현지) 계모임 상세정보 조회(pf테이블)
    List<AdminStageDetailDTO> getStageListDetail1(Integer pfID);
    //(현지) 계모임 상세정보 조회(roll테이블)
    List<AdminStageDetailDTO> getStageListDetail2(Integer pfID);

}
