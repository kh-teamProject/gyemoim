package com.team.gyemoim.controller;

import com.team.gyemoim.dto.stage.StageINDTO;
import com.team.gyemoim.dto.stage.StageRollDTO;
import com.team.gyemoim.service.StageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

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
        map.put("pf", stageService.getPfList(pfID));
        Integer myBalance = stageService.getMyAccount(dto);
        List<StageRollDTO> rollList = stageService.getRollList(dto);
        for (StageRollDTO rollDTO : rollList) {
            rollDTO.setMyBalance(myBalance);
        }
        map.put("roll", rollList);
        map.put("import", stageService.getImportList(pfID));
        map.put("memList", stageService.getMemList(pfID));

        return map;
    }

    // U
    //(찬희) stage 들어오기
    @PostMapping("/stageIn")
    public String stageIn(StageINDTO dto) {
        stageService.stageIn(dto); // roll 테이블에 uNo insert
        stageService.stageStart(dto); // 마지막 사람이 참여하면 pf(시작일, 종료일, 시작여부) update
        return "success";
    }
    //(찬희) stage 입금하기
    @PostMapping("/deposit")
    public String stageDeposit(StageRollDTO dto){
        log.info("deposit 컨트롤러" + dto);
        stageService.stageDeposit(dto);
        return "success";
    }

    // D
    //(찬희) stage 탈출하기
    @DeleteMapping("/stageOut")
    public String stageOut(StageINDTO dto) {
        stageService.stageOut(dto); // 버튼 누르면 roll_uNo:delete
        return "success";
    }
}

