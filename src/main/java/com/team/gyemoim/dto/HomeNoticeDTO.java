package com.team.gyemoim.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class HomeNoticeDTO {
  private int bid; // 게시글 번호
  private Integer uNo; // 글 작성자 회원번호
  private String bType; // 글 종류 (공지사항/1:1 문의사항)
  private String name; // 글 작성자 이름
  private String title; // 글 제목
  private int views; // 조회수
  private String content; // 내용
  private Date writeDate; // 글 작성일자
  private String secret; // 글 공개여부

}
