package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.board.*;
import com.team.gyemoim.vo.AttachedVO;
import com.team.gyemoim.vo.BoardVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {

    /* 생성 (Create) */
    // 게시글 번호 조회
    int getBid() throws Exception;
    // 게시글 작성
    void insert(BoardVO boardVO) throws Exception;

    /* 조회 (Read) */
    // 검색 후 검색에 해당하는 게시글 리스트 조회하기(사용 o)
    List<BoardVO> searchList(BoardListDTO dto) throws Exception;
    // 특정 게시글 상세보기
    BoardVO readDetail(int boardBid);
    // 조회여부 테이블 생성
    Integer createBoardReadCountHistory(BoardReadCountDTO dto);
    // 조회 횟수 가져오기
    int selectReadCount(BoardReadCountDTO dto);
    // 조회수 올리기
    void updateViewCnt(int boardBid);

    /* 수정( Update) */
    // 수정 전 게시글 내용 가져오기
    BoardVO modify(int bid);
    // 게시글 정보 수정하기
    void modifyUpdate(BoardModifyDTO boardModifyDTO) throws Exception;

    /* 삭제 (Delete) */
    // 게시글 삭제
    void delete(BoardDeleteDTO boardDeleteDTO) throws Exception;


    /* 첨부파일 */
    /* (Create) */
    // 첨부파일 생성
    void saveAttached(AttachedVO attachedVO);

    /* (Read) */
    // 첨부파일 상세보기
    AttachedVO getAttachedById(int bid);


}
