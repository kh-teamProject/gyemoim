package com.team.gyemoim.service;

import com.team.gyemoim.dto.ImportDTO;
import com.team.gyemoim.dto.StageCreateDTO;
import com.team.gyemoim.dto.StageParticipateDTO;
import com.team.gyemoim.mapper.StageCreateMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StageCreateServiceImpl implements StageCreateService {

    private final StageCreateMapper stageCreateMapper;

    @Override
    public void stageCreate(StageCreateDTO stageCreateDTO) {
        System.out.println("[서비스] 스테이지 생성 ");
        stageCreateMapper.stageCreate(stageCreateDTO);

    }

    @Override
    public void stageParticipate(StageParticipateDTO stageParticipateDTO) {
        System.out.println("[서비스] 스테이지 참가 ");
        stageCreateMapper.stageParticipate(stageParticipateDTO);
    }

    @Override
    public List<ImportDTO> importGet(double pfRate) {
        System.out.println("[서비스] 수령예정표 가져오기");
        return stageCreateMapper.importGet(pfRate);
    }

    @Override
    public List<StageCreateDTO> stagePartIn1(String pfName) {
        System.out.println("[서비스] 참가스테이지 번호 가져오기");
        return stageCreateMapper.stagePartIn1(pfName);
    }

    @Override
    public List<ImportDTO> stagePartIn2(String pfName) {
        System.out.println("[서비스] 참가스테이지 정보 가져오기");
        return stageCreateMapper.stagePartIn2(pfName);
    }

}