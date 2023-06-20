package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.MemberDTO;
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

    // password 찾기 (임시 비밀번호 발급)
    void updatePassword(MemberDTO memberDTO);

    // password 찾기 (이메일, 이름)
    MemberDTO findByEmailAndName(@Param("email") String email, @Param("name") String name, @Param("phone") String phone);

    // password update
    void pwdUpdate(@Param("uNo") Integer uNo, @Param("password") String password);


}
