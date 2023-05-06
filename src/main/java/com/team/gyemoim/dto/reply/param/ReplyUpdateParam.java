package com.team.gyemoim.dto.reply.param;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyUpdateParam {
    
    private int rno; // 댓글번호
    private String comm; // 댓글 내용

    public ReplyUpdateParam(int rno, String comm) {
        this.rno = rno;
        this.comm = comm;
    }

}
