package com.team.gyemoim.dto;

import lombok.Data;

@Data
public class StageCreateDTO {
    private Integer pfID;
    private String pfName;
    private Integer receiveTurn; //순번
    private  Integer pfEntry;//초기 몇명
    private double pfRate;
    private Integer Deposit;//약정금
    private String  interest;
    private String  startFlag; //대기중(디폴트)->참여중->완료
}
