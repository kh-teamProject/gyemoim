package com.team.gyemoim.jwt;

import com.team.gyemoim.service.MemberDetailsService;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${jwt.header}")
    private String header;
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.token-validity-in-seconds}")
    private long tokenValidMillisecond;

    private final MemberDetailsService memberDetailsService;

    private final Set<String> tokenBlacklist = new HashSet<>(); // 블랙리스트 관리를 위한 Set

    private final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes()); // SecretKey Base64로 인코딩
    }


    // JWT 토큰 생성
    public String createToken(Integer uNo,String name, String email, List<String> userRole) {
        Claims claims = Jwts.claims();
        claims.put("uNo", uNo);
        claims.put("name", name);
        claims.put("email", email);
        claims.put("userRole", userRole);
        Date now = new Date();

        Map<String, Object> map = new HashMap<>();
        map.put("header", header);

        return Jwts.builder()
                .setHeader(map)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMillisecond)) // 토큰 만료일 설정
                .signWith(SignatureAlgorithm.HS512, secretKey) // 암호화
                .compact();
    }


    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = memberDetailsService.loadUserByUsername(this.getEmail(token));

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }


    // 유저 이름 추출
    public String getEmail(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    // Request header에서 token 꺼내옴
    public String resolveToken(HttpServletRequest request) {
        String token = request.getHeader("Gyemoim");

        // 가져온 Authorization Header 가 문자열이고, Bearer 로 시작해야 가져옴
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }

        return null;
    }

    // 토큰을 블랙리스트에 추가하여 로그아웃 처리
    public void addToBlacklist(String token) {
        tokenBlacklist.add(token);
        System.out.println("addToBlacklist" + tokenBlacklist);
    }

    // 토큰이 블랙리스트에 있는지 확인
    public boolean isInBlacklist(String token) {
        System.out.println(token);
        System.out.println("isInBlacklist" + tokenBlacklist);
        return tokenBlacklist.contains(token);
    }


    // Token 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());

        } catch (SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}

