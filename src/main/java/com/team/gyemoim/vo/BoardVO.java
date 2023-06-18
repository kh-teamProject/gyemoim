package com.team.gyemoim.vo;

import com.team.gyemoim.dto.board.BoardModifyDTO;
import com.team.gyemoim.dto.board.BoardWriteDTO;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class BoardVO {

    private int bid; // 게시글 번호
    private Integer uNo; // 글 작성자 회원번호
    private String bType; // 글 종류 (공지사항/1:1 문의사항)
    private String name; // 글 작성자 이름
    private String title; // 글 제목
    private int views; // 조회수
    private String content; // 내용
    private Date writeDate; // 글 작성일자
    private String secret; // 글 공개여부


    public BoardVO dtoToVO(BoardWriteDTO dto){
        BoardVO boardVO = new BoardVO();
        boardVO.setUNo(dto.getUNo());
        boardVO.setBType(dto.getBType());
        boardVO.setName(dto.getName());
        boardVO.setTitle(dto.getTitle());
        boardVO.setContent(dto.getContent());
        boardVO.setSecret(dto.getSecret());
        return boardVO;
    }

    public BoardVO modifyDtoToVO(BoardModifyDTO dto) {
        BoardVO boardVO = new BoardVO();
        boardVO.setBid(dto.getBid());
        boardVO.setUNo(dto.getUNo());
        boardVO.setName(dto.getName());
        boardVO.setTitle(dto.getTitle());
        boardVO.setContent(dto.getContent());
        boardVO.setSecret(dto.getSecret());
        return boardVO;
    }

}
