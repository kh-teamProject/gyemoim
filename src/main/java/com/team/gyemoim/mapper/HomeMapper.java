package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.HomeListDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HomeMapper {
    List<HomeListDTO> getPfHomeList();
    List<HomeListDTO> getPfRollList();
}
