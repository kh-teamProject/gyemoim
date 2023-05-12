package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.MyPageDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;

@Mapper
public interface AccountMapper {
  HashMap<String, Object> getMyInfo(Integer uNo);

  void myInfoModify(MyPageDTO dto);

  String getPassword(Integer uNo);
}
