package com.team.gyemoim.dto.admin;

import lombok.Data;

import java.util.Date;

@Data
public class AdminReplyListDTO {
    private int rno;
    private int bid;
    private Integer uNo;
    private String name;
    private Date repDate;
    private String replyComm;
    private String btype; // Board 테이블 게시글 종류
}
