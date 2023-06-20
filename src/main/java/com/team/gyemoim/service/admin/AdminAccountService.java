package com.team.gyemoim.service.admin;

import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.dto.admin.AdminListParamDTO;
import com.team.gyemoim.vo.MemberVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface AdminAccountService {

  // Read

  // 회원정보 전체 불러오기
  List<MemberVO> getMember();

  List<Map<String, Object>> getInterest();

  List<Map<String, Object>> getAverageExpenditure();

  List<Map<String, Object>> getMemberRole();

  int getTotalMemberCount();

  List<MemberDTO> searchMember(AdminListParamDTO adminListParamDTO);
}
