package com.team.gyemoim.mapper.admin;

import com.team.gyemoim.dto.admin.AdminReplyListDTO;
import com.team.gyemoim.dto.admin.AdminReplyListParamDTO;
import com.team.gyemoim.vo.ReplyVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminReplyMapper {

    // 검색된 댓글 목록 리스트 조회
    List<AdminReplyListDTO> searchReplyList(AdminReplyListParamDTO dto) throws Exception;

    // 검색 댓글 갯수 구하기
    int searchCount(AdminReplyListParamDTO dto) throws Exception;
}
