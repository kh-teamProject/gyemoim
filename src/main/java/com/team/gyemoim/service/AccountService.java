package com.team.gyemoim.service;

import com.team.gyemoim.dto.InterestDTO;
import com.team.gyemoim.dto.MyPageDTO;

import java.util.HashMap;

public interface AccountService {

  // 내 정보 가져오기
  HashMap<String, Object> getMyInfo(Integer uNo);

  // 내 정보 수정하기
  void myInfoModify(MyPageDTO dto);

  // 비밀번호 체크를 위한 가져오기
  String getPassword(Integer uNo);

  // 내 관심사 수정
  void interestUpdate(InterestDTO interestDTO);
}
