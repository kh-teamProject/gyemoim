package com.team.gyemoim.controller;

import com.team.gyemoim.dto.HomeListDTO;
import com.team.gyemoim.service.HomeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@Log4j2
public class HomeController {

    private final HomeService homeService;


    @GetMapping("getStageList")
    public HashMap<String, Object> home(HomeListDTO dto) {
        log.info("홈 컨트롤러");
        HashMap<String,Object> map = new HashMap<String,Object>();
        //시각화
        //1. 스테이지 전체 수
        map.put("allPf", homeService.getAllPfCount());
        //2. 스테이지 대기중 수
        map.put("waitingPf", homeService.getAllWaitingPfList());
        //3. 스테이지 참여중 수
        map.put("partPf", homeService.getAllPartPfList());
        //4. 스테이지 완료 수
        map.put("completePf", homeService.getAllCompletePfList());
        //5. 총 참여인원
        map.put("allRoll", homeService.getAllRollCount());
        //6. 현재 스테이지 누적 운영 금액

        // 스테이지 리스트
        //1. 전체 계모임 중 랜덤 6개 select + 대기중만 표시
        map.put("stageList", homeService.getPfHomeList());
        //2. pfID가 일치하는 roll 데이터
        map.put("stageUserList", homeService.getPfRollList());

        // 공지사항
        //1. 전체 공지사항 정보 중 최신 3개 select
        map.put("noticeList", homeService.getNoticeHomeList());
        return map;
    }
}