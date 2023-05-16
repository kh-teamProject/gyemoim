package com.team.gyemoim.service;

import com.team.gyemoim.dto.ImportDTO;
import com.team.gyemoim.dto.StageCreateDTO;
import com.team.gyemoim.dto.StageParticipateDTO;

import java.util.List;

public interface StageCreateService {
    void stageCreate(StageCreateDTO stageCreateDTO);
    void stageParticipate(StageParticipateDTO stageParticipateDTO);
    List <ImportDTO> importGet(double pfRate);

    //Read
    List <StageCreateDTO> stagePartIn1(String pfName);
    List <ImportDTO> stagePartIn2(String pfName);

}
