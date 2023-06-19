package com.team.gyemoim.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ReadHistoryVO {
    private Integer readerUno;// 게시글 조회하는 회원번호
    private int boardBid;// 조회하는 게시글 번호
    private Date latest_access_at;// 조회시간
    private int readCount; // 게시글 조회 확인 횟수
}
