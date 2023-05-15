package com.team.gyemoim.mapper;

import com.team.gyemoim.vo.ReplyVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReplyMapper {

    // 댓글 작성 C
    void replyWrite(ReplyVO replyVO) throws Exception;

    // 댓글 조회 R
    List<ReplyVO> reply(int bid) throws Exception;

    // 댓글 삭제 D
    void replyDelete(ReplyVO replyVO) throws Exception;

    // 댓글 수정 U
    void replyModify(ReplyVO replyVO) throws Exception;


}
