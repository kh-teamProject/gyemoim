package com.team.gyemoim.service.admin;

import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import com.team.gyemoim.mapper.admin.AdminStageDetailMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
@Component
public class AdminStageDetailServiceImpl implements AdminStageDetailService {

   private final AdminStageDetailMapper adminStageDetailMapper;

    //(현지) 계모임 리스트 조회
   @Override
    public List<AdminStageDetailDTO> getStageList() {
        System.out.println("[서비스] 스테이지 가져오기");
        return adminStageDetailMapper.getStageList();
    }
    //(현지) 계모임 상세정보 조회(pf테이블)
    @Override
    public List<AdminStageDetailDTO> getStageListDetail1(Integer pfID) {
        System.out.println("[서비스] 스테이지 디테일 가져오기");
        return adminStageDetailMapper.getStageListDetail1(pfID);
    }
    //(현지) 계모임 상세정보 조회(roll테이블)
    @Override
    public List<AdminStageDetailDTO> getStageListDetail2(Integer pfID) {
        System.out.println("[서비스] 스테이지 디테일 가져오기");
        return adminStageDetailMapper.getStageListDetail2(pfID);
    }


}
