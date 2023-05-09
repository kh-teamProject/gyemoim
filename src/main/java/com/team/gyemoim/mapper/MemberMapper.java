package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.LoginDTO;
import com.team.gyemoim.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface MemberMapper {
    void join(MemberDTO memberDTO);
    // void addRole(UserDTO userVo);
    // Optional<UserVo> findUserById(String userId);
    Optional<MemberDTO> findUser(String email);
    Optional<MemberDTO> findUserId(String email);
    String getUserPassword(LoginDTO loginDTO);
}
