package com.team.gyemoim.dto.reply.response;

public class ReplyDeleteResponse {

    private Integer deletedRecordCount;

    public ReplyDeleteResponse(Integer deletedRecordCount) {
        this.deletedRecordCount = deletedRecordCount;
    }

    public Integer getDeletedRecordCount() {
        return deletedRecordCount;
    }

    public void setDeletedRecordCount(Integer deletedRecordCount) {
        this.deletedRecordCount = deletedRecordCount;
    }

}
