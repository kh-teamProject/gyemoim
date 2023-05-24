package com.team.gyemoim.controller.admin;


import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import com.team.gyemoim.service.admin.AdminStageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
public class AdminStageController {
  private final AdminStageService adminStageService;
  //유진
  @GetMapping("/admin/stage/detail")
  @ResponseBody
    public List<AdminStageDetailDTO> getStageMemList(@RequestParam("pfID") int pfID){
      System.out.println("관리자 스테이지 상세" +pfID);
      return adminStageService.getStageMemList(pfID);
    }
  }


