package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.board.*;
import com.team.gyemoim.vo.AttachedVO;
import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.PageVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

    /* BoardWriteDAO (Create) */
    int getBid() throws Exception; // 게시글 번호 조회
    void insert(BoardVO boardVO) throws Exception; // 게시글 작성


    /* BoardDAO (Read) */
    // 검색 후 검색에 해당하는 게시글 리스트 조회하기(사용 o)
    List<BoardVO> searchList(BoardListDTO dto) throws Exception;
    //int countBoard(); // 게시글 총 갯수 구하기
    //List<BoardVO> selectBoard(PageVO vo); // 게시글 조회하기
    List<BoardVO> selectBoard(); // 게시글 조회하기
    BoardVO readDetail(int bid); // 특정 게시글 상세보기
    //Integer createBoardRecordCountHistory(BoardReadCountDTO dto); // 조회수 레코드 생성 or 업데이트
    void updateViewCnt(int bid); // 조회수 올리기



    /* 수정 BoardModifyDAO (Update) */
    BoardVO modify(int bid); // 원래 글 정보 끌고오기
    void modifyUpdate(BoardModifyDTO boardModifyDTO) throws Exception; // 게시글 정보 수정하기


    /* 삭제 BoardDeleteDAO (Delete) */
    void delete(BoardDeleteDTO boardDeleteDTO) throws Exception; // 게시글 삭제하기


    /* 첨부파일 관련 mapper */
    // 첨부파일 생성
    void saveAttached(AttachedVO attachedVO);

    // 첨부파일 상세보기
    AttachedVO getAttachedById(int bid);


}
