package com.team.gyemoim.dto;

import java.util.Date;

public class ReplyWriteDTO {
    private int bid; // 글 번호
    private Integer uNo; // 댓글 작성자 회원번호
    private String name; // 댓글 작성자 이름
    private Date repDate; // 댓글 작성일자
    private String comm; // 댓글 내용
}
