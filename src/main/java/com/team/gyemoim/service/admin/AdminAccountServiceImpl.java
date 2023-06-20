package com.team.gyemoim.service.admin;

import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.dto.admin.AdminListParamDTO;
import com.team.gyemoim.mapper.admin.AdminAccountMapper;
import com.team.gyemoim.vo.MemberVO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Member;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

  @Override
  public List<Map<String, Object>> getInterest() {
    return accountMapper.getInterest();
  }

  @Override
  public List<Map<String, Object>> getAverageExpenditure() {
    return accountMapper.getAverageExpenditure();
  }

  @Override
  public List<Map<String, Object>> getMemberRole() { return accountMapper.getMemberRole();}

  @Override
  public int getTotalMemberCount() { return accountMapper.getTotalMemberCount();}

  @Override
  public List<MemberDTO> searchMember(AdminListParamDTO adminListParamDTO) { return accountMapper.searchMember(adminListParamDTO);}

}
