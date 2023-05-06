package com.team.gyemoim.dto.reply.response;

import com.team.gyemoim.vo.reply.ReplyVO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReplyResponse {

    private List<ReplyVO> replyVOList;
    private Integer pageCnt;

    public ReplyResponse(List<ReplyVO> replyVOList, Integer pageCnt) {
        this.replyVOList = replyVOList;
        this.pageCnt = pageCnt;
    }

}
