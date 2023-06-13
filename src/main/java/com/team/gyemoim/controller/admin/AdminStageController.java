package com.team.gyemoim.controller.admin;



import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


import java.util.HashMap;


import com.team.gyemoim.dto.admin.AdminStageDetailDTO;
import com.team.gyemoim.service.admin.AdminStageService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;


@RestController
@RequiredArgsConstructor
@Log4j2
public class AdminStageController {

    private final AdminStageService adminStageService;

// (현지)계모임 리스트 조회
@GetMapping("/admin/stage/list")
@ResponseBody
public HashMap<String,Object> stage() {
    HashMap<String,Object> map = new HashMap<>();
    map.put("Stage",adminStageService.getStageList());
    System.out.println("[컨트롤러] 스테이지 가져오기");
    return map;
}

    // (현지)리스트 상태 바꾸기
    @PostMapping(value = "/admin/stage/list")
    public Integer checkPFID3(@RequestParam("pfID") Integer pfID) {
        System.out.println("[컨트롤러] pfID 확인 " + pfID);
        return adminStageService.checkPFID(pfID);
    }

    //유진
  @GetMapping("/admin/stage/detail1")
  @ResponseBody
    public List<AdminStageDetailDTO> getStageMemList(@RequestParam("pfID") int pfID){
      System.out.println("관리자 스테이지 상세" +pfID);
      return adminStageService.getStageMemList(pfID);
    }
  }


