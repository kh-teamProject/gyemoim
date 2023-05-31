package com.team.gyemoim.mapper.admin;

import com.team.gyemoim.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminAccountMapper {

  // Read

  // 회원정보 전체 불러오기
  List<MemberVO> getMember();
}
