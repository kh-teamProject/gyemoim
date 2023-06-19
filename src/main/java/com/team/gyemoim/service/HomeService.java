package com.team.gyemoim.service;


import com.team.gyemoim.dto.HomeListDTO;
import com.team.gyemoim.dto.HomeNoticeDTO;

import java.util.List;

public interface HomeService {
 //Create
 //시각화
 //1. 스테이지 전체 수
 Integer getAllPfCount();
 //2. 스테이지 대기중 수
 Integer getAllWaitingPfList();
 //3. 스테이지 참여중 수
 Integer getAllPartPfList();
 //4. 스테이지 완료 수
 Integer getAllCompletePfList();
 //5. 총 참여인원
 Integer getAllRollCount();
 //스테이지 리스트
 //1. 전체 계모임 중 랜덤 6개 select + 대기중만 표시
 List<HomeListDTO> getPfHomeList();
 //2. pfID가 일치하는 roll 데이터
 List<HomeListDTO> getPfRollList();
 //공지사항 리스트
 //1. 전체 공지사항 정보 중 최신 3개 select
 List<HomeNoticeDTO> getNoticeHomeList();
}
