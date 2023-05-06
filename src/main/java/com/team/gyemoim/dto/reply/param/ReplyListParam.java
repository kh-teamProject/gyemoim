package com.team.gyemoim.dto.reply.param;

import com.team.gyemoim.dto.board.param.PageParam;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyListParam extends PageParam {

    private int bid; // 게시글 번호

    public ReplyListParam(int bid) {
        this.bid = bid;
    }

}
