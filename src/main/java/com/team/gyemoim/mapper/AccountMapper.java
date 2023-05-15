package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.InterestDTO;
import com.team.gyemoim.dto.MyPageDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Mapper
@Repository
public interface AccountMapper {

  // 내 정보 불러오기
  HashMap<String, Object> getMyInfo(Integer uNo);

  // 내 정보 수정하기
  void myInfoModify(MyPageDTO dto);

  // 비밀번호 체크를 위한 가져오기
  String getPassword(Integer uNo);

  // 관심사 수정
  void interestUpdate(InterestDTO interestDTO);
}
