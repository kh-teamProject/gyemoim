package com.team.gyemoim.controller;

import com.team.gyemoim.dto.BoardDeleteDTO;
import com.team.gyemoim.dto.BoardWriteDTO;
import com.team.gyemoim.service.BoardService;
import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.PageVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpHeaders;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {

    public final BoardService boardService;

    
    @GetMapping("/board/notice/list")
    public List<BoardVO> getBoardList(@RequestParam(value = "nowPage", required = false, defaultValue = "1") int nowPage,
                                      @RequestParam(value = "cntPerPage", required = false, defaultValue = "10") int cntPerPage) throws Exception {
        int total = boardService.countBoard();

        if (nowPage == 0 && cntPerPage == 0) {
            nowPage = 1;
            cntPerPage = 10;
        } else if (nowPage == 0) {
            nowPage = 1;
        } else if (cntPerPage == 0) {
            cntPerPage = 10;
        }

        PageVO pageVO = new PageVO(total, nowPage, cntPerPage);

        return boardService.selectBoard(pageVO);
    }

    /* 생성 Create */
    @PostMapping("/board/notice/writePost")
    public ResponseEntity<String> writePost(@ModelAttribute BoardWriteDTO boardWriteDTO) {
        System.out.println("BoardController_writePost_들어왔다!! 오예압 ");
        System.out.println("BoardWriteDTO: " + boardWriteDTO);
        try {
            boardService.write(boardWriteDTO);
            return ResponseEntity.ok("BoardController_writePost_Success :D");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("BoardController_writePost_Error: " + e.getMessage());
        }
    }


    /* 읽기 Read */


    /* 수정 Update */


    /* 삭제 Delete */
    @DeleteMapping("/board/notice/delete")
    public String delete(@RequestBody BoardDeleteDTO dto) throws Exception {
        System.out.println("/board/delete BoardDeleteDTO = " + dto);
        HttpHeaders headers = new HttpHeaders();
        boardService.delete(dto);
        return "";
    }


}
