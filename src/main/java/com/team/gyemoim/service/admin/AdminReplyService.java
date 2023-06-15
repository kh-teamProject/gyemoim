package com.team.gyemoim.service.admin;

import com.team.gyemoim.dto.admin.AdminReplyListDTO;
import com.team.gyemoim.dto.admin.AdminReplyListParamDTO;
import com.team.gyemoim.vo.ReplyVO;

import java.util.List;

public interface AdminReplyService {

    // 댓글 검색 리스트 가져오기
    List<AdminReplyListDTO> searchReplyList(AdminReplyListParamDTO dto) throws Exception;
}
