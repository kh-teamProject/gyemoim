package com.team.gyemoim.service;


import com.team.gyemoim.dto.HomeListDTO;
import com.team.gyemoim.dto.HomeNoticeDTO;
import com.team.gyemoim.mapper.HomeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class HomeServiceImpl implements HomeService {
  private final HomeMapper homeMapper;

  //시각화
  //1. 스테이지 전체 수
  @Override
  public Integer getAllPfCount() {
    return homeMapper.getAllPfCount();
  }
  //2. 스테이지 대기중 수
  @Override
  public Integer getAllWaitingPfList() {
    return homeMapper.getAllWaitingPfList();
  }
  //3. 스테이지 참여중 수
  @Override
  public Integer getAllPartPfList() {
    return homeMapper.getAllPartPfList();
  }
  //4. 스테이지 완료 수
  @Override
  public Integer getAllCompletePfList() {
    return homeMapper.getAllCompletePfList();
  }
  //5. 총 참여인원
  @Override
  public Integer getAllRollCount() {
    return homeMapper.getAllRollCount();
  }
  //스테이지 리스트
  //1. 전체 계모임 중 랜덤 6개 select + 대기중만 표시
  @Override
  public List<HomeListDTO> getPfHomeList(){
    return homeMapper.getPfHomeList();
  }
  //2. pfID가 일치하는 roll 데이터
  @Override
  public List<HomeListDTO> getPfRollList() {
    return homeMapper.getPfRollList();
  }
  //공지사항 리스트
  //1. 전체 공지사항 정보 중 최신 3개 select
  @Override
  public List<HomeNoticeDTO> getNoticeHomeList() {
    return homeMapper.getNoticeHomeList();
  }
}
