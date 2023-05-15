package com.team.gyemoim.service;

import com.team.gyemoim.vo.ReplyVO;

import java.util.List;

public interface ReplyService {

    // 댓글 작성 C
    void replyWrite(ReplyVO replyVO) throws Exception;

    // 댓글 조회 R
    List<ReplyVO> reply(int bid) throws Exception;

    // 댓글 수정 U
    void replyModify(ReplyVO replyVO) throws Exception;

    // 댓글 삭제 D
    void replyDelete(ReplyVO replyVO) throws Exception;

}
