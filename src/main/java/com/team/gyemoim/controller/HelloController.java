package com.team.gyemoim.controller;

import com.team.gyemoim.dto.StageListDTO;
import com.team.gyemoim.dto.TestDTO;
import com.team.gyemoim.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HelloController {

  private final TestService testService;

  @GetMapping("/hello")
  public List<TestDTO> hello() {
    return testService.getUserList();
  }
  @GetMapping("/test")
  public List<StageListDTO> test(@RequestParam("pfID") int pfID){
    System.out.println("테스트 돌아가연" + pfID);
    return testService.getTestList(pfID);
  }
}
