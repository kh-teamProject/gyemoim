package com.team.gyemoim.controller;

import com.team.gyemoim.dto.stage.*;
import com.team.gyemoim.service.stage.StageService;
import com.team.gyemoim.vo.RollVO;
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
    //(현지) <스테이지 생성> _스테이지 생성(PF)
    @PostMapping(value ="/stageCreate")
    public void stageCreate(StageCreateDTO stageCreateDTO,StageParticipateDTO stageParticipateDTO,ImportDTO importDTO) throws Exception{
         stageService.stageCreate(stageCreateDTO);
        stageService.stageParticipate(stageParticipateDTO);
    }



    // (현지)<스테이지생성>_참가 데이터(pfID,receiveTurn,pfMaster) 생성(ROLL)
    @PostMapping(value ="/stageAgree")
    public void stageCreate(StageParticipateDTO stageParticipateDTO) throws Exception{
        stageService.stageParticipate(stageParticipateDTO);
    }
  
  //R

  @GetMapping("/stagelist") // (유진)계모임 전체를 조회할 수 있음.
  @ResponseBody
  public HashMap<String,Object> stage() {
    HashMap<String,Object> map = new HashMap<>();
    map.put("PF",stageService.getPFList());
    System.out.println("계모임 조회 컨트롤러");
    return map;
  }
  
  @GetMapping("/filter") // (유진)버튼 선택시 특정 약정금의 계모임만 조회할 수 있음.
  public List<StageListDTO> filterList(@RequestParam("deposit") int deposit){
    System.out.println("필터작동컨트롤러");
    return stageService.filterList(deposit);
  }
  @GetMapping("/recommend")//(유진) uno존재시 입금액 맞춰 무작위로 추천
  public List<StageListDTO> recommend(@RequestParam("uno") int uno){
      System.out.println("계모임 추천 컨트롤러" +uno);
      return stageService.recommend(uno);
  }
  
    // (현지)<스테이지생성>_중복체크
    @PostMapping(value ="/checkPfName")
    public boolean checkPfName(@RequestParam("pfName") String pfName) {
         int count = stageService.checkPfName(pfName);
        return count>0;
    }
  
    //(현지)<스테이지생성>_스테이지 pfID 가져오기
    @GetMapping(value ="/stageAgree")
    public List<StageCreateDTO> stagePartIn1(@RequestParam String pfName){
        return stageService.stagePartIn1(pfName);
    }
  
    //(현지)<스테이지생성>_스테이지 정보 가져오기
    @GetMapping(value ="/stageAgree2")
    public List<ImportDTO> stagePartIn2(ImportDTO importDTO){
        return stageService.stagePartIn2(importDTO);
    }
  
      //(현지) <스테이지생성>_수령예정표
    @GetMapping(value ="/stageCreateImportTable")
    public List<ImportDTO> importTableGet(ImportDTO importDTO){
        return stageService.importGet(importDTO);
    }

    //(찬희) stage 컨트롤러
    @GetMapping("/stage")
    @ResponseBody
    public HashMap<String, Object> stage(@RequestParam Integer pfID, StageRollDTO dto) {
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
    //(찬희) 수익보고서
    @GetMapping("/StageReport")
    @ResponseBody
    public HashMap<String, Object> stageReport(@RequestParam Integer pfID, StageRollDTO dto) {
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("pf", stageService.getPfList(pfID));
        Integer myBalance = stageService.getMyAccount(dto);
        List<StageRollDTO> rollList = stageService.getRollList(dto);
        for (StageRollDTO rollDTO : rollList) {
            rollDTO.setMyBalance(myBalance);
        }
        map.put("roll", rollList);
        map.put("import", stageService.getImportList(pfID));
        map.put("memberInfo", stageService.getMemberInfo(dto));

        return map;
    }

  
  //U
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
        stageService.stageDeposit(dto);
        return "success";
    }

  //D
  //(찬희) stage 탈출하기
  @DeleteMapping("/stageOut")
  public String stageOut(StageINDTO dto) {
      stageService.stageOut(dto); // 버튼 누르면 roll_uNo:delete
      return "success";
  }


  // (지연)선택한 계모임 정보 가져오기
  @GetMapping("/stageSelect")
  @ResponseBody
  public HashMap<String, Object> getStageSelect(@RequestParam Integer pfID, RollDTO dto) {
      HashMap<String,Object> map = new HashMap<String,Object>();
      map.put("pf", stageService.getPfInfo(pfID));
      map.put("roll", stageService.getStageSelectRoll(dto));
      return map;
  }

  // (지연)스테이지 선택 수령예정표 가져오기
  @GetMapping("/Receipt")
  @ResponseBody
  public HashMap<String, Object> Receipt(@RequestParam Integer pfID, PfDTO dto) {
      HashMap<String,Object> map = new HashMap<String,Object>();
      map.put("pf", stageService.getPfInfo(pfID));

      map.put("receipt", stageService.getReceipt(pfID));

      return map;
  }

  // (지연)스테이지 선택 참여 순번 가져오기
  @GetMapping("/Parti")
  @ResponseBody
  public HashMap<String, Object> Parti(@RequestParam Integer pfID, PartiListDTO dto, RollVO vo) {
      HashMap<String,Object> map = new HashMap<String,Object>();

      map.put("pf", stageService.getPfInfo(pfID));
      map.put("parti", stageService.getParti(dto));
      map.put("partiRoll", stageService.getPartRoll(vo));
      map.put("turnRoll", stageService.getTurnRoll(dto));

      return map;
  }

}
