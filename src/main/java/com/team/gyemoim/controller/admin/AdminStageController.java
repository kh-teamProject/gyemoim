package com.team.gyemoim.controller.admin;

import com.team.gyemoim.service.admin.AdminStageDetailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
@RestController
@RequiredArgsConstructor
@Log4j2
public class AdminStageController {

    private final AdminStageDetailService adminStageDetailService;

// (현지)계모임 전체를 조회
@GetMapping("/admin/stage/detail")
@ResponseBody
public HashMap<String,Object> stage() {
    HashMap<String,Object> map = new HashMap<>();
    map.put("Stage",adminStageDetailService.getStageList());
    System.out.println("[컨트롤러] 스테이지 가져오기");
    return map;
}

}
