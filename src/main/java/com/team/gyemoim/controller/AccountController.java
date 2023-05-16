package com.team.gyemoim.controller;

import com.team.gyemoim.dto.DepositDTO;
import com.team.gyemoim.dto.InterestDTO;
import com.team.gyemoim.dto.MyPageDTO;
import com.team.gyemoim.service.AccountService;
import com.team.gyemoim.vo.MyAccount;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@AllArgsConstructor
public class AccountController {

  private final AccountService accountService;

  // Creat
  // 계모임계좌에 입금하기
  @PostMapping("/deposit")
  public void deposit(DepositDTO depositDTO) {
    accountService.deposit(depositDTO);
  }

  // Read
  @GetMapping("/mypage")
  public HashMap<String, Object> getMyInfo(@RequestParam Integer uNo) {
    return accountService.getMyInfo(uNo);
  }

  @GetMapping("/getPassword")
  public String getPassword(@RequestParam Integer uNo) {
    return accountService.getPassword(uNo);
  }

  // 계모임계좌 정보 가져오기
  @GetMapping("/getMyAccount")
  public List<MyAccount> getMyAccount(@RequestParam Integer uNo) {
    System.out.println(accountService.getMyAccount(uNo));
    return accountService.getMyAccount(uNo);
  }

  // Update
  // 내 정보 수정하기
  @PostMapping("/myInfoModify")
  public boolean myInfoModify(MyPageDTO dto) {
    accountService.myInfoModify(dto);
    return true;
  }

  // 내 관심사 수정하기
  @PostMapping("/interestUpdate")
  public void interestUpdate(InterestDTO interestDTO) {
    accountService.interestUpdate(interestDTO);
  }

  // 계모임 계좌 정보 업데이트
  @PostMapping("/myAccountUpdate")
  public void myAccountUpdate(DepositDTO depositDTO) {
    accountService.myAccountUpdate(depositDTO);
  }

  // Delete
}
