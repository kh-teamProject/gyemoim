package com.team.gyemoim.service;

import com.fasterxml.jackson.annotation.JacksonInject;
import com.team.gyemoim.mapper.ReplyMapper;
import com.team.gyemoim.vo.ReplyVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyServiceImpl implements ReplyService {


    private ReplyMapper replyMapper;


    // 댓글 작성
    @Override
    public void replyWrite(ReplyVO replyVO) throws Exception {
        System.out.println("ReplyServiceImpl_replyWrite_작동됨" + replyVO);
        replyMapper.replyWrite(replyVO);
    }

    // 댓글 조회
    @Override
    public List<ReplyVO> reply(int bid) throws Exception {
        return replyMapper.reply(bid);
    }

    // 댓글 수정
    @Override
    public void replyModify(ReplyVO replyVO) throws Exception {
        System.out.println("ReplyServiceImpl_replyModify_작동됨" + replyVO);
        replyMapper.replyModify(replyVO);
    }

    // 댓글 삭제
    @Override
    public void replyDelete(ReplyVO replyVO) throws Exception {
        System.out.println("ReplyServiceImpl_replyDelete_작동됨" + replyVO);
        replyMapper.replyDelete(replyVO);
    }
}
