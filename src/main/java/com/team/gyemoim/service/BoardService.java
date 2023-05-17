package com.team.gyemoim.service;

import com.team.gyemoim.dto.board.BoardDeleteDTO;
import com.team.gyemoim.dto.board.BoardListDTO;
import com.team.gyemoim.dto.board.BoardModifyDTO;
import com.team.gyemoim.dto.board.BoardWriteDTO;
import com.team.gyemoim.vo.AttachedVO;
import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.PageVO;

import java.util.List;

public interface BoardService {

    /* 게시글 생성 C */
    void write(BoardWriteDTO boardWriteDTO) throws Exception; // 게시글 작성하기


    /* 게시글 조회 R */
    int countBoard() throws Exception; // 게시글 총 갯수 구하기
    int searchCountBoard(PageVO spv) throws Exception; // 검색 후 게시글 갯수 구하기
    List<BoardListDTO> selectBoard() throws Exception; // 게시글 조회하기
    BoardVO readDetail(int bid) throws Exception; // 특정 게시글 상세보기
    List<BoardVO> searchList(PageVO spv) throws Exception; // 검색 후 검색에 해당하는 게시글 리스트로 조회하기 (페이징 동시에 검색)




    /* 게시글 삭제 D */
    void delete(BoardDeleteDTO boardDeleteDTO) throws Exception; // 게시글 삭제하기



    /* 게시글 수정 U */
    // 수정페이지 불러오기
    BoardVO modify(int bid) throws Exception; // 수정 전 원래 글 정보 끌고오기

    // 수정페이지 첨부파일 불러오기
    AttachedVO attached(int bid) throws Exception; // 수정 전 원래 글에 있는 첨부파일 끌고오기

    // 기존 첨부파일 삭제
    AttachedVO deleteFile(String fileName) throws Exception;

    // 게시글 및 첨부파일 수정하기
    public void modifyUpdate(BoardModifyDTO boardModifyDTO) throws Exception; // 게시글 정보 수정하기


}
