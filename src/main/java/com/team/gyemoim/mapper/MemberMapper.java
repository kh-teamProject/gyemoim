package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {

    // 회원 권한 정보
    MemberDTO findByEmail(String email);

    // 회원가입
    void account(MemberDTO memberDTO);


    // email 찾기
    String memberEmailSearch(MemberDTO memberDTO);

    // password 찾기
    String memberPwdSearch(MemberDTO memberDTO);
}
