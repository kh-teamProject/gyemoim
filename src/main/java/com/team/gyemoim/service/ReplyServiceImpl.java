package com.team.gyemoim.service;

import com.team.gyemoim.dto.reply.CreateReplyParamDTO;
import com.team.gyemoim.dto.reply.CreateReplyRequestDTO;
import com.team.gyemoim.dto.reply.CreateReplyResponseDTO;
import com.team.gyemoim.dto.reply.UpdateReplyDTO;
import com.team.gyemoim.mapper.ReplyMapper;
import com.team.gyemoim.vo.ReplyVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyServiceImpl implements ReplyService {

    private final ReplyMapper replyMapper;

    public ReplyServiceImpl(ReplyMapper replyMapper) {
        this.replyMapper = replyMapper;
    }

    /* C 댓글 작성 */
    public CreateReplyResponseDTO createReply(int bid, CreateReplyRequestDTO createReplyRequestDTO) throws Exception {
        CreateReplyParamDTO createReplyParamDTO = new CreateReplyParamDTO(bid, createReplyRequestDTO);
        replyMapper.createReply(createReplyParamDTO);
        return new CreateReplyResponseDTO(createReplyParamDTO.getBid());
    }

    /* R 댓글 조회 */
    @Override
    public List<ReplyVO> getReplyList(int bid) throws Exception {
        return replyMapper.getReplyList(bid);
    }

    /* U 댓글 수정 */
    @Override
    public void updateReply(UpdateReplyDTO updateReplyDTO) throws Exception {
        replyMapper.updateReply(updateReplyDTO);
    }

    /* D 댓글 삭제 */
    @Override
    public void deleteReply(int rno) throws Exception {
        replyMapper.deleteReply(rno);
    }

}
