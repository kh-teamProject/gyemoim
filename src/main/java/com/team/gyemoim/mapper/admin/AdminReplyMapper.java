package com.team.gyemoim.mapper.admin;

import com.team.gyemoim.dto.admin.AdminReplyListDTO;
import com.team.gyemoim.dto.admin.AdminReplyListParamDTO;
import com.team.gyemoim.vo.ReplyVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminReplyMapper {

    /* (Read) */
    // 검색 및 전체 댓글 리스트 조회
    List<AdminReplyListDTO> searchReplyList(AdminReplyListParamDTO dto) throws Exception;

}
