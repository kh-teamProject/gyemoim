package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.BoardDeleteDTO;
import com.team.gyemoim.dto.BoardListDTO;
import com.team.gyemoim.dto.BoardModifyDTO;
import com.team.gyemoim.dto.BoardWriteDTO;
import com.team.gyemoim.vo.AttachedVO;
import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.PageVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {

    /* BoardWriteDAO (Create) */
    void write(BoardWriteDTO boardWriteDTO) throws Exception; // 게시글 쓰기
    void addAttachedName(String savedName) throws Exception; // 첨부파일 쓰기



    /* BoardDAO (Read) */
    int countBoard(); // 게시글 총 갯수 구하기
    List<BoardListDTO> selectBoard(); // 게시글 조회하기
    int searchCountBoard(PageVO spv); // 검색 후 게시글 갯수 구하기
    BoardVO readDetail(int bid); // 특정 게시글 상세보기
    void updateViewCnt(int bid) throws Exception; // 조회수 올리기
    List<BoardVO> searchList(PageVO spv) throws Exception; // 검색 후 검색에 해당하는 게시글 리스트 조회하기(페이징 동시에 검색)



    /* BoardModifyDAO (Update) */
    BoardVO modify(int bid); // 원래 글 정보 끌고오기
    AttachedVO attached(int bid); // 원래 글에 있는 첨부파일 끌고오기
    void modifyUpdate(BoardModifyDTO boardModifyDTO) throws Exception; // 게시글 정보 수정하기
    void addAttachedUpdate(BoardModifyDTO boardModifyDTO) throws Exception; // 새로운 첨부파일 추가하기


    /* BoardDeleteDAO (Delete) */
    void delete(BoardDeleteDTO boardDeleteDTO) throws Exception; // 게시글 삭제하기



    
    
}
