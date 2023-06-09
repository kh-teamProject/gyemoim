package com.team.gyemoim.controller;

import com.team.gyemoim.dto.reply.CreateReplyResponseDTO;
import com.team.gyemoim.dto.reply.CreateReplyRequestDTO;
import com.team.gyemoim.dto.reply.UpdateReplyDTO;
import com.team.gyemoim.service.ReplyService;
import com.team.gyemoim.vo.ReplyVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;


    /* [POST] 댓글 작성 API [ /reply/bid={bid} ] */
    @PostMapping("/reply")
    public ResponseEntity<CreateReplyResponseDTO> createReply(@RequestParam("bid") int bid,
                                                              @RequestBody CreateReplyRequestDTO createReplyRequestDTO) throws Exception {
        System.out.println("************ 컨트롤러_댓글 작성 성공 :D ************* ");
        System.out.println("*** 댓글 추가할 게시글 번호 : " + bid);
        System.out.println("*** 댓글 정보 DTO : " + createReplyRequestDTO);

        return ResponseEntity.ok(replyService.createReply(bid, createReplyRequestDTO));

    }

    /* [GET] 댓글 조회 API [ /reply/list/bid={bid} ] */
    @GetMapping("/reply/list")
    public List<ReplyVO> getReplyList(@RequestParam("bid") int bid) throws Exception {
        System.out.println("************ 컨트롤러_댓글 리스트 성공 :D **************");
        System.out.println("********* 댓글 리스트 가져오는 게시글 번호 : " + bid);
        System.out.println("********* 컨트롤러_댓글 리스트 : " + replyService.getReplyList(bid));

        return replyService.getReplyList(bid);
    }

    /* [DELETE] 댓글 삭제 API [ /reply/{rno} ] */
    @DeleteMapping("/reply")
    public void deleteReply(@RequestParam("rno") int rno) {
        try {
            System.out.println("************ 컨트롤러_댓글 삭제 성공 :D **************");
            System.out.println("************ 컨트롤러_댓글 번호 : " + rno + " **************");
            replyService.deleteReply(rno);
        } catch (Exception e) {
            System.out.println("************ 컨트롤러_댓글 삭제 실패 :< **************");
            System.out.println("************ 컨트롤러_댓글 번호 : " + rno + " **************");
            System.out.println("************ 에러 메시지 : " + e.getMessage());
        }
    }

    /* [UPDATE] 댓글 수정 API [ "/reply/{rno} ] */
    @PatchMapping("/reply")
    public void updateReply(@RequestParam("rno") int rno, @RequestBody UpdateReplyDTO updateReplyDTO) {
        try {
            System.out.println("************ 컨트롤러_댓글 수정 성공 :D **************");
            System.out.println("************ 컨트롤러_댓글 번호 : " + rno + " **************");
            System.out.println("************ 컨트롤러_댓글 수정 내용 : " + updateReplyDTO);
            replyService.updateReply(updateReplyDTO);
        } catch (Exception e) {
            System.out.println("************ 컨트롤러_댓글 수정 실패 :< **************");
            System.out.println("************ 컨트롤러_댓글 번호 : " + rno + " **************");
            System.out.println("************ 컨트롤러_댓글 수정 내용 : " + updateReplyDTO);
            System.out.println("************ 에러 메시지 : " + e.getMessage());
        }
    }

}
