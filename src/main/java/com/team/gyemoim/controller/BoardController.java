package com.team.gyemoim.controller;

import com.team.gyemoim.dto.board.BoardDeleteDTO;
import com.team.gyemoim.dto.board.BoardModifyDTO;
import com.team.gyemoim.dto.board.BoardWriteDTO;
import com.team.gyemoim.service.BoardService;
import com.team.gyemoim.service.ReplyService;
import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.PageVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {

    public final BoardService boardService;

    public final ReplyService replyService;

    // 전체 게시글 목록 조회하는 API
    @GetMapping("/board/notice/list")
    public List<BoardVO> getBoardList() throws Exception {

        return boardService.selectBoard();
    }


    // 검색어, 검색 타입 받아서 그 검색된 게시글 리스트 조회 API
    // [GET /board/notice/searchList?searchType={searchType}&searchKeyword={searchKeyword}]
    @GetMapping("/board/notice/searchList")
    public List<BoardVO> searchList(@RequestParam("searchType") String searchType, @RequestParam("searchKeyword") String searchKeyword) throws Exception {
        PageVO spv = new PageVO(searchType, searchKeyword);


        return boardService.searchList(spv);

    }



    // 게시글 작성 API (Create)
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


    /* 글 수정 API (Update) */
    // 수정 전 기존 글 가져오기 (첨부파일은 일단 제외)
    @GetMapping("/board/notice/modify")
    public BoardVO modify(@RequestParam("bid") int bid) throws Exception {
        System.out.println("수정 전 bid 들어오니? : " + bid);
        return boardService.modify(bid);

        /*try {
            return ResponseEntity.ok("BoardController 글 수정 전 내용 가져오기 완료  :D");
        } catch (Exception e) {
            System.out.println("BoardController 글 수정 전 페이지 끌어오기 실패 :< ");
            System.out.println("error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController 글 modify 수정 실패 :< ");
        }*/
    }

    // 글 수정 업데이트하기
    @PostMapping("/board/notice/modifyPost")
    public ResponseEntity<String> modifyPost(@RequestBody BoardModifyDTO boardModifyDTO) {
        try {
            boardService.modifyUpdate(boardModifyDTO);
            return ResponseEntity.ok("BoardController 글 수정 업뎃 완료  :D");
        } catch (Exception e) {
            System.out.println("BoardController 글 수정 실패 :< ");
            System.out.println("error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController 글 수정 실패 :< ");
        }
    }



    /* 삭제 Delete */
    @DeleteMapping("/board/notice/delete")
    public ResponseEntity<String> delete(@RequestBody BoardDeleteDTO boardDeleteDTO) {
        try {
            System.out.println("BoardController.delete 글 삭제 성공 :D!");
            System.out.println("boardDelete 이리 오너라: " + boardDeleteDTO);
            boardService.delete(boardDeleteDTO);
            return ResponseEntity.ok("BoardController.delete 글 삭제 성공 :D");
        } catch (Exception e) {
            System.out.println("BoardController.delete 글 삭제 실패 :<");
            System.out.println("BoardController 글 삭제 왜 안돼? 에러 이유: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController 글 삭제 실패 :< ");
        }
    }


}
