package com.team.gyemoim.service;

import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberDetailsService implements UserDetailsService {


    private final MemberMapper memberMapper;


    // Email 기반으로 회원 정보 가져옴
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        MemberDTO memberDTO = memberMapper.findByEmail(email);

        if (memberDTO == null) {
            throw new UsernameNotFoundException(email + "> email을 찾을 수 없습니다.");
        }

        return addAuthorities(memberDTO);   // 권한을 추가
    }


    // Spring Security의 UserDetailsService를 구현하여 사용자의 역할에 따른 권한을 부여
    private MemberDTO addAuthorities(MemberDTO memberDTO) {

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        switch (memberDTO.getUserRole()) {
            case "가회원":
                authorities.add(new SimpleGrantedAuthority("가회원"));

                break;
            case "정회원":
                authorities.add(new SimpleGrantedAuthority("정회원"));

                break;
            case "관리자":
                authorities.add(new SimpleGrantedAuthority("관리자"));
                break;
        }

        memberDTO.setAuthorities(authorities);

        return memberDTO;
    }

}