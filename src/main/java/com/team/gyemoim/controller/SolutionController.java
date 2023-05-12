package com.team.gyemoim.controller;

import com.team.gyemoim.dto.StageListDTO;
import com.team.gyemoim.service.stage.StageService;
import com.team.gyemoim.vo.PFVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SolutionController {
  //C
  //R
  private final StageService stageService;

  @GetMapping("/stage") // (유진)계모임 전체를 조회할 수 있음.
  @ResponseBody
  public HashMap<String,Object> stage() {
    HashMap<String,Object> map = new HashMap<>();
    map.put("PF",stageService.getPFList());
//    map.put("Participation",stageService.getRecTurn());
    System.out.println("참가테이블 잘 들어가나욘");
    return map;
  }
  @GetMapping("/filter") // (유진)버튼 선택시 특정 약정금의 계모임만 조회할 수 있음.
  public List<StageListDTO> filterList(@RequestParam("deposit") int deposit){
    System.out.println("필터작동컨트롤러");
    return stageService.filterList(deposit);
  }
  //U
  //D
}
