package com.team.gyemoim.dto;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

// 화면에서 받는 데이터
@Data
@ToString
public class BoardModifyDTO {
    private int bid;
    private Integer uNo;
    private String name;
    private String title;
    private String content;
    private Date writeDate;
    private String secret;
    private MultipartFile uploadFile; // 업로드 하는 파일
    private String fileName; // 업로드하는 파일 이름
}
