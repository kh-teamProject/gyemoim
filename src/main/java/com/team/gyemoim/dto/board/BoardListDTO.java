package com.team.gyemoim.dto.board;

import lombok.Data;

@Data
public class BoardListDTO {

    // 검색 필터
    private String searchType; // 검색어 타입 ex) 작성자, 제목, 내용 ...
    private String searchKeyword; // 검색어 내용


    // 게시글 타입 (공지사항 vs 1:1 문의사항)
    private String type;


    public BoardListDTO(String searchType, String searchKeyword, String type) {
        this.searchType = searchType;
        this.searchKeyword = searchKeyword;
        this.type = type;
    }
}
