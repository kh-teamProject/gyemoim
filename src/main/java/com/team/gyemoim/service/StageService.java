package com.team.gyemoim.service;

import com.team.gyemoim.dto.stage.ImportDTO;
import com.team.gyemoim.dto.stage.StageCreateDTO;
import com.team.gyemoim.dto.stage.StageParticipateDTO;

import java.math.BigDecimal;
import java.util.List;

public interface StageService {
    void stageCreate(StageCreateDTO stageCreateDTO);
    void stageParticipate(StageParticipateDTO stageParticipateDTO);

    int checkPfName(String pfName);
    List <ImportDTO> importGet(BigDecimal pfRate);


    //Read
    List <StageCreateDTO> stagePartIn1(String pfName);
    List <ImportDTO> stagePartIn2(String pfName);

}
