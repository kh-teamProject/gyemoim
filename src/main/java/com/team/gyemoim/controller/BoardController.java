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

    /* 검색어, 검색 타입 받아서 그 검색된 게시글 리스트 조회 API (Read) */
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
            return ResponseEntity.ok("BoardController_writePost_success :D");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController_writePost_failed_" + e.getMessage());
        }
    }


    /* 게시글 읽기 API (Read) [GET /board/notice/read/{bid}] */
    @GetMapping("/board/read")
    public BoardVO read(@RequestParam("boardBid") int boardBid, @RequestParam("readerUno") Integer readerUno) throws Exception {
        BoardReadCountDTO dto = new BoardReadCountDTO(boardBid, readerUno);
        BoardVO boardVO = boardService.readDetail(dto);

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController_getAttachment_failed_" + e.getMessage());
        }
    }

    /* 글 수정 API (Update) */
    // 수정 전 기존 글 가져오기 (첨부파일은 일단 제외)
    @GetMapping("/board/modify")
    public BoardVO modify(@RequestParam("bid") int bid) throws Exception {
        return boardService.modify(bid);
    }

    /* 글 수정 업데이트하기 */
    @PostMapping("/board/modifyPost")
    public ResponseEntity<String> modifyPost(@RequestBody BoardModifyDTO boardModifyDTO) {
        try {
            // 게시글 저장하고 작성된 게시글의 고유 식별자 bid 반한하는 코드
            boardService.modifyUpdate(boardModifyDTO);
            return ResponseEntity.ok("BoardController_modifyPost_success :D");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController_modifyPost_failed_" + e.getMessage());
        }
    }

    /* 삭제 (Delete) */
    @DeleteMapping("/board/delete")
    public ResponseEntity<String> delete(@RequestBody BoardDeleteDTO boardDeleteDTO) {
        try {
            boardService.delete(boardDeleteDTO);
            return ResponseEntity.ok("BoardController_delete_success :D");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("BoardController_delete_failed_" + e.getMessage());
        }
    }

}
