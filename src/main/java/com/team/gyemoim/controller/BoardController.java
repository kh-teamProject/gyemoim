package com.team.gyemoim.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.gyemoim.config.FileUploadConfig;
import com.team.gyemoim.dto.board.*;
import com.team.gyemoim.service.BoardService;
import com.team.gyemoim.vo.AttachedVO;
import com.team.gyemoim.vo.BoardVO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Import(FileUploadConfig.class) // FileUploadConfig 를 컨텍스트에 등록
public class BoardController {

    public final BoardService boardService;

    // 전체 게시글 목록 조회하는 API
    @GetMapping("/board/notice/list")
    public List<BoardVO> getBoardList() throws Exception {
        return boardService.selectBoard();
    }

    // 검색어, 검색 타입 받아서 그 검색된 게시글 리스트 조회 API
    // [GET /board/searchList?type={type}&searchType={searchType}&searchKeyword={searchKeyword}]
    @GetMapping("/board/searchList")
    public List<BoardVO> searchList(BoardListDTO dto) throws Exception {
        return boardService.searchList(dto);
    }


    /* 첨부파일 포함한 게시글 작성 API (Create) */
    @PostMapping("/board/writePost")
    public ResponseEntity<String> writePost(@RequestPart(value = "file", required = false) MultipartFile file,
                                            @RequestParam("boardWriteDTO") String boardWriteDTOJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            BoardWriteDTO boardWriteDTO = objectMapper.readValue(boardWriteDTOJson, BoardWriteDTO.class);
            // 게시글 저장하고 작성된 게시글의 고유 식별자 bid 반한하는 코드
            int bid = boardService.writePost(boardWriteDTO, file);
            return ResponseEntity.ok("BoardController 글 작성 writePost 돌아간닷 첨부파일도 포함이닷 ! :D");
        } catch (Exception e) {
            System.out.println("error 메시지: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("글 작성 실패 :< -FROM BoardController_writePost-");
        }
    }


    /* 게시글 읽기 API (Read) [GET /board/notice/read/{bid}] */
   @GetMapping("/board/read")
    public BoardVO read(@RequestParam("bid") int bid, @RequestParam(value = "increaseViews", defaultValue = "true") boolean increaseViews) throws Exception {
        BoardVO boardVO = boardService.readDetail(bid, increaseViews);
        return boardVO;
    }


    /* 첨부파일 존재여부 확인 API */
    @GetMapping("/board/attachment")
    public ResponseEntity<?> getAttachment(@RequestParam("bid") int bid) {
        try {
            AttachedVO attachedVO = boardService.getAttachedById(bid);
            if (attachedVO != null) {
                return ResponseEntity.ok(attachedVO);// 첨부파일 있으면 첨부파일 반환
            } else {
                return ResponseEntity.ok().build();// 첨부파일 없으면 빈 응답 반환
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("컨트롤러_첨부파일 가져오기 실패 :<");
        }
    }

    /* 글 수정 API (Update) */
    // 수정 전 기존 글 가져오기 (첨부파일은 일단 제외)
    @GetMapping("/board/modify")
    public BoardVO modify(@RequestParam("bid") int bid) throws Exception {
        return boardService.modify(bid);
    }

    // 글 수정 업데이트하기
    @PostMapping("/board/modifyPost")
    public ResponseEntity<String> modifyPost(@RequestBody BoardModifyDTO boardModifyDTO) {
        try {
            // 게시글 저장하고 작성된 게시글의 고유 식별자 bid 반한하는 코드
            boardService.modifyUpdate(boardModifyDTO);
            return ResponseEntity.ok("BoardController 글 수정 업뎃 완료, 첨부파일도 포함이닷 ! :D");
        } catch (Exception e) {
            System.out.println("error 메시지: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController 글 수정 실패 :< ");
        }
    }

    /* 삭제 Delete */
    @DeleteMapping("/board/delete")
    public ResponseEntity<String> delete(@RequestBody BoardDeleteDTO boardDeleteDTO) {
        try {
            System.out.println("*************** 글 삭제 delete 컨트롤러 성공 >< *****************");
            System.out.println("boardDelete 이리 오너라: " + boardDeleteDTO);
            boardService.delete(boardDeleteDTO);
            return ResponseEntity.ok("BoardController.delete 글 삭제 성공 :D");
        } catch (Exception e) {
            System.out.println("*************** 글 삭제 delete 컨트롤러 실패 :< *****************");
            System.out.println("에러 이유: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController 글 삭제 실패 :< ");
        }
    }


}
