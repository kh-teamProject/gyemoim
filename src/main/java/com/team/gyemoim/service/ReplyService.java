package com.team.gyemoim.service;

import com.team.gyemoim.dto.reply.CreateReplyRequestDTO;
import com.team.gyemoim.dto.reply.CreateReplyResponseDTO;
import com.team.gyemoim.dto.reply.UpdateReplyDTO;
import com.team.gyemoim.vo.ReplyVO;

import java.util.List;

public interface ReplyService {

    /* C 댓글 작성 */
    CreateReplyResponseDTO createReply(int bid, CreateReplyRequestDTO createReplyRequestDTO) throws Exception;

    /* R 댓글 조회 */
    List<ReplyVO> getReplyList(int bid) throws Exception;

    /* U 댓글 수정 */
    void updateReply(UpdateReplyDTO updateReplyDTO) throws Exception;

    /* D 댓글 삭제 */
    void deleteReply(int rno) throws Exception;

}
