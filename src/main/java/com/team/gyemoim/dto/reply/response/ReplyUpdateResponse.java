package com.team.gyemoim.dto.reply.response;

public class ReplyUpdateResponse {

    private Integer updatedRecordCount;

    public ReplyUpdateResponse(Integer updatedRecordCount) {
        this.updatedRecordCount = updatedRecordCount;
    }

    public Integer getUpdatedRecordCount() {
        return updatedRecordCount;
    }

    public void setUpdatedRecordCount(Integer updatedRecordCount) {
        this.updatedRecordCount = updatedRecordCount;
    }

}
