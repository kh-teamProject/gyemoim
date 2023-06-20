package com.team.gyemoim.dto.reply;

import lombok.Data;

@Data
public class CreateReplyParamDTO {
    private int bid;// 게시글 번호
    private int rno;// 댓글 번호
    private Integer uNo;// 댓글 작성자 회원번호
    private String name;// 댓글 작성자 이름
    private String replyComm;// 댓글 내용

    public CreateReplyParamDTO(int bid, CreateReplyRequestDTO createReplyRequestDTO) {
        this.bid = bid;
        this.uNo = createReplyRequestDTO.getUNo();
        this.name = createReplyRequestDTO.getName();
        this.replyComm = createReplyRequestDTO.getReplyComm();
    }

}
