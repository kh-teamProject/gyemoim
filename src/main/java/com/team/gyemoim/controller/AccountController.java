package com.team.gyemoim.controller;

import com.team.gyemoim.dto.InterestDTO;
import com.team.gyemoim.dto.MyPageDTO;
import com.team.gyemoim.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@AllArgsConstructor
public class AccountController {

  private final AccountService accountService;
  // C
  

  // R
  @GetMapping("/mypage")
  public HashMap<String, Object> getMyInfo(@RequestParam Integer uNo) {
    return accountService.getMyInfo(uNo);
  }

  @GetMapping("/getPassword")
  public String getPassword(@RequestParam Integer uNo) {
    return accountService.getPassword(uNo);
  }

  // U

  // 내 정보 수정하기
  @PostMapping("/myInfoModify")
  public boolean myInfoModify(MyPageDTO dto) {
    System.out.println("myInfoModify Controller....");
    System.out.println("MemberDTO: " + dto);
    accountService.myInfoModify(dto);
    return true;
  }

  // 내 관심사 수정하기
  @GetMapping("/interestUpdate")
  public void interestUpdate(InterestDTO interestDTO) {
    System.out.println(interestDTO);
    accountService.interestUpdate(interestDTO);
  }
  // D
}
