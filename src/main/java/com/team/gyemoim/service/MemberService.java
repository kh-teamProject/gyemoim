package com.team.gyemoim.service;

import com.team.gyemoim.dto.LoginDTO;
import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.dto.TokenDTO;
import com.team.gyemoim.exception.DuplicatedUsernameException;
import com.team.gyemoim.exception.LoginFailedException;
import com.team.gyemoim.jwt.TokenProvider;
import com.team.gyemoim.mapper.MemberMapper;
import com.team.gyemoim.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    // 암호화 위한 엔코더
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final TokenProvider jwtTokenProvider;

    // 회원가입 시 저장시간을 넣어줄 DateTime형
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:sss");
    Date time = new Date();
    String localTime = format.format(time);

    @Autowired
    MemberMapper memberMapper;


    /**
     * 유저 회원가입
     * @param memberDTO
     */
    @Transactional
    public boolean join(MemberDTO memberDTO) {
        // 가입된 유저인지 확인
        
        if (memberMapper.findUser(memberDTO.getEmail()).isPresent()) {
            System.out.println("!!!");
            throw new DuplicatedUsernameException("이미 가입된 유저에요");
        }

        System.out.println("memberService join...");
        // 가입 안했으면 아래 진행
        MemberDTO memberDTO1 = MemberDTO.builder()
                .email(memberDTO.getEmail())
                .password(passwordEncoder.encode(memberDTO.getPassword()))
                .userRole("ROLE_USER")
//                .enrollDate(localTime)
                .build();
        System.out.println(memberDTO1);
        memberMapper.join(memberDTO1);
        // userMapper.addRole(userVo);
        System.out.println("회원가입 성공");

        return memberMapper.findUserId(memberDTO1.getEmail()).isPresent();
    }
    /**
     * 토큰 발급받는 메소드
     * @param loginDTO 로그인 하는 유저의 정보
     * @return result[0]: accessToken, result[1]: refreshToken
     */
    public String login (LoginDTO loginDTO) {

        MemberDTO memberDTO = memberMapper.findUser(loginDTO.getEmail())//indUserByUsername(loginDto.getUsername())
                .orElseThrow(() -> new LoginFailedException("잘못된 아이디입니다"));
        System.out.println(loginDTO.getPassword());
        System.out.println(memberMapper.getUserPassword(loginDTO));
        System.out.println(passwordEncoder.matches(loginDTO.getPassword(), memberMapper.getUserPassword(loginDTO)));
        if (!passwordEncoder.matches(loginDTO.getPassword(), memberMapper.getUserPassword(loginDTO))) {
            throw new LoginFailedException("잘못된 비밀번호입니다");
        }

        return memberDTO.getEmail();
        // return loginDTO.getUserId();
        // // return tokenGenerator(userDto);
    }

    /**
     * 유저가 db에 있는지 확인하는 함수
     * @param email 유저의 아이디 입력
     * @return 유저가 있다면: true, 유저가 없다면: false
     */
    public boolean haveUser(String email) {
        // IdDTO idDTO = IdDTO.builder().userId(userid).build();
        if (memberMapper.findUserId(email).isPresent()) {
            return true;
        }else {
            return false;
        }
    }

    /**
     * 유저의 아이디를 찾는 함수
     * @param email 유저의 아이디 입력
     * @return 유저의 아이디가 없다면 에러를 뱉고, 있다면 email 리턴
     */
    public MemberDTO findUserId(String email) {
        return memberMapper.findUserId(email)
                .orElseThrow(() ->
                        new DuplicatedUsernameException("유저 중볶!~!!!!."));
    }

    public TokenDTO tokenGenerator(String email) {

        MemberDTO memberDTO = memberMapper.findUser(email)//indUserByUsername(loginDto.getUsername())
                .orElseThrow(() -> new LoginFailedException("잘못된 아이디입니다"));

        return TokenDTO.builder()
                .accessToken("Bearer" + jwtTokenProvider.createAcessToken(memberDTO.getEmail(), Collections.singletonList(memberDTO.getUserRole())))
                .refreshToken("Bearer" + jwtTokenProvider.createRefreshToken(memberDTO.getEmail(), Collections.singletonList(memberDTO.getUserRole())))
                .build();
    }
}
