package com.team.gyemoim.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ReadHistoryVO {
    private Integer readerUno;
    private int boardBid;
    private Date latest_access_at;
}
