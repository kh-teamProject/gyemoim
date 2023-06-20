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
        return ResponseEntity.ok(replyService.createReply(bid, createReplyRequestDTO));
    }

    /* [GET] 댓글 조회 API [ /reply/list/bid={bid} ] */
    @GetMapping("/reply/list")
    public List<ReplyVO> getReplyList(@RequestParam("bid") int bid) throws Exception {
        return replyService.getReplyList(bid);
    }

    /* [DELETE] 댓글 삭제 API [ /reply/{rno} ] */
    @DeleteMapping("/reply")
    public void deleteReply(@RequestParam("rno") int rno) throws Exception {
        replyService.deleteReply(rno);
    }

    /* [UPDATE] 댓글 수정 API [ "/reply/{rno} ] */
    @PatchMapping("/reply")
    public void updateReply(@RequestParam("rno") int rno, @RequestBody UpdateReplyDTO updateReplyDTO) throws Exception {
        replyService.updateReply(updateReplyDTO);
    }

}
