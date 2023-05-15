package com.team.gyemoim.service;

import com.team.gyemoim.dto.InterestDTO;
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

  // 내 관심사 수정하기
  @Override
  public void interestUpdate(InterestDTO interestDTO) {
    System.out.println("관심사 서비스");
    System.out.println(interestDTO + "서비스스스스스스");
    accountMapper.interestUpdate(interestDTO);
  }

  // MemberDelete

}
