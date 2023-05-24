package com.team.gyemoim.service.admin;

import com.team.gyemoim.vo.MemberVO;

import java.util.List;

public interface AdminAccountService {

  // Read

  // 회원정보 전체 불러오기
  List<MemberVO> getMember();
}
