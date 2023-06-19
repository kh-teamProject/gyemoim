package com.team.gyemoim.controller.admin;

import com.team.gyemoim.dto.admin.AdminReplyListDTO;
import com.team.gyemoim.dto.admin.AdminReplyListParamDTO;
import com.team.gyemoim.service.admin.AdminReplyService;
import com.team.gyemoim.vo.ReplyVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminReplyController {

    public final AdminReplyService adminReplyService;


    /* [GET] 검색된 댓글 리스트 조회 API
    [ /admin/reply/searchList?type={type}&searchType={searchType}&searchKeyword={searchKeyword}] */
    @GetMapping("/admin/reply/searchList")
    public List<AdminReplyListDTO> searchReplyList(AdminReplyListParamDTO dto) throws Exception {
        System.out.println("************ AdminReplyController_searchReplyList 리스트 성공 :D **************");
        System.out.println("** 컨트롤러_댓글 리스트 dto bType = " + dto.getBtype());

        return adminReplyService.searchReplyList(dto);
    }
    

}
