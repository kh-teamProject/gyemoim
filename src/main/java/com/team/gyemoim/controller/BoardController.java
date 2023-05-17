package com.team.gyemoim.controller;

import com.team.gyemoim.dto.board.BoardDeleteDTO;
import com.team.gyemoim.dto.board.BoardListDTO;
import com.team.gyemoim.dto.board.BoardWriteDTO;
import com.team.gyemoim.service.BoardService;
import com.team.gyemoim.service.ReplyService;
import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.ReplyVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpHeaders;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {

    public final BoardService boardService;

    public final ReplyService replyService;

    // 게시글 목록 API [GET /board/notice/list?type
    @GetMapping("/board/notice/list")
    public List<BoardListDTO> getBoardList() throws Exception {
        int total = boardService.countBoard();// 게시글 전체 갯수

        System.out.println("BoardController.getBoardList 들어왔다 :D ");

        return boardService.selectBoard();// 게시글 조회하기
    }



    @PostMapping("/board/notice/writePost")
    public ResponseEntity<String> writePost(@RequestBody BoardWriteDTO boardWriteDTO) {
        try {
            boardService.write(boardWriteDTO);
            return ResponseEntity.ok("BoardController 글 작성 돌아간닷! :D");
        } catch (Exception e) {
            System.out.println("BoardController 글 작성 실패 writePost 에러 발생함 :< ");
            System.out.println("error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController 글 작성 실패 :< ");
        }
    }


    /* 읽기 Read */
    @GetMapping("/board/notice/read/${bid}")
    public BoardVO read(@RequestParam("bid") int bid) throws Exception {

        List<ReplyVO> replyVOList = replyService.reply(bid);
        BoardVO boardVO = boardService.readDetail(bid);


        return boardVO;
    }


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
