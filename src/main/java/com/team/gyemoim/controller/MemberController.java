package com.team.gyemoim.controller;

import com.team.gyemoim.dto.LoginDTO;
import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.dto.response.BaseResponse;
import com.team.gyemoim.dto.response.SingleDataResponse;
import com.team.gyemoim.exception.DuplicatedUsernameException;
import com.team.gyemoim.exception.LoginFailedException;
import com.team.gyemoim.jwt.JwtProvider;
import com.team.gyemoim.service.MemberService;
import com.team.gyemoim.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final ResponseService responseService;
    private final JwtProvider jwtProvider;
    private final Logger logger = LoggerFactory.getLogger(MemberController.class);


    // 회원가입
    @PostMapping("/account")
    public ResponseEntity account(@RequestBody MemberDTO memberDTO) {
        ResponseEntity responseEntity;

        try {
            MemberDTO account = memberService.account(memberDTO);
            SingleDataResponse<MemberDTO> response = responseService.getSingleDataResponse(true, "회원가입 성공", account);
            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(response);

            System.out.println("회원가입 성공");
            System.out.println(account);

        } catch (DuplicatedUsernameException exception) {
            logger.debug(exception.getMessage());
            BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());

            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

            System.out.println("회원가입 실패");
        }

        return responseEntity;
    }

    // 이메일 중복 확인
    @PostMapping("/account/checkEmail")
    public ResponseEntity<?> checkEmailExist(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean exists = memberService.isEmailExist(email);
        Map<String, Boolean> response = Collections.singletonMap("exists", exists);
        System.out.println("이메일 중복 확인: " + response);   // 존재하면 true
        return ResponseEntity.ok(response);
    }


    // 회원가입 메일 인증 번호 발송
    @PostMapping("/account/mailConfirm")
    public ResponseEntity<String> mailConfirm(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"이메일이 제공되지 않았습니다.\"}");
        }

        try {
            memberService.sendSimpleMessage(email);
            return ResponseEntity.ok("{\"message\": \"회원가입 인증 이메일이 전송되었습니다.\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"서버 오류로 인해 이메일 전송에 실패했습니다.\"}");
        }
    }

    // 인증 번호 일치 여부 확인
    @PostMapping("/account/verifyEmailCode")
    public ResponseEntity<String> verifyEmailCode(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String ePw = requestBody.get("ePw");

        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(ePw)) {
            System.out.println("error: 이메일과 인증 번호를 모두 입력해야 합니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"이메일과 인증 번호를 모두 입력해야 합니다.\"}");
        }

        boolean isValid = memberService.verifyEmailCode(email, ePw);

        if (isValid) {
            System.out.println("message: 이메일 인증이 완료되었습니다.");
            return ResponseEntity.ok("{\"message\": \"이메일 인증이 완료되었습니다. 회원 가입이 완료되었습니다.\"}");

        } else {
            System.out.println("error: 유효하지 않은 인증 번호입니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"유효하지 않은 인증 번호입니다.\"}");
        }
    }


    // 로그인
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {

        ResponseEntity responseEntity;

        try {
            String token = memberService.login(loginDTO).trim();

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Gyemoim", "Bearer " + token);

            SingleDataResponse<String> responseBody = responseService.getSingleDataResponse(true, "로그인 성공", token);

            responseEntity = ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(responseBody);

            // 쿠키에 secure 및 httpOnly 플래그 설정
            String encodedToken = StringUtils.replace(UriUtils.encode(token, StandardCharsets.UTF_8), "+", "%20");
            Cookie cookie = new Cookie("Gyemoim", encodedToken);
            cookie.setSecure(true); // secure 플래그 활성화
            cookie.setHttpOnly(true); // httpOnly 플래그 활성화
            response.addCookie(cookie);

            System.out.println("로그인 성공");
            System.out.println(httpHeaders);
            System.out.println(responseEntity);

        } catch (LoginFailedException exception) {
            logger.debug(exception.getMessage());

            responseService.getBaseResponse(false, exception.getMessage());

            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

            System.out.println("로그인 실패");
        }

        return responseEntity;
    }


    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String token = jwtProvider.resolveToken(request);

        // 토큰을 블랙리스트에 추가하여 로그아웃 처리
        jwtProvider.addToBlacklist(token);
        jwtProvider.isInBlacklist(token);

        System.out.println("로그아웃 성공");
        System.out.println(token);

        return ResponseEntity.ok("로그아웃 성공");
    }


    // Email 찾기
    @GetMapping("/account/member-email-search")
    public String memberEmailSearch(MemberDTO memberDTO) {

        System.out.println("Email Search: " + memberDTO);

        return memberService.memberEmailSearch(memberDTO);
    }


    // Password 찾기 (이메일 임시 비밀번호 발급)
    @PostMapping("/password/forgot")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String name = requestBody.get("name");
        String phone = requestBody.get("phone");

        if (email == null || email.isEmpty() || name == null || name.isEmpty()) {
            System.out.println("error: 이메일이 제공되지 않았습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{'error': '이메일이 제공되지 않았습니다.'}");

        }
        try {
            memberService.resetPassword(email, name, phone);
            System.out.println("message: 임시 비밀번호 발급 이메일이 전송되었습니다.");
            return ResponseEntity.ok("{'message': '임시 비밀번호 발급 이메일이 전송되었습니다.'}");

        } catch (NoSuchElementException e) {
            System.out.println("error: 일치하는 회원이 없습니다.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{'error': '일치하는 회원이 없습니다.'}");
        }

    }

    // Password 변경
    @PutMapping("/myPage/info/pwdUpdate/{uNo}")
    public ResponseEntity<String> pwdUpdate(@PathVariable("uNo") Integer uNo, @RequestParam String newPassword) {
        try {

            memberService.pwdUpdate(uNo, newPassword);
            System.out.println("Ctrl new Pwd SUCCESS");
            System.out.println("newPassword = " + newPassword);
            return ResponseEntity.ok("비밀번호 변경 성공");
        } catch (Exception e) {
            System.out.println("Ctrl new Pwd FAILS");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 변경 실패: " + e.getMessage());
        }
    }


}
