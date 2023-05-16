package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.ImportDTO;
import com.team.gyemoim.dto.StageCreateDTO;
import com.team.gyemoim.dto.StageParticipateDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StageCreateMapper {
    void stageCreate(StageCreateDTO stageCreateDTO);
    void stageParticipate(StageParticipateDTO stageParticipateDTO);
    List<ImportDTO> importGet(double pfRate);

    List<StageCreateDTO> stagePartIn1(String pfName);
    List<ImportDTO> stagePartIn2(String pfName);

}
