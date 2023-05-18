package com.team.gyemoim.vo;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberVO {

    private Integer uno; // 회원번호
    private String email; //이메일
    private String password; //패스워드
    private String name; //이름
    private String phone; //전화번호
    private String bankName; //은행명
    private String bankAccountNumber; //계좌번호
    private String accountHolder; //예금주
    private String pRank; //신용등급
    private String interest; //관심사
    private String enrollDate; //회원가입일
    private String isLeave; // 탈퇴여부
    private String userRole;// 권한

    public MemberVO(String subject, String string, Collection<? extends GrantedAuthority> authorities) {
    }
    
}
