package com.team.gyemoim.service.stage;


import com.team.gyemoim.mapper.ListMapper;
import com.team.gyemoim.vo.PF;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ListServiceImpl implements ListService {

  private final ListMapper listMapper;
  @Override
  public List<PF> getPFList() {
    return listMapper.getPFList();
  }
}
