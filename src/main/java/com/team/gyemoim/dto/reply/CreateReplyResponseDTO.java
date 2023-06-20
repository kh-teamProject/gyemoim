package com.team.gyemoim.dto.reply;

import com.team.gyemoim.vo.ReplyVO;
import lombok.Data;

import java.util.List;

@Data
public class CreateReplyResponseDTO {
    private int bid;

    public CreateReplyResponseDTO(int bid) {
        this.bid = bid;
    }
}
