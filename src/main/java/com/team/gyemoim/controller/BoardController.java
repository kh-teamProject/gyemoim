package com.team.gyemoim.controller;

import com.team.gyemoim.dto.board.BoardDeleteDTO;
import com.team.gyemoim.dto.board.BoardListDTO;
import com.team.gyemoim.dto.board.BoardModifyDTO;
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


    /* 게시글 읽기 API (Read) [GET /board/notice/read/{bid}]
    * @PathVariable 어노테이션은 URL 경로 변수 값을 매개변수에 매핑할 때 사용함
    * @RequestParam 어노테이션은 요청 파라미터의 값을 매개변수에 매핑될 때 사용된
    * `bid` 매개변수에는 `bid` 라는 요청 파라미터의 값이 매핑된다. */
    @GetMapping("/board/notice/read")
    public BoardVO read(@RequestParam("bid") int bid) throws Exception {

        /*List<ReplyVO> replyVOList = replyService.reply(bid);*/
        BoardVO boardVO = boardService.readDetail(bid);


        return boardVO;
    }


    /* 수정 Update */
    // 수정 전 기존 글 가져오기 (첨부파일은 일단 제외)
    @GetMapping("/board/notice/modify")
    public BoardVO modify(@RequestParam("bid") int bid) throws Exception {
        System.out.println("bid 들어오니? : " + bid);
        return boardService.modify(bid);

        /*try {
            return ResponseEntity.ok("BoardController 글 수정 전 내용 가져오기 완료  :D");
        } catch (Exception e) {
            System.out.println("BoardController 글 수정 전 페이지 끌어오기 실패 :< ");
            System.out.println("error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController 글 modify 수정 실패 :< ");
        }*/
    }

    // 글 수정하기
    @PostMapping("/board/notice/modifyPost")
    public ResponseEntity<String> modifyPost(@RequestParam BoardModifyDTO boardModifyDTO) {
        try {
            boardService.modifyUpdate(boardModifyDTO);
            return ResponseEntity.ok("BoardController 글 수정하기 완료  :D");
        } catch (Exception e) {
            System.out.println("BoardController 글 수정 실패 :< ");
            System.out.println("error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController 글 수정 실패 :< ");
        }
    }



    /* 삭제 Delete */
    @DeleteMapping("/board/notice/delete")
    public String delete(@RequestBody BoardDeleteDTO dto) throws Exception {
        System.out.println("/board/delete BoardDeleteDTO = " + dto);
        HttpHeaders headers = new HttpHeaders();
        boardService.delete(dto);
        return "";
    }


}
