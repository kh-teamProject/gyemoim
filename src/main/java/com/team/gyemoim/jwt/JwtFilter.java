package com.team.gyemoim.jwt;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    private final JwtProvider jwtProvider;

    // HTTP 요청에 대한 보안 인증 처리
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String token = jwtProvider.resolveToken(request);//   JWT 토큰 얻기 위해 resolveToken 호출
        String requestURI = request.getRequestURI();// 요청된 URI 가져옴

        // token이 유효하고, jwtProvider.validateToken 메서드를 통해 검증되었는지 확인
        if (StringUtils.hasText(token) && jwtProvider.validateToken(token) && !jwtProvider.isInBlacklist(token)) {// token이 null이거나 빈 문자열인지 확인
            Authentication authentication = jwtProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);// 인증 정보를 SecurityContext에 저장

            logger.info("Security context에 인증 정보를 저장했습니다, uri: {}", requestURI);

        } else {
            logger.debug("유효한 Jwt 토큰이 없거나 블랙리스트에 있습니다, uri: {}", requestURI);
        }


        // 로그아웃 처리
        if (requestURI.equals("/logout")) {
            String logoutToken = jwtProvider.resolveToken(request);
            jwtProvider.addToBlacklist(logoutToken);
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setStatus(HttpServletResponse.SC_OK);

            return;
        }

        chain.doFilter(servletRequest, servletResponse);
    }

}