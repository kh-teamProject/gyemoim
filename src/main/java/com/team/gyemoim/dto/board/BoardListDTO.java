package com.team.gyemoim.dto.board;

import lombok.Data;

@Data
public class BoardListDTO {

    private String btype;// 게시글 타입 (공지사항 or 1:1 문의사항)

    /* 검색 필터 */
    private String searchType;// 검색어 타입
    private String searchKeyword;// 검색어 내용

    public BoardListDTO(String searchType, String searchKeyword, String btype) {
        this.searchType = searchType;
        this.searchKeyword = searchKeyword;
        this.btype = btype;
    }
}
