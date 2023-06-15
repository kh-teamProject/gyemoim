package com.team.gyemoim.service.admin;


import com.team.gyemoim.dto.admin.AdminReplyListDTO;
import com.team.gyemoim.dto.admin.AdminReplyListParamDTO;
import com.team.gyemoim.mapper.admin.AdminReplyMapper;
import com.team.gyemoim.vo.ReplyVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminReplyServiceImpl implements AdminReplyService{

    private final AdminReplyMapper adminReplyMapper;

    public AdminReplyServiceImpl(AdminReplyMapper adminReplyMapper) {
        this.adminReplyMapper = adminReplyMapper;
    }

    // 검색 댓글 목록 조회
    @Override
    public List<AdminReplyListDTO> searchReplyList(AdminReplyListParamDTO dto) throws Exception {
        System.out.println("************** AdminReplyServiceImpl_searchReplyList 성공 :D ************");
        return adminReplyMapper.searchReplyList(dto);
    }
}
