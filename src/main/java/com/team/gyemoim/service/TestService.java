package com.team.gyemoim.service;

import com.team.gyemoim.dto.stage.StageListDTO;
import com.team.gyemoim.dto.TestDTO;

import java.util.List;

public interface TestService {

  List<TestDTO> getUserList();
  List<StageListDTO> getTestList(int pfID);
}
