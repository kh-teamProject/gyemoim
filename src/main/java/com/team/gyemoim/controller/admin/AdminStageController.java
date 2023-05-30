package com.team.gyemoim.controller.admin;


import com.team.gyemoim.service.admin.AdminStageDetailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


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


    private final AdminStageDetailService adminStageDetailService;

// (현지)계모임 리스트 조회
@GetMapping("/admin/stage/list")
@ResponseBody
public HashMap<String,Object> stage() {
    HashMap<String,Object> map = new HashMap<>();
    map.put("Stage",adminStageDetailService.getStageList());
    System.out.println("[컨트롤러] 스테이지 가져오기");
    return map;
}

// (현지)계모임 기본 정보조회
@GetMapping("/admin/stage/detail")
@ResponseBody
public HashMap<String, Object> stageDetail1(@RequestParam Integer pfID) {
    HashMap<String, Object> map = new HashMap<>();
    map.put("StageDetail1", adminStageDetailService.getStageListDetail1(pfID));
    map.put("StageDetail2", adminStageDetailService.getStageListDetail2(pfID));
    System.out.println("[컨트롤러] 스테이지  정보 가져오기" + adminStageDetailService.getStageListDetail2(pfID));
    return map;
}




  private final AdminStageService adminStageService;
  //유진
  @GetMapping("/admin/stage/detail1")
  @ResponseBody
    public List<AdminStageDetailDTO> getStageMemList(@RequestParam("pfID") int pfID){
      System.out.println("관리자 스테이지 상세" +pfID);
      return adminStageService.getStageMemList(pfID);
    }
  }


