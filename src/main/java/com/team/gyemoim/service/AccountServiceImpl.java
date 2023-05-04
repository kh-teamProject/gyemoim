package com.team.gyemoim.service;

import com.team.gyemoim.mapper.AccountMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Service
@Transactional
@AllArgsConstructor
public class AccountServiceImpl implements AccountService{

  private final AccountMapper accountMapper;

  @Override
  public HashMap<String, Object> getMyInfo(Integer uNo) {
    System.out.println("getMyInfo Service....");
    return accountMapper.getMyInfo(uNo);
  }
}
