package com.team.gyemoim.service;

import com.team.gyemoim.dto.board.*;
import com.team.gyemoim.mapper.BoardMapper;
import com.team.gyemoim.vo.AttachedVO;
import com.team.gyemoim.vo.BoardVO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;
    private final String uploadPath; // FileUploadConfig 에 있는 uploadPath 주입

    /* (Create) */
    // 게시글 생성하고 생성된 게시글의 번호 bid 반환
    @Override
    @Transactional
    public int writePost(BoardWriteDTO boardWriteDTO, MultipartFile file) throws Exception {
        // BoardWriteDTO 이용하여 BoardVO 생성하고 DB에 게시글 저장
        BoardVO boardVO = new BoardVO();
        boardVO = boardVO.dtoToVO(boardWriteDTO);
        int bid = boardMapper.getBid();
        boardVO.setBid(bid);

        boardMapper.insert(boardVO); // 게시글 저장 후 고유 식별자 반환

        // 첨부파일 존재하면 첨부파일 저장
        if (file != null && !file.isEmpty()) {
            // AttachedVO 객체 생성 및 정보 저장
            AttachedVO attachedVO = new AttachedVO();
            attachedVO = attachedVO.dtoToVO(bid, file);
            attachedVO.setFilePath(saveFile(file)); // 업로드 경로에 파일 저장

            // AttachedVO 객체를 데이터베이스에 저장 (첨부파일 생성)
            boardMapper.saveAttached(attachedVO);
        }
        return boardVO.getBid(); // 게시글 고유 식별자 반환
    }

    /* (Read) */
    // 검색에 해당하는 게시글 리스트 조회하기
    @Override
    public List<BoardVO> searchList(BoardListDTO dto) throws Exception {
        return boardMapper.searchList(dto);
    }

    // 글 상세보기
    @Override
    public BoardVO readDetail(BoardReadCountDTO dto) throws Exception {
        /* 게시글 조회 기록 확인 후 기록 있는 경우 -> readCount + 1 (update)
           기록 없는 경우 -> read_history 테이블 생성 후 readCount = 1 (insert) */
        // 로그인 한 사용자의 조회수만 카운팅
        if (dto.getReaderUno() != null) {
            // 게시글 조회 확인 횟수
            boardMapper.createBoardReadCountHistory(dto);
            // 특정 게시글에 대한 나의 조회 확인 횟수 가져오기
            int readCount = boardMapper.selectReadCount(dto);
            // 조회 확인 횟수 == 1 인 경우 즉, 처음 조회한 경우
            if (readCount == 1) boardMapper.updateViewCnt(dto.getBoardBid());// 실제 게시글 조회수 증가
        }
        return boardMapper.readDetail(dto.getBoardBid());
    }

    /* (Update) */
    // 수정 페이지 불러오기
    @Override
    public BoardVO modify(int bid) throws Exception {
        return boardMapper.modify(bid);
    }

    // 게시글 및 첨부파일 수정하기
    @Override
    public void modifyUpdate(BoardModifyDTO boardModifyDTO) throws Exception {
        // BoardModifyDTO 이용하여 BoardVO 생성하고 DB에 게시글 수정
        BoardVO boardVO = new BoardVO();
        boardVO.modifyDtoToVO(boardModifyDTO);
        boardMapper.modifyUpdate(boardModifyDTO);
    }

    /* (Delete) */
    // 글 삭제하기
    @Override
    public void delete(BoardDeleteDTO boardDeleteDTO) throws Exception {
        boardMapper.delete(boardDeleteDTO);
    }

    /* 첨부파일 (Read) */
    // 첨부파일 조회하기
    @Override
    public AttachedVO getAttachedById(int bid) throws Exception {
        return boardMapper.getAttachedById(bid);
    }

    /* 파일 실제 업로드 경로에 저장하는 로직 */
    // 'file' 객체에서 파일 이름 얻어와 경로를 생성하고 해당 경로에 파일을 저장한다.
    private String saveFile(MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String extension = FilenameUtils.getExtension(originalFileName);
        String fileName = LocalDateTime.now().toString().replace(":", "-") + "." + extension;
        String filePath = uploadPath + File.separator + fileName; // File.separator 사용하여 경로 구분자 설정
        File dest = new File(filePath);
        file.transferTo(dest);

        return filePath;
    }

}
