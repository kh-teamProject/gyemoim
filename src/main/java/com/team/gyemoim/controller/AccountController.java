package com.team.gyemoim.controller;

import com.team.gyemoim.dto.MyPageDTO;
import com.team.gyemoim.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
  @PostMapping("/myInfoModify")
  public boolean myInfoModify(MyPageDTO dto) {
    System.out.println("myInfoModify Controller....");
    System.out.println("MemberDTO: " + dto);
    accountService.myInfoModify(dto);
    return true;
  }

  // D
}
