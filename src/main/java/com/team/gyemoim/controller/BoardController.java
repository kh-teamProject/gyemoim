package com.team.gyemoim.controller;

import com.team.gyemoim.dto.BoardDeleteDTO;
import com.team.gyemoim.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpHeaders;

@RestController
@RequiredArgsConstructor
public class BoardController {

    public final BoardService boardService;


    /* 생성 Create */
    @PostMapping("/board/writePost")


    /* 읽기 Read */



    /* 수정 Update */


    /* 삭제 Delete */
    @DeleteMapping("/board/delete")
    public String delete(@RequestBody BoardDeleteDTO dto) throws Exception {
        System.out.println("/board/delete BoardDeleteDTO = " + dto);
        HttpHeaders headers = new HttpHeaders();
        boardService.delete(dto);
        return "";
    }






}
