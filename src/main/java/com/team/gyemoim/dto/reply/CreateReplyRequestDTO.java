package com.team.gyemoim.dto.reply;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class CreateReplyRequestDTO {
    private int bid;
    private Integer uNo;
    private String replyComm;

}
