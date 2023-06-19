package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.reply.CreateReplyParamDTO;
import com.team.gyemoim.dto.reply.UpdateReplyDTO;
import com.team.gyemoim.vo.ReplyVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReplyMapper {

    /* (Create) 댓글 작성 */
    void createReply(CreateReplyParamDTO createReplyParamDTO) throws Exception;

    /* (Read) 댓글 조회 */
    List<ReplyVO> getReplyList(int bid) throws Exception;

    /* (Update) 댓글 수정 */
    void updateReply(UpdateReplyDTO updateReply) throws Exception;

    /* (Delete) 댓글 삭제 */
    void deleteReply(int rno) throws Exception;

}
