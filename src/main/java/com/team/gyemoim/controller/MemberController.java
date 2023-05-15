package com.team.gyemoim.controller;

import com.team.gyemoim.dto.*;
import com.team.gyemoim.exception.DuplicatedUsernameException;
import com.team.gyemoim.exception.LoginFailedException;
import com.team.gyemoim.exception.UserNotFoundException;
import com.team.gyemoim.jwt.TokenProvider;
import com.team.gyemoim.service.MemberService;
import com.team.gyemoim.service.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import java.time.Duration;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class MemberController {
    @Autowired
    MemberService memberService;
    @Autowired
    ResponseService responseService;
    @Autowired
    TokenProvider tokenProvider;



    @PostMapping(value="/account")
    public ResponseEntity<?> account(@RequestBody MemberDTO memberDTO) {
        ResponseEntity responseEntity = null;

        try {
            memberService.account(memberDTO);
            TokenDTO token = memberService.tokenGenerator(memberDTO.getEmail());
            ResponseCookie responseCookie =
                    ResponseCookie.from(HttpHeaders.SET_COOKIE, token.getRefreshToken())///new Cookie("refreshToken", token.getRefreshToken());
                            .path("/")
                            .maxAge(14 * 24 * 60 * 60) // 14일
                            .httpOnly(true)
                             .httpOnly(true).secure(true)   // 주석
                            .build();
            System.out.println(responseCookie);

            SingleDataResponse<String> response = responseService.getSingleDataResponse(true, memberDTO.getEmail(), token.getAccessToken());
            responseEntity = ResponseEntity.status(HttpStatus.OK)
                    .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                    .body(response);

        }catch(DuplicatedUsernameException exception) {
            BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());
            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        }
        return responseEntity;
    }

    @PostMapping(value="/login")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {
        ResponseEntity responseEntity = null;

        try {
            String email = memberService.login(loginDTO);
            TokenDTO token = memberService.tokenGenerator(email);
            ResponseCookie responseCookie =
                    ResponseCookie.from(HttpHeaders.SET_COOKIE, token.getRefreshToken())///new Cookie("refreshToken", token.getRefreshToken());
                            .path("/")
                            .maxAge(Duration.ofDays(14))
                            .httpOnly(true)
                            // .secure(true)
                            .build();

            SingleDataResponse<String> response = responseService.getSingleDataResponse(true, email, token.getAccessToken());
            responseEntity = ResponseEntity.status(HttpStatus.OK)
                    .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                    .body(response);

        } catch (LoginFailedException exception) {
            log.debug(exception.getMessage());
            BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());

            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return responseEntity;
    }

    @PostMapping(value="/logout")
    public ResponseEntity logout(
            @CookieValue(value = HttpHeaders.SET_COOKIE) Cookie refreshCookie
    ) {
        ResponseEntity responseEntity = null;
        try {
            ResponseCookie responseCookie =
                    ResponseCookie.from(HttpHeaders.SET_COOKIE, "")///new Cookie("refreshToken", token.getRefreshToken());
                            .path("/")
                            .httpOnly(true)
                            .secure(true)
                            .maxAge(0).build();
            BaseResponse response =
                    responseService.getBaseResponse(true, "로그아웃 성공");
            responseEntity = ResponseEntity.status(HttpStatus.OK)
                    .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                    .body(response);

        } catch (LoginFailedException exception) {
            log.debug(exception.getMessage());
            BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());

            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return responseEntity;
    }


    /**
     * @param email 전송을 위한 DTO
     * @return email 있다면 success값을 true, 없다면 false를 리턴.
     */
    @GetMapping(value="/get")
    public ResponseEntity isHaveUser(@RequestParam String email) {
        ResponseEntity responseEntity = null;
        // Cookie cookie = new Cookie("name", value)
        try {
            boolean isHaveUser = memberService.haveUser(email);
            String message = isHaveUser ? "회원가입된 유저입니다." : "회원가입 안된 유저입니다.";
            SingleDataResponse<Boolean> response = responseService.getSingleDataResponse(true, message, isHaveUser);
            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(response);


        }catch(UserNotFoundException exception) {
            log.debug(exception.getMessage());
            BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());
            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return responseEntity;
    }
}
