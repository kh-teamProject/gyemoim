package com.team.gyemoim.controller;

import com.team.gyemoim.vo.PF;
import com.team.gyemoim.service.stage.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StageListController {

  private final ListService listService;

  @GetMapping("/stage")
  public List<PF> Stage() {
    return listService.getPFList();
  }
}
