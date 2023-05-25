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
    @Override
    public List<AdminStageDetailDTO> getStageList() {
        System.out.println("[서비스] 스테이지 가져오기");
        return adminStageDetailMapper.getStageList();
    }
}
