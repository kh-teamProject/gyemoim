package com.team.gyemoim.service;

import java.util.HashMap;

public interface AccountService {

  HashMap<String, Object> getMyInfo(Integer uNo);

  void myInfoModify();
}
