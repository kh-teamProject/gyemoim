package com.team.gyemoim.service;

import com.team.gyemoim.dto.MyPageDTO;

import java.util.HashMap;

public interface AccountService {

  HashMap<String, Object> getMyInfo(Integer uNo);

  void myInfoModify(MyPageDTO dto);

  String getPassword(Integer uNo);
}
