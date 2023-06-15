package com.team.gyemoim.service;


import com.team.gyemoim.dto.HomeListDTO;
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

  @Override
  public List<HomeListDTO> getPfAllList(){
    log.info("서비스?");
    return homeMapper.getPfHomeList();
  }

  @Override
  public List<HomeListDTO> getPfRollList() {
    return homeMapper.getPfRollList();
  }
}
