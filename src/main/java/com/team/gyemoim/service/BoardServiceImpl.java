package com.team.gyemoim.service;

import com.team.gyemoim.dto.BoardDeleteDTO;
import com.team.gyemoim.dto.BoardWriteDTO;
import com.team.gyemoim.mapper.BoardMapper;
import com.team.gyemoim.vo.BoardVO;
import com.team.gyemoim.vo.PageVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{

    private final BoardMapper boardMapper;

    @Override
    public void write(BoardWriteDTO boardWriteDTO) throws Exception {
        boardMapper.write(boardWriteDTO);
    }

    @Override
    public int countBoard() throws Exception {
        return boardMapper.countBoard();
    }

    @Override
    public int searchCountBoard(PageVO spv) throws Exception {
        return boardMapper.searchCountBoard(spv);
    }

    @Override
    public List<BoardVO> selectBoard(PageVO vo) throws Exception {
        return boardMapper.selectBoard(vo);
    }

    @Override
    public BoardVO readDetail(int bid) throws Exception {
        boardMapper.updateViewCnt(bid);
        return boardMapper.readDetail(bid);
    }

    @Override
    public List<BoardVO> searchList(PageVO spv) throws Exception {
        return boardMapper.searchList(spv);
    }

    @Override
    public void delete(BoardDeleteDTO boardDeleteDTO) throws Exception {

    }
}
