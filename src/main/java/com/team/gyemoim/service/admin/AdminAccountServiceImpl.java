package com.team.gyemoim.service.admin;

import com.team.gyemoim.mapper.admin.AdminAccountMapper;
import com.team.gyemoim.vo.MemberVO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class AdminAccountServiceImpl implements AdminAccountService {

  private final AdminAccountMapper accountMapper;

  // Read

  // 회원정보 전체 불러오기
  @Override
  public List<MemberVO> getMember() {
    return accountMapper.getMember();
  }
}
