package com.team.gyemoim.mapper.admin;

import com.team.gyemoim.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface AdminAccountMapper {

  // Read

  // 회원정보 전체 불러오기
  List<MemberVO> getMember();

  List<Map<String, Object>> getInterest();

  List<Map<String, Object>> getAverageExpenditure();
}
