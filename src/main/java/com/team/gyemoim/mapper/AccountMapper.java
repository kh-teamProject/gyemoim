package com.team.gyemoim.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;

@Mapper
public interface AccountMapper {
  HashMap<String, Object> getMyInfo(Integer uNo);

  void myInfoModify();
}
