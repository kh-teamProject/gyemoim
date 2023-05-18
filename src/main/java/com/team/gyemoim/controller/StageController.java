package com.team.gyemoim.controller;

import com.team.gyemoim.dto.stage.StageListDTO;
import com.team.gyemoim.dto.stage.ImportDTO;
import com.team.gyemoim.dto.stage.StageCreateDTO;
import com.team.gyemoim.dto.stage.StageParticipateDTO;
import com.team.gyemoim.service.stage.StageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
public class StageController {

    private final StageService stageService;

  //C
    //(현지) <스테이지 생성> _스테이지 생성(PF)
    @PostMapping(value ="/stageCreate")
    public void stageCreate(StageCreateDTO stageCreateDTO,StageParticipateDTO stageParticipateDTO,ImportDTO importDTO) throws Exception{
        System.out.println("[컨트롤러] 스테이지 생성 ");
        stageService.stageCreate(stageCreateDTO);
        stageService.stageParticipate(stageParticipateDTO);


    }
  
    // (현지)<스테이지생성>_참가 데이터(pfID,receiveTurn,pfMaster) 생성(ROLL)
    @PostMapping(value ="/stageAgree")
    public void stageCreate(StageParticipateDTO stageParticipateDTO) throws Exception{
        System.out.println("[컨트롤러] 스테이지 생성 ");
        stageService.stageParticipate(stageParticipateDTO);
    }
  
  //R

  @GetMapping("/stagelist") // (유진)계모임 전체를 조회할 수 있음.
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
  
    // (현지)<스테이지생성>_중복체크
    @PostMapping(value ="/checkPfName")
    public boolean checkPfName(@RequestParam("pfName") String pfName) {
         System.out.println("[컨트롤러] 중복체크 " + pfName);
         int count = stageService.checkPfName(pfName);
        System.out.println("[컨트롤러] 중복체크 count " + count);
        return count>0;
    }
  
    //(현지)<스테이지생성>_스테이지 pfID 가져오기
    @GetMapping(value ="/stageAgree")
    public List<StageCreateDTO> stagePartIn1(@RequestParam("name") String pfName){
        return stageService.stagePartIn1(pfName);
    }
  
    //(현지)<스테이지생성>_스테이지 정보 가져오기
    @GetMapping(value ="/stageAgree2")
    public List<ImportDTO> stagePartIn2(@RequestParam("name") String pfName){
        return stageService.stagePartIn2(pfName);
    }
  
      //(현지) <스테이지생성>_수령예정표
    @GetMapping(value ="/stageCreate")

    public List<ImportDTO> importTableGet(@RequestParam BigDecimal pfRate){
        return stageService.importGet(pfRate);
    }
  
  //U
  
  //D
}
