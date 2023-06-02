package com.team.gyemoim.controller;

import com.team.gyemoim.dto.board.*;
import com.team.gyemoim.service.BoardService;
import com.team.gyemoim.service.ReplyService;
import com.team.gyemoim.vo.AttachedVO;
import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.PageVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardController {

    public final BoardService boardService;

    public final ReplyService replyService;

    private static final String UPLOAD_FOL = "/path/to/upload/folder"; // 실제 업로드 경로로 변경해야 함

    // 전체 게시글 목록 조회하는 API
    @GetMapping("/board/notice/list")
    public List<BoardVO> getBoardList() throws Exception {

        return boardService.selectBoard();
    }


    // 검색어, 검색 타입 받아서 그 검색된 게시글 리스트 조회 API
    // [GET /board/searchList?type={type}&searchType={searchType}&searchKeyword={searchKeyword}]
    @GetMapping("/board/searchList")
    public List<BoardVO> searchList(BoardListDTO dto) throws Exception {
        System.out.println("****************** 게시글 리스트 searchList 컨트롤러 성공 :D ******************");
        System.out.println("가져오는 게시글 종류: " + dto.getType());
        System.out.println("가져오는 검색어: " + dto.getSearchKeyword());

        return boardService.searchList(dto);
    }


    // 게시글 작성 API (Create)
    @PostMapping("/board/writePost")
    public ResponseEntity<String> writePost(@RequestPart MultipartFile file, @RequestBody BoardWriteDTO boardWriteDTO) {
        try {
            System.out.println("*************** 글 작성 writePost 컨트롤러 성공 >< *****************");
            System.out.println("글 종류 type: " + boardWriteDTO.getType());
            System.out.println("작성자 uNo: " + boardWriteDTO.getUno());
            System.out.println("작성자 이름: " + boardWriteDTO.getName());

            // 게시글 저장하고 작성된 게시글의 고유 식별자 bid 반한하는 코드
            int bid = boardService.writePost(boardWriteDTO);
            //boardService.write(boardWriteDTO);

            // 첨부파일 저장
            if (file != null) {
                // AttachedVO 객체 생성 및 정보 저장
                AttachedVO attachedVO = new AttachedVO();
                attachedVO.setFilename(file.getOriginalFilename());
                attachedVO.setFileSize(file.getSize());
                attachedVO.setFileType(file.getContentType());
                attachedVO.setFilePath(saveFile(file));
                attachedVO.setUploadDate(Timestamp.valueOf(LocalDateTime.now()));
                attachedVO.setModifyDate(Timestamp.valueOf(LocalDateTime.now()));
                // AttachedVO 객체를 데이터베이스에 저장 (첨부파일 생성)
                boardService.saveAttached(attachedVO);
            }
            return ResponseEntity.ok("BoardController 글 작성 writePost 돌아간닷 첨부파일도 포함이닷 ! :D");
        } catch (Exception e) {
            System.out.println("*************** 글 작성 writePost 컨트롤러 실패 :< *****************");
            System.out.println("작성자 uNo: " + boardWriteDTO.getUno());
            System.out.println("게시글 첨부파일: " + file);
            System.out.println("error 메시지: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("글 작성 실패 :< -FROM BoardController-");
        }
    }


    // 파일 실제 업로드 경로에 저장하는 로직
    // 'file' 객체에서 파일 이름 얻어와 경로를 생성하고 해당 경로에 파일을 저장한다.
    private String saveFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String filePath = UPLOAD_FOL + "/" + fileName;
        File dest = new File(filePath);
        file.transferTo(dest);

        return filePath;
    }


    /* 게시글 읽기 API (Read) [GET /board/notice/read/{bid}]
     * @PathVariable 어노테이션은 URL 경로 변수 값을 매개변수에 매핑할 때 사용함
     * @RequestParam 어노테이션은 요청 파라미터의 값을 매개변수에 매핑될 때 사용된
     * `bid` 매개변수에는 `bid` 라는 요청 파라미터의 값이 매핑된다. */
   /* @GetMapping("/board/read")
    public BoardVO read(@RequestParam("bid") int bid, @RequestParam(value = "increaseViews", defaultValue = "true") boolean increaseViews) throws Exception {
        System.out.println("*************** 글 읽기 read 컨트롤러 성공 >< *****************");

        *//*List<ReplyVO> replyVOList = replyService.reply(bid);*//*
        BoardVO boardVO = boardService.readDetail(bid);

        // 조회수 증가 여부에 따른 조회수 증가하기
//        if (increaseViews) {
//            boardService.updateViewCnt(bid);
//        }

        return boardVO;
    }*/

    @GetMapping("/board/read")
    public BoardVO read(@RequestParam("bid") int bid, @RequestParam(value = "increaseViews", defaultValue = "true") boolean increaseViews) throws Exception {
        System.out.println("*************** 글 읽기 read 컨트롤러 성공 >< *****************");

        /*List<ReplyVO> replyVOList = replyService.reply(bid);*/
        BoardVO boardVO = boardService.readDetail(bid);


        return boardVO;
    }


    /* 글 수정 API (Update) */
    // 수정 전 기존 글 가져오기 (첨부파일은 일단 제외)
    @GetMapping("/board/modify")
    public BoardVO modify(@RequestParam("bid") int bid) throws Exception {
        System.out.println("*************** 글 수정 modify 컨트롤러 성공 >< *****************");
        System.out.println("수정 전 bid 들어오니? : " + bid);

        return boardService.modify(bid);
    }

    // 글 수정 업데이트하기
    @PostMapping("/board/modifyPost")
    public ResponseEntity<String> modifyPost(@RequestBody BoardModifyDTO boardModifyDTO) {
        try {
            System.out.println("*************** 글 수정 modifyPost 컨트롤러 성공 >< *****************");
            boardService.modifyUpdate(boardModifyDTO);
            return ResponseEntity.ok("BoardController 글 수정 업뎃 완료  :D");
        } catch (Exception e) {
            System.out.println("*************** 글 수정 modify 컨트롤러 실패 :< *****************");
            System.out.println("에러 이유: " + e.getMessage());
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
