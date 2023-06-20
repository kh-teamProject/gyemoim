package com.team.gyemoim.dto.stage;

import lombok.Data;

import java.util.Date;

@Data
public class RollDTO {
    private Integer uNo; //회원번호
    private Integer pfID; //계모임 식별번호
    private Integer receiveTurn; //곗돈 수령순서
    private String pfMaster; //계모임 장
    private String name; // 이름
}
