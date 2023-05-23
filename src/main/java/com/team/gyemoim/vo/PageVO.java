package com.team.gyemoim.vo;

import lombok.Data;

@Data
public class PageVO {

    /* nowPage: 현재페이지, startPage: 시작페이지, endPage: 끝페이지
    // total: 게시글 총 개수, cntPerPage: 페이지당 글 갯수, lastPage: 마지막페이지
    // start, end: SQL 쿼리문에 사용할 start, end

    private int nowPage, startPage, endPage, total, cntPerPage, lastPage, start, end;
    private int cntPage = 10;
     */
    private String type, keyword; // 검색어 타입 & 검색어


    public PageVO(String type, String keyword) {
        setType(type);
        setKeyword(keyword);
    }



    /* 글 총 갯수, 현재페이지, 페이지당 글 갯수 3개 매개변수 받는 생성자
    public PageVO(int total, int nowPage, int cntPerPage) {
        setNowPage(nowPage);
        setCntPerPage(cntPerPage);
        setTotal(total);
        calcLastPage(getTotal(), getCntPerPage());
        calcStartEndPage(getNowPage(), getCntPage());
        calcStartEnd(getNowPage(), getCntPerPage());
    }
     */


    /* 글 총 갯수, 현재페이지, 페이지당 글 갯수, 검색어타입, 검색어 5개 매개변수 받는 생성자
    public PageVO(int total, int nowPage, int cntPerPage, String type, String keyword) {
        setNowPage(nowPage);
        setCntPerPage(cntPerPage);
        setTotal(total);
        calcLastPage(getTotal(), getCntPerPage());
        calcStartEndPage(getNowPage(), getCntPage());
        calcStartEnd(getNowPage(), getCntPerPage());
        this.type = type;
        this.keyword = keyword;
    }


    // 제일 마지막 페이지 계산(5 <- 4*5+1*3) : (소수점_올림) 게시글 총 갯수(23) / 페이지 당 글 갯수(5)
    public void calcLastPage(int total, int cntPerPage) {
        setLastPage((int) Math.ceil((double)total / (double)cntPerPage));
    }

    // 시작, 끝 페이지 계산 (cntPage=5)
    public void calcStartEndPage(int nowPage, int cntPage) {
        setEndPage(((int)Math.ceil((double)nowPage / (double)cntPage)) * cntPage);

        if (getLastPage() < getEndPage()) { // 마지막 페이지가 3이고 끝 페이지가 4로 더 크면 마지막 페이지를 4로 수정해줘야 한다.
            setEndPage(getLastPage());
        }

        setStartPage(getEndPage() - cntPage + 1); // 마지막 페이지에 따라서 시작 페이지를 알맞게 변경해준다.

        if (getStartPage() < 1) {
            setStartPage(1);
        }
    }


    // DB 쿼리에서 사용할 start, end 값 계산
    public void calcStartEnd(int nowPage, int cntPerPage) {
        setEnd(nowPage * cntPerPage); // end 값(맨 마지막 게시글) = 현재 페이지 * 페이지 당 글 갯수
        setStart(getEnd() - cntPerPage + 1); // start 값(맨 마지막 게시글이 있는 페이지의 첫 시작글) = end 값 - 페이지 당 글 갯수 + 1
    }
    */

}
