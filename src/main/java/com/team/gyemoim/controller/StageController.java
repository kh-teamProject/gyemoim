package com.team.gyemoim.controller;

import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.dto.StageINDTO;
import com.team.gyemoim.dto.StageParticipationDTO;
import com.team.gyemoim.dto.StageRollDTO;
import com.team.gyemoim.service.StageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@Log4j2
public class StageController {
    private final StageService stageService;
    //C


    // R
    //(찬희) stage 컨트롤러
    @GetMapping("/stage")
    @ResponseBody
    public HashMap<String, Object> stage(@RequestParam Integer pfID, StageRollDTO dto) {
        log.info("*******찬희 컨트롤러");
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("participation", stageService.getPartList(pfID));
        map.put("pf", stageService.getPfList(pfID));
        map.put("roll", stageService.getRollList(dto));
        map.put("import", stageService.getImportList(pfID));
        map.put("memList", stageService.getMemList(pfID));
        log.info(stageService.getRollList(dto));
        return map;
    }

    // U
    //(찬희) stage 들어오기
    @PostMapping("/stageIn")
    public String stageIn(StageINDTO dto) {
        System.out.println("**********stageIn" + dto);
        stageService.stageIn(dto); // part(수령순서)에 uNo update
        stageService.stageStart(dto); // 마지막 사람이 참여하면 pf(시작일, 종료일, 시작여부) update
        return "success";
    }

    // D
    //(찬희) stage 탈출하기
    @PostMapping("/stageOut")
    public String stageOut(StageINDTO dto) {
        System.out.println("**********stageOut" + dto);
        return "success";
    }
}
