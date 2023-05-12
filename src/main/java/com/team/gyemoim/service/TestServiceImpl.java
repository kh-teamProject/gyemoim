package com.team.gyemoim.service;

import com.team.gyemoim.dto.StageListDTO;
import com.team.gyemoim.dto.TestDTO;
import com.team.gyemoim.mapper.TestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService {

  private final TestMapper testMapper;

  @Override
  public List<TestDTO> getUserList() {
    return testMapper.getUserList();
  }

  @Override
  public List<StageListDTO> getTestList(int pfID) {
    System.out.println("테스트서비스 돌아가연");
    return testMapper.getTestList(pfID);
  }
}
