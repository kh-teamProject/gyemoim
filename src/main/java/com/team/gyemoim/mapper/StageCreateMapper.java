package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.stage.ImportDTO;
import com.team.gyemoim.dto.stage.StageCreateDTO;
import com.team.gyemoim.dto.stage.StageParticipateDTO;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

@Mapper
public interface StageCreateMapper {
    void stageCreate(StageCreateDTO stageCreateDTO);
    void stageParticipate(StageParticipateDTO stageParticipateDTO);

    int checkPfName(String pfName);

    List<ImportDTO> importGet(BigDecimal pfRate);

    List<StageCreateDTO> stagePartIn1(String pfName);
    List<ImportDTO> stagePartIn2(String pfName);

}
