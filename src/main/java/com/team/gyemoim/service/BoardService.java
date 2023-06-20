package com.team.gyemoim.service;

import com.team.gyemoim.dto.board.*;
import com.team.gyemoim.vo.AttachedVO;
import com.team.gyemoim.vo.BoardVO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {

    /* 게시글 생성 C */
    // 첨부파일 업로드 포함 게시글 작성하기
    int writePost(BoardWriteDTO boardWrite, MultipartFile file) throws Exception;

    /* 게시글 조회 R */
    // 검색 후 검색에 해당하는 게시글 리스트 조회하기
    List<BoardVO> searchList(BoardListDTO dto) throws Exception;
    // 특정 게시글 상세보기
    //BoardVO readDetail(int bid, boolean increaseViews) throws Exception;
    BoardVO readDetail(BoardReadCountDTO dto) throws Exception;

    /* 게시글 수정 U */
    // 수정 전 글 정보 불러오기
    BoardVO modify(int bid) throws Exception;
    // 게시글 수정하기
    void modifyUpdate(BoardModifyDTO boardModifyDTO) throws Exception;

    /* 게시글 삭제 D */
    // 게시글 삭제하기
    void delete(BoardDeleteDTO boardDeleteDTO) throws Exception;

    /* 첨부파일 R */
    // 첨부파일 상세보기
    AttachedVO getAttachedById(int attachedID) throws Exception;

}
