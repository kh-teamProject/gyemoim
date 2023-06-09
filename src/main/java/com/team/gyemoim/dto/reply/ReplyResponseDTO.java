package com.team.gyemoim.dto.reply;

import com.team.gyemoim.vo.ReplyVO;
import lombok.Data;

import java.util.List;

@Data
public class ReplyResponseDTO {

    private List<ReplyVO> replyVOList; // 댓글 리스트

    public ReplyResponseDTO(List<ReplyVO> replyVOList) {
        this.replyVOList = replyVOList;
    }

}
