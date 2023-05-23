package com.team.gyemoim.dto.stage;

import lombok.Data;

@Data
public class StageParticipateDTO {
    private Integer pfID; // 번호(시퀀스)
    private  Integer receiveTurn; //순번
    private String pfMaster; //방장

}
