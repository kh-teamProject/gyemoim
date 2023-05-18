package com.team.gyemoim.dto.board;

import lombok.Data;

@Data
public class BoardListDTO {

    private int bid;
    private String name;
    private String title;
    private String content;
    private String views;
    private String writeDate;

    // 검색 필터
    private String searchType; // 검색어 타입 ex) 작성자, 제목, 내용 ...
    private String searchKeyword; // 검색어 내용

}
