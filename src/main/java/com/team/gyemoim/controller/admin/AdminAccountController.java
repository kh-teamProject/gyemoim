package com.team.gyemoim.controller.admin;

import com.team.gyemoim.service.admin.AdminAccountService;
import com.team.gyemoim.vo.MemberVO;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class AdminAccountController {

  private final AdminAccountService accountService;

  @GetMapping("getMember")
  public List<MemberVO> getMember() {
    return accountService.getMember();
  }
}
