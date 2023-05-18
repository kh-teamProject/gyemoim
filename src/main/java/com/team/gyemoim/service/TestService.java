package com.team.gyemoim.service;

import com.team.gyemoim.dto.stage.StageListDTO;

import java.util.List;

public interface TestService {

  List<StageListDTO> getTestList(int pfID);
}
