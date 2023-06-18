package com.team.gyemoim.dto.admin;

import lombok.Data;

@Data
public class AdminReplyListParamDTO {

    // 검색 필터
    private String searchType; // 검색어 타입 ex) 작성자, 제목, 내용 ...
    private String searchKeyword; // 검색어 내용

    // 게시글 타입 (공지사항 vs 1:1 문의사항)
    private String bType;

    public AdminReplyListParamDTO(String searchType, String searchKeyword, String bType) {
        this.searchType = searchType;
        this.searchKeyword = searchKeyword;
        this.bType = bType;
    }
}
