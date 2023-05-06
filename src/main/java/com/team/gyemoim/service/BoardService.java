package com.team.gyemoim.service;

import com.team.gyemoim.dto.BoardDeleteDTO;
import com.team.gyemoim.dto.BoardWriteDTO;
import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.PageVO;

import java.util.List;

public interface BoardService {

    /* 생성 C */
    void write(BoardWriteDTO boardWriteDTO) throws Exception;

    /* 조회 R */
    int countBoard() throws Exception;

    int searchCountBoard(PageVO spv) throws Exception;

    List<BoardVO> selectBoard(PageVO vo) throws Exception;

    BoardVO readDetail(int bid) throws Exception;

    List<BoardVO> searchList(PageVO spv) throws Exception;


    /* 수정 U */


    /* 삭제 D */
    void delete(BoardDeleteDTO boardDeleteDTO) throws Exception;



}
