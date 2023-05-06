package com.team.gyemoim.mapper;

import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.PageVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {

    int countBoard(); // 게시글 총 갯수 구하기

    int searchCountBoard(PageVO spv); // 검색 후 게시글 갯수 구하기

    List<BoardVO> selectBoard(PageVO vo); // 페이징 처리 후 게시글 조회하기

    BoardVO readDetail(int bid); // 특정 게시글 상세보기
    
    void updateViewCnt(int bid) throws Exception; // 조회수 올리기
    
    List<BoardVO> searchList(PageVO spv) throws Exception; // 검색 후 검색에 해당하는 게시글 리스트 조회하기(페이징 동시에 검색)
    
}
