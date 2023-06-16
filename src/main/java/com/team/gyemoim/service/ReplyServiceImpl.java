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

    /* 댓글 작성 */
    public CreateReplyResponseDTO createReply(int bid, CreateReplyRequestDTO createReplyRequestDTO) throws Exception {
        CreateReplyParamDTO createReplyParamDTO = new CreateReplyParamDTO(bid, createReplyRequestDTO);
        replyMapper.createReply(createReplyParamDTO);
        return new CreateReplyResponseDTO(createReplyParamDTO.getBid());
    }

    /* 댓글 조회 */
    @Override
    public List<ReplyVO> getReplyList(int bid) throws Exception {
        System.out.println("************ 서비스 댓글 리스트 ************");
        System.out.println("************ 가져온 게시글 번호: " + bid + " ************");
        System.out.println("************ 서비스_댓글 리스트 : " + replyMapper.getReplyList(bid));

        return replyMapper.getReplyList(bid);
    }

    /* 댓글 삭제 */
    @Override
    public void deleteReply(int rno) {
        try {
            System.out.println("************** 서비스_댓글 삭제 성공 :D  *****************");
            System.out.println("************** 서비스_댓글 번호 : " + rno + "  *****************");
            replyMapper.deleteReply(rno);
        } catch (Exception e) {
            System.out.println("************** 서비스_댓글 삭제 실패 :<  *****************");
            System.out.println("************** 서비스_댓글 번호 : " + rno + "  *****************");
            System.out.println("************** 에러 메시지 : " + e.getMessage());

        }
    }


    /* 댓글 수정 */
    @Override
    public void updateReply(UpdateReplyDTO updateReplyDTO) {
        try {
            System.out.println("************** 서비스_댓글 수정 성공 :D  *****************");
            System.out.println("************** 서비스_댓글 번호 : " + updateReplyDTO.getRno() + "  *****************");
            replyMapper.updateReply(updateReplyDTO);
        } catch (Exception e) {
            System.out.println("************** 서비스_댓글 수정 실패 :<  *****************");
            System.out.println("************** 서비스_댓글 번호 : " + updateReplyDTO.getRno() + "  *****************");
            System.out.println("************** 에러 메시지 : " + e.getMessage());

        }
    }


}
