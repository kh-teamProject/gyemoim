package com.team.gyemoim.dto;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Data
@ToString
public class BoardWriteDTO {

    private Integer uNo; // 글 작성자 회원번호
    private String name; // 글 작성자 이름
    private String title; // 게시글 제목
    private String content; // 게시글 내용
    private String secret; // 글 여부 (공개/비공개)
    /*private MultipartFile uploadFile; // 업로드할 파일*/

}
