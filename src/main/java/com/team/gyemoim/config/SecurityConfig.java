package com.team.gyemoim.config;

import com.team.gyemoim.jwt.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider;


    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 패스워드 암호화
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()  // 기본 설정 사용 안함
                .csrf().disable() // csrf 사용 안함
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용 안함

                .and()
                .authorizeRequests()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/**").permitAll()
//                .antMatchers("/mypage").hasRole("가회원")
//                .antMatchers("/**").hasRole("정회원")
//                .antMatchers("/**").hasRole("관리자")

                .and()
                .formLogin()
                .loginPage("/login") // 로그인 페이지 경로
                .defaultSuccessUrl("/") // 로그인 성공 후 이동할 URL
                .failureUrl("/login") // 로그인 실패 시 이동할 URL
                .permitAll()

                .and()
                .logout()
                .logoutUrl("/logout") // 로그아웃 API 경로
                .logoutSuccessHandler((request, response, authentication) -> {
                    // 로그아웃 성공 시 처리할 로직 작성
                    String token = jwtProvider.resolveToken(request);
                    System.out.println("로그아웃 위한 토큰 가져 왔니?  " + token);
                    jwtProvider.addToBlacklist(token); // 토큰을 블랙리스트에 추가하여 로그아웃 처리
                    response.setStatus(HttpServletResponse.SC_OK);
                    System.out.println("성공한건가?");
                })

                .and()
                .apply(new JwtConfig(jwtProvider))


                .and()
                .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())

                .and()
                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())

                .and()
                .addFilterBefore(new JwtFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class); // Email, Password 검사 전에 jwt 필터 먼저 수행



        return http.build();
    }

}
