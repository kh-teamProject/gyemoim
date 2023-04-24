package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.TestDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {

  List<TestDTO> getUserList();
}
