package com.team.gyemoim.service;

import com.team.gyemoim.dto.LoginDTO;
import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.exception.LoginFailedException;
import com.team.gyemoim.exception.UserNotFoundException;
import com.team.gyemoim.jwt.JwtProvider;
import com.team.gyemoim.mapper.MemberMapper;
import com.team.gyemoim.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberMapper memberMapper;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;


    // 회원가입
    @Transactional
    public MemberDTO account(MemberDTO memberDTO) {

        if (memberMapper.findByEmail(memberDTO.getEmail()) != null) {
            throw new RuntimeException("이미 가입된 Email이 있습니다.");
        }


        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
        memberDTO.setUserRole("가회원");
        memberDTO.setIsLeave("N");

        memberMapper.account(memberDTO);

        return memberMapper.findByEmail(memberDTO.getEmail());
    }


    // 로그인
    public String login(LoginDTO loginDTO) {

        MemberDTO memberDTO = memberMapper.findByEmail(loginDTO.getEmail());

        if (memberDTO.getEmail() == null) {
            throw new LoginFailedException("잘못된 Email 입니다.");
        }
        if (!passwordEncoder.matches(loginDTO.getPassword(), memberDTO.getPassword())) {
            throw new LoginFailedException("잘못된 비밀번호입니다.");
        }

        return jwtProvider.createToken(memberDTO.getUNo(), memberDTO.getName(), memberDTO.getEmail(), Collections.singletonList(memberDTO.getUserRole()));
    }


    // 이메일 찾기
    public String memberEmailSearch(MemberDTO memberDTO) {
        String result = memberMapper.memberEmailSearch(memberDTO);
        if (result == null) {
            throw new UserNotFoundException("이메일 찾기(Service) : 입력 정보가 일치하지 않습니다.");
        }
        return result;
    }



    // 비밀번호 찾기
    public String memberPwdSearch(MemberDTO memberDTO) {
        String result = memberMapper.memberPwdSearch(memberDTO);
        if (result == null) {
            throw new UserNotFoundException("비밀번호 찾기(Service) : 입력 정보가 일치하지 않습니다.");
        }
        return result;
    }
}
