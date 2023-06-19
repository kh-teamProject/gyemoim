package com.team.gyemoim.dto.reply;

import lombok.Data;

@Data
public class CreateReplyParamDTO {
    private int bid;
    private int rno;
    private Integer uNo;
    private String name;
    private String replyComm;

    public CreateReplyParamDTO(int bid, CreateReplyRequestDTO createReplyRequestDTO) {
        this.bid = bid;
        this.uNo = createReplyRequestDTO.getUNo();
        this.name = createReplyRequestDTO.getName();
        this.replyComm = createReplyRequestDTO.getReplyComm();
    }

}
