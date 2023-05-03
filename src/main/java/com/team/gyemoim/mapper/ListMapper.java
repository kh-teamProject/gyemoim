package com.team.gyemoim.mapper;

import com.team.gyemoim.vo.PF;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ListMapper {
  List<PF> getPFList();
}
