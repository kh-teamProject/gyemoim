package com.team.gyemoim.dto.admin;

import lombok.Data;

@Data
public class AdminListParamDTO {

    // 검색 필터
    private String searchType;
    private String searchKeyword;

    public AdminListParamDTO(String searchType, String searchKeyword) {
        this.searchType = searchType;
        this.searchKeyword = searchKeyword;
    }
}
