package com.team.gyemoim.service;

import com.team.gyemoim.dto.LoginDTO;
import com.team.gyemoim.dto.MemberDTO;
import com.team.gyemoim.exception.LoginFailedException;
import com.team.gyemoim.exception.UserNotFoundException;
import com.team.gyemoim.jwt.JwtProvider;
import com.team.gyemoim.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.NoSuchElementException;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberMapper memberMapper;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;


    // 회원가입
    @Transactional
    public MemberDTO account(MemberDTO memberDTO) {

        if (memberMapper.findByEmail(memberDTO.getEmail()) != null) {
            throw new RuntimeException("이미 가입된 이메일이 있습니다.");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
        memberDTO.setUserRole("가회원");
        memberDTO.setIsLeave("N");

        memberMapper.account(memberDTO);

        return memberMapper.findByEmail(memberDTO.getEmail());
    }

    // 회원 가입 인증번호 전송
    // 메일 내용 작성
    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
        String ePw = createKey(); // 랜덤 인증번호 생성

        System.out.println("보내는 대상 : " + to);
        System.out.println("인증 번호 : " + ePw);

        MimeMessage message = mailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, to);    // 보내는 대상
        message.setSubject("[나만의 목돈마련 솔루션, 계이득] 회원가입 이메일 인증코드");    // 제목

        String content = "";
        content += "<div style='margin:100px;'>";
        content += "<h1> 나만의 목돈마련 솔루션, 계이득</h1>";
        content += "<br>";
        content += "<p>아래 코드로 회원가입 이메일 인증을 해주세요.<p>";
        content += "<br>";
        content += "<p>감사합니다!<p>";
        content += "<br>";
        content += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        content += "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        content += "<div style='font-size:130%'>";
        content += "CODE : <strong>";
        content += ePw + "</strong><div><br/> ";   // 메일에 인증번호 넣기
        content += "</div>";

        message.setText(content, "utf-8", "html"); // 내용
        message.setFrom(new InternetAddress("kwon524@naver.com", "계이득"));   // 보내는 사람의 이메일 주소, 보내는 사람 이름

        return message;
    }

    // 랜덤 인증 코드 전송
    public String createKey() {
        StringBuilder key = new StringBuilder();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤, rnd 값에 따라서 아래 switch 문이 실행됨

            switch (index) {
                case 0:
                    key.append((char) ( (rnd.nextInt(26)) + 97));
                    // a~z (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ( (rnd.nextInt(26)) + 65));
                    // A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }

    public void sendSimpleMessage(String to) throws Exception {

        MimeMessage message = createMessage(to); // 메일 발송

        try {// 예외처리
            mailSender.send(message);

        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 로그인
    public String login(LoginDTO loginDTO) {

        MemberDTO memberDTO = memberMapper.findByEmail(loginDTO.getEmail());

        if (memberDTO.getEmail() == null) {
            throw new LoginFailedException("잘못된 Email 입니다.");
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), memberDTO.getPassword())) {
            throw new LoginFailedException("잘못된 비밀번호입니다.");
        }

        return jwtProvider.createToken(memberDTO.getUNo(), memberDTO.getName(), memberDTO.getEmail(), Collections.singletonList(memberDTO.getUserRole()));
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 이메일 찾기
    public String memberEmailSearch(MemberDTO memberDTO) {
        String result = memberMapper.memberEmailSearch(memberDTO);

        if (result == null) {
            throw new UserNotFoundException("이메일 찾기(Service) : 입력 정보가 일치하지 않습니다.");
        }

        return result;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 비밀번호 리셋, 임시 비밀번호 발송
    public void resetPassword(String email) {
        MemberDTO memberDTO = memberMapper.findByEmail(email);

        if (memberDTO == null) {
            throw new NoSuchElementException("일치하는 회원이 없습니다.");
        }

        String newPassword = createKey();
        String encodedPassword = passwordEncoder.encode(newPassword);

        memberDTO.setPassword(encodedPassword);
        memberMapper.updatePassword(memberDTO);
        sendPasswordResetEmail(memberDTO.getEmail(), newPassword);

    }

    // 임시 비밀번호 이메일 발송
    private void sendPasswordResetEmail(String email, String newPassword) {
        MimeMessage message = createPasswordResetMessage(email, newPassword);

        try {
            mailSender.send(message);

        } catch (MailException e) {
            e.printStackTrace();
            throw new MailSendException("이메일 발송 중 오류가 발생했습니다.");
        }

    }

    // 임시 비밀번호 이메일 메시지 작성
    private MimeMessage createPasswordResetMessage(String to, String newPassword) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            message.setSubject("[나만의 목돈마련 솔루션, 계이득] 임시 비밀번호 발급");
            message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(to));

            String content = generatePasswordResetEmailContent(newPassword);

            message.setText(content, "utf-8", "html");
            message.setFrom(new InternetAddress("kwon524@naver.com", "계이득"));

        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("이메일 작성 중 오류가 발생했습니다.");

        }
        return message;

    }

    // 임시 비밀번호 이메일 내용 생성
    private String generatePasswordResetEmailContent(String newPassword) {

        String content = "<div style='margin:100px;'>";
        content += "<h1>나만의 목돈마련 솔루션, 계이득</h1>";
        content += "<br>";
        content += "<p>임시 비밀번호를 발급해드립니다.</p>";
        content += "<br>";
        content += "<p>로그인 후 마이페이지에서 새 비밀번호로 변경해주세요.</p>";
        content += "<br>";
        content += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        content += "<h3 style='color:blue;'>임시 비밀번호</h3>";
        content += "<div style='font-size:130%'>";
        content += "<strong>" + newPassword + "</strong><div><br/>";
        content += "</div>";

        return content;
    }

}