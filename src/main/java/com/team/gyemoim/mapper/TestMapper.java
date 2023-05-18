package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.stage.StageListDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {

  List<StageListDTO> getTestList(int pfID);
}
