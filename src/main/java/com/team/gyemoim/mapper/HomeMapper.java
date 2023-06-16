package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.HomeListDTO;
import com.team.gyemoim.dto.HomeNoticeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HomeMapper {
    List<HomeListDTO> getPfHomeList();
    List<HomeListDTO> getPfRollList();
    Integer getAllPfList();

    Integer getAllWaitingPfList();

    Integer getAllPartPfList();

    Integer getAllCompletePfList();

    List<HomeNoticeDTO> getNoticeHomeList();
}
