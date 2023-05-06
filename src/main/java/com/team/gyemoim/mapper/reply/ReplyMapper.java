package com.team.gyemoim.mapper.reply;

import com.team.gyemoim.dto.reply.param.ReplyCreateParam;
import com.team.gyemoim.dto.reply.param.ReplyListParam;
import com.team.gyemoim.dto.reply.param.ReplyUpdateParam;
import com.team.gyemoim.vo.reply.ReplyVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ReplyMapper {

    List<ReplyVO> getReplyPageList(ReplyListParam param);
    Integer getReplyCount(int rno);

    void createReply(ReplyCreateParam param);
    Integer deleteReply(int rno);

    ReplyVO getReplyByRno(int rno);
    Integer updateReply(ReplyUpdateParam param);

}
