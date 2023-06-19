package com.team.gyemoim.controller.admin;

import com.team.gyemoim.service.admin.AdminAccountService;
import com.team.gyemoim.vo.MemberVO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class AdminAccountController {

  private final AdminAccountService accountService;

  @GetMapping("/getMember")
  public List<MemberVO> getMember() {
    return accountService.getMember();
  }

  @GetMapping("/getInterest")
  public List<Map<String, Object>> getInterest() {
    return accountService.getInterest();
  }

  @GetMapping("/getAverageExpenditure")
  public List<Map<String, Object>> getAverageExpenditure() {
    return accountService.getAverageExpenditure();
  }

  @GetMapping("/getMemberRole")
  public List<Map<String, Object>> getMemberRole() { return accountService.getMemberRole();}

  @GetMapping("/getTotalMember")
  public ResponseEntity<Integer> getTotalMemberCount(){
    int getTotalMemberCount = accountService.getTotalMemberCount();
    return ResponseEntity.ok().body(getTotalMemberCount);
  }
}
