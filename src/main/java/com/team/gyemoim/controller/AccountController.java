package com.team.gyemoim.controller;

import com.team.gyemoim.dto.BankHistoryDTO;
import com.team.gyemoim.dto.InterestDTO;
import com.team.gyemoim.dto.MyPageDTO;
import com.team.gyemoim.service.AccountService;
import com.team.gyemoim.vo.ExpenditureVO;
import com.team.gyemoim.vo.MyAccountVO;
import com.team.gyemoim.vo.MyAccountHistoryVO;
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
  @PostMapping("/bankHistory")
  public void deposit(BankHistoryDTO bankHistoryDTO) {
    accountService.deposit(bankHistoryDTO);
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

  // 계모임 계좌 정보 가져오기
  @GetMapping("/getMyAccount")
  public List<MyAccountVO> getMyAccount(@RequestParam Integer uNo) {
    return accountService.getMyAccount(uNo);
  }

  // 계모임 계좌 거래내역 가져오기
  @GetMapping("/getMyAccountHistory")
  public List<MyAccountHistoryVO> getMyAccountHistory(@RequestParam Integer uNo) {
    return accountService.getMyAccountHistory(uNo);
  }

  // 지출내역 가져오기
  @GetMapping("/getExpenditure")
  public List<ExpenditureVO> getExpenditure(@RequestParam Integer uNo) {
    return accountService.getExpenditure(uNo);
  }
  // Update
  // 내 정보 수정하기
  @PostMapping("/myInfoModify")
  public boolean myInfoModify(@RequestBody MyPageDTO dto) {
    List<ExpenditureVO> list = accountService.getExpenditure(dto.getUNo());
    if(list.isEmpty()) {
      accountService.myInfoModify(dto);
      accountService.createExpenditure(dto);
      return true;
    } else {
      accountService.myInfoModify(dto);
      accountService.updateExpenditure(dto);
      return true;
    }
  }

  // 내 관심사 수정하기
  @PostMapping("/interestUpdate")
  public void interestUpdate(InterestDTO interestDTO) {
    accountService.interestUpdate(interestDTO);
  }

  // 계모임 계좌 정보 업데이트
  @PostMapping("/myAccountUpdate")
  public void myAccountUpdate(BankHistoryDTO bankHistoryDTO) {
    accountService.myAccountUpdate(bankHistoryDTO);
  }


  // Delete
  
  // 회원 탈퇴
  @PostMapping("/memberDelete/{uNo}")
  public void memberDelete(@PathVariable Integer uNo) {
    accountService.memberDelete(uNo);
  }
}
