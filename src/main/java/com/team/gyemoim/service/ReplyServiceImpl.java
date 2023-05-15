package com.team.gyemoim.service;

import com.fasterxml.jackson.annotation.JacksonInject;
import com.team.gyemoim.vo.ReplyVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyServiceImpl implements ReplyService {


    private ReplyVO replyVO;


    @Override
    public void replyWrite(ReplyVO replyVO) throws Exception {

    }

    @Override
    public List<ReplyVO> reply(int bid) throws Exception {
        return null;
    }

    @Override
    public void replyModify(ReplyVO replyVO) throws Exception {

    }

    @Override
    public void replyDelete(ReplyVO replyVO) throws Exception {

    }
}
