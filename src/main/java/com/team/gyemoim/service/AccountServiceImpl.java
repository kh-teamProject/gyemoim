package com.team.gyemoim.service;

import com.team.gyemoim.dto.MyPageDTO;
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

  // Create


  // Read
  @Override
  public HashMap<String, Object> getMyInfo(Integer uNo) {
    System.out.println("getMyInfo Service....");
    return accountMapper.getMyInfo(uNo);
  }

  @Override
  public String getPassword(Integer uNo) {
    return accountMapper.getPassword(uNo);
  }

  // Update
  @Override
  public void myInfoModify(MyPageDTO dto) {
    accountMapper.myInfoModify(dto);
  }

  // MemberDelete

}
