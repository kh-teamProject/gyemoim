package com.team.gyemoim.service;

import com.team.gyemoim.dto.MemberDTO;

import java.util.HashMap;

public interface AccountService {

  HashMap<String, Object> getMyInfo(Integer uNo);

  void myInfoModify(MemberDTO dto);
}
