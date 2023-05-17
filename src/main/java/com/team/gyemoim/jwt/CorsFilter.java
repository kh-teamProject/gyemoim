package com.team.gyemoim.jwt;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // 도메인 허용
        response.setHeader("Access-Control-Allow-Credentials", "true"); // 인증 정보 포함된 요청도 허용
        response.setHeader("Access-Control-Allow-Methods", "*"); // 요청 가능한 HTTP메서드를 모두 허용
        response.setHeader("Access-Control-Max-Age", "3600");   // 프리플라이트 요청이 캐시될 시간을 지정
        response.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, " +
                        "Authorization, accessToken, refreshToken, Cookie, Set-Cookie");  // 요청 헤더에 포함될 수 있는 값
        // response.setHeader("Access-Control-Expose-Headers", "accessToken, Set-Cookie");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {   // 요청이 OPTIONS 메서드인 경우, "HttpServletResponse.SC_OK" 상태 코드를 반환하여 클라이언트에게 응답
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            try {
                chain.doFilter(req, res);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void destroy() {

    }
}