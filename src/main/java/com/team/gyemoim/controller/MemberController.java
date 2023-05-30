package com.team.gyemoim.controller;

import com.team.gyemoim.dto.LoginDTO;
import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.dto.response.BaseResponse;
import com.team.gyemoim.dto.response.SingleDataResponse;
import com.team.gyemoim.exception.DuplicatedUsernameException;
import com.team.gyemoim.exception.LoginFailedException;
import com.team.gyemoim.jwt.JwtProvider;
import com.team.gyemoim.mapper.MemberMapper;
import com.team.gyemoim.service.MemberService;
import com.team.gyemoim.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final ResponseService responseService;
    private final JwtProvider jwtProvider;

    private final Logger logger = LoggerFactory.getLogger(MemberController.class);


    // 회원가입
    @PostMapping("/account")
    public ResponseEntity account(@RequestBody MemberDTO memberDTO) {
        ResponseEntity responseEntity = null;

        try {
            MemberDTO account = memberService.account(memberDTO);
            SingleDataResponse<MemberDTO> response = responseService.getSingleDataResponse(true, "회원가입 성공", account);
            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(response);

            System.out.println("회원가입 성공");
            System.out.println(account);
//            ResponseEntity.ok(account + "::(Controller) 회원가입이 완료되었습니다.");

        } catch (DuplicatedUsernameException exception) {
            logger.debug(exception.getMessage());
            BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());

            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

            System.out.println("회원가입 실패");
//            ResponseEntity.badRequest().body("(Controller) 회원가입에 실패하였습니다.");
        }

        return responseEntity;

    }


    // 로그인
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {

        ResponseEntity responseEntity = null;

        try {
            String token = memberService.login(loginDTO);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Gyemoim", "Bearer " + token);


            SingleDataResponse<String> response = responseService.getSingleDataResponse(true, "로그인 성공", token);

            responseEntity = ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(response);

            System.out.println("로그인 성공");
            System.out.println(httpHeaders);
            System.out.println(responseEntity);

        } catch (LoginFailedException exception) {
            logger.debug(exception.getMessage());
            BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());

            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

            System.out.println("로그인 실패");
        }


        return responseEntity;
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {

        String token = jwtProvider.resolveToken(request);

        System.out.println(token);

        jwtProvider.isInBlacklist(token); // 토큰을 블랙리스트에 추가하여 로그아웃 처리

        System.out.println("로그아웃 성공");
        System.out.println(token);

        return ResponseEntity.ok("로그아웃 성공");
    }


    // Email 찾기
    @GetMapping("/member-email-search")
    public String memberEmailSearch(@RequestBody MemberDTO memberDTO) {
        System.out.println("Email Search: " +memberDTO);
        return memberService.memberEmailSearch(memberDTO);
    }

    // Password 찾기
    @GetMapping("/member-pwd-search")
    public String memberPwdSearch(@RequestBody MemberDTO memberDTO) {
        System.out.println("Password Search: " +memberDTO);
        return memberService.memberPwdSearch(memberDTO);
    }
}
