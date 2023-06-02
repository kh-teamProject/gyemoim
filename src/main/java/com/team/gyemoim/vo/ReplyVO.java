package com.team.gyemoim.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ReplyVO {
    
    private int rno; // 댓글 번호
    private int bid; // 게시글 번호
    private Integer uNo; // 댓글 작성자의 회원번호
    private Date repDate; // 댓글 작성일자
    private String replyComm; // 댓글 내용

}
