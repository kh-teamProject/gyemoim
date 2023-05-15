package com.team.gyemoim.vo;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class BoardVO {

    private int bid;
    private Integer uNo;
    private String type; // 글 종류 (공지사항/1:1 문의사항)
    private String name;
    private String title;
    private int views;
    private String content;
    private Date writeDate;
    private String secret;

}
