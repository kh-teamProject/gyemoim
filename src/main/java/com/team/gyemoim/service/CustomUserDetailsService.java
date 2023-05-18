package com.team.gyemoim.service;

import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.exception.UserNotFoundException;
import com.team.gyemoim.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    MemberMapper memberMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return memberMapper.findUser(email)
                .map(user -> addAuthorities(user))
                .orElseThrow(() -> new UserNotFoundException(email + ">email를 찾을 수 없습니다."));
    }

    private MemberDTO addAuthorities(MemberDTO memberDTO) {
        memberDTO.setAuthorities(Arrays.asList(new SimpleGrantedAuthority(memberDTO.getUserRole())));

        return memberDTO;
    }
}
