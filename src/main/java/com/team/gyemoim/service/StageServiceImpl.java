package com.team.gyemoim.service;

import com.team.gyemoim.dto.stage.ImportDTO;
import com.team.gyemoim.dto.stage.StageCreateDTO;
import com.team.gyemoim.dto.stage.StageParticipateDTO;
import com.team.gyemoim.mapper.StageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StageServiceImpl implements StageService {

    private final StageMapper stageMapper;

    @Override
    public void stageCreate(StageCreateDTO stageCreateDTO) {
        System.out.println("[서비스] 스테이지 생성 ");
        stageMapper.stageCreate(stageCreateDTO);

    }

    @Override
    public void stageParticipate(StageParticipateDTO stageParticipateDTO) {
        System.out.println("[서비스] 스테이지 참가 ");
        stageMapper.stageParticipate(stageParticipateDTO);
    }

    @Override
    public int checkPfName(String pfName) {
        System.out.println("[서비스] 스테이지 이름 중복체크 ");
        return stageMapper.checkPfName(pfName);
    }

    @Override
    public List<ImportDTO> importGet(BigDecimal pfRate) {
        System.out.println("[서비스] 수령예정표 가져오기");
        return stageMapper.importGet(pfRate);
    }

    @Override
    public List<StageCreateDTO> stagePartIn1(String pfName) {
        System.out.println("[서비스] 참가스테이지 번호 가져오기");
        return stageMapper.stagePartIn1(pfName);
    }

    @Override
    public List<ImportDTO> stagePartIn2(String pfName) {
        System.out.println("[서비스] 참가스테이지 정보 가져오기");
        return stageMapper.stagePartIn2(pfName);
    }

}