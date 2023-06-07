package com.team.gyemoim.vo;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
public class AttachedVO {

    private int attachedID; // 첨부파일 id
    private int bid; // 파일이 있는 게시글 번호
    private String filename; // 파일명
    private long fileSize; // 파일 크기
    private String fileType; // 파일 타입
    private String filePath; // 파일 경로
    private Timestamp uploadDate; // 업로드 일시
    private Timestamp modifyDate; // 수정 일시


    public AttachedVO() {

    }

    public AttachedVO(int attachedID, int bid, String filename, int fileSize, String fileType, String filePath, Timestamp uploadDate, Timestamp modifyDate) {
        this.attachedID = attachedID;
        this.bid = bid;
        this.filename = filename;
        this.fileSize = fileSize;
        this.fileType = fileType;
        this.filePath = filePath;
        this.uploadDate = uploadDate;
        this.modifyDate = modifyDate;
    }

    public AttachedVO dtoToVO(int bid,MultipartFile file){
        AttachedVO vo = new AttachedVO();
        vo.setBid(bid);
        vo.setFilename(file.getOriginalFilename());
        vo.setFileSize(file.getSize());
        vo.setFileType(file.getContentType());
        vo.setUploadDate(Timestamp.valueOf(LocalDateTime.now()));
        vo.setModifyDate(Timestamp.valueOf(LocalDateTime.now()));
        return vo;
    }

}
