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
    void write(BoardWriteDTO boardWriteDTO) throws Exception; // 게시글 쓰기
   // void addAttachedName(String savedName) throws Exception; // 첨부파일 쓰기



    /* BoardDAO (Read) */
    // 검색 후 페이징 된 게시글 갯수 구하기 (사용 o)
    int searchCountBoard(PageVO spv);

    // 검색 후 검색에 해당하는 게시글 리스트 조회하기(사용 o)
    List<BoardVO> searchList(BoardListDTO dto) throws Exception;

    //int countBoard(); // 게시글 총 갯수 구하기
    //List<BoardVO> selectBoard(PageVO vo); // 게시글 조회하기
    List<BoardVO> selectBoard(); // 게시글 조회하기
    BoardVO readDetail(int bid); // 특정 게시글 상세보기
   // Integer createBoardRecordCountHistory(BoardReadCountDTO dto); // 조회수 레코드 생성 or 업데이트
    void updateViewCnt(int bid); // 조회수 올리기



    /* BoardModifyDAO (Update) */
    BoardVO modify(int bid); // 원래 글 정보 끌고오기
    void modifyUpdate(BoardModifyDTO boardModifyDTO) throws Exception; // 게시글 정보 수정하기
    //AttachedVO attached(int bid); // 원래 글에 있는 첨부파일 끌고오기
   // void addAttachedUpdate(BoardModifyDTO boardModifyDTO) throws Exception; // 새로운 첨부파일 추가하기


    /* 삭제 BoardDeleteDAO (Delete) */
    void delete(BoardDeleteDTO boardDeleteDTO) throws Exception; // 게시글 삭제하기



    /* 게시글 리스트 관련해서 가져온 코드 */
    /*
    List<BoardVO> getBbsSearchPageList(BoardListParam param);// 검색 후 페이징해서 게시글들 리스트로 가져오기
    Integer getBbsCount(BbsCountParam param);// 게시글 개수 구하기

    // Bbs == BoardVO
    Bbs getBbs(Integer seq);// 특정 게시글 번호 가지고 게시글들 가져오기
    Integer createBbsReadCountHistory(CreateReadCountParam param);//
    Integer increaseBbsReadCount(Integer seq); // 조회수 올리기?
    */

}
