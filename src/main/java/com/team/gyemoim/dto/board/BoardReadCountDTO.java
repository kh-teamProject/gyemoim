package com.team.gyemoim.dto.board;

import lombok.Data;
import lombok.ToString;

@Data
public class BoardReadCountDTO {

    private int boardBid; // 조회 게시글 번호
    private Integer readerUno; // 게시글 조회자 회원번호


    public BoardReadCountDTO(int boardBid, Integer readerUno) {
        this.readerUno = readerUno;
        this.boardBid = boardBid;
    }

}
