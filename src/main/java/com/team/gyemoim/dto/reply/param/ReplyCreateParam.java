package com.team.gyemoim.dto.reply.param;

import com.team.gyemoim.dto.board.request.ReplyCreateRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ReplyCreateParam {

    private int bid; // 게시판 번호
    private int rno; // 댓글 번호
    private Integer uNo; // 댓글 작성자 회원번호
    private String comm; // 댓글 내용

    private Date repDate; // 댓글 작성일자

    public ReplyCreateParam(int bid, ReplyCreateRequest req) {
        this.bid = bid;
        this.uNo = req.getUNo();
        this.comm = req.getComm();
    }

}
