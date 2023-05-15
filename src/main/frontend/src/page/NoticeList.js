import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styleTable from "../component/styleTable";
import axios from "axios";

const NoticeList = () => {

    const [list, setList] = useState([

    ]);
    const [pagingData, setPagingData] = useState({
        /*total: 5,
        nowPage: 1,
        cntPage: 5,
        startPage: 0,
        cntPerPage: 5,
        endPage: paging.startPage + 10,
        lastPage: paging.endPage,
        start: paging.end - paging.cntPerPage + 1,
        end: paging.nowPage * paging.cntPerPage,*/
    });


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-input').value;

        if (searchInput === '') {
            alert('검색어를 입력해주세요.');
            return;
        }
        // 검색 로직 구현

    };

    const handleSecretClick = () => {
        alert("다른 사람의 비밀글은 볼 수 없습니다.");
    };

    const moveNoticeWrite = () => {
        window.location.href = 'notice/write';
    };

    const fetchPagingData = async () => {
      try {
          const response = await axios.get('/board/notice/list');
          setPagingData(response.data);
          setList(response.data);
      }  catch (error) {
          console.log(error);
      }
    };

    useEffect(() => {
        fetchPagingData();
    }, []);

    return (
        <>
            {/* 헤더 */}
            {/* ... */}

            <section className="py-5">
                <div className="container px-5">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <div className="title">
                                <h1>공지사항</h1>
                                <p>계모임의 소식을 전합니다.</p>
                            </div>

                            {/* 검색 시작 */}
                            <div className="search-container row justify-content-center">
                                <form className="col-8 search-box" name="search_form" onSubmit={handleFormSubmit}>
                                    <select name="type" className="search-item">
                                        <option selected value="title">제목</option>
                                        <option value="content">내용</option>
                                        <option value="name">작성자</option>
                                    </select>
                                    <input className="form-control search-item" type="text" id="search-input"
                                           name="keyword" placeholder="검색어를 입력하세요."/>
                                    <button type="submit" className="btn btn-primary search-item">검색</button>
                                </form>
                            </div>
                            {/* 검색 끝 */}

                            <table className="table table-hover" style={styleTable}>
                                <colgroup>
                                    <col width="10%"/>
                                    <col width="40%"/>
                                    <col width="15%"/>
                                    <col width="25%"/>
                                    <col width="10%"/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th className="text-center">글번호</th>
                                    <th>제목</th>
                                    <th className="text-center">작성자</th>
                                    <th className="text-center">작성일</th>
                                    <th className="text-center">조회수</th>
                                </tr>
                                </thead>
                                {/* 게시글 목록 (적용시켜야하는 것 : 비밀글인 경우, 로그인 되어있는 사람의 uNo와 글의 uNo가 같으면 글 제목 눌렀을 때 글 상세보기로 이동하게하고 uNo가 서로 같지 않으면 '비밀글입니다.' 라고 alert() 띄워주기 / 공개글인 경우 그냥 제목 누르면 상세보기로 이동시키기 ) */}
                                {list.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{(pagingData.total - item.status.index) - ((pagingData.nowPage - 1) * 10)}</td>
                                        <td>
                                            <Link to={`/board/notice/detail?{bid}`}>{item.title}</Link>
                                        </td>
                                        <td className="text-center">{item.uNo}</td>
                                        <td className="text-center">{item.writeDate}</td>
                                        <td className="text-center">{item.views}</td>
                                    </tr>
                                ))}
                            </table>
                            <div className="list-btn-area">
                                {/* 적용시켜야 할 것: 로그인한 사람이 운영자인 경우에만 글쓰기 버튼 활성화(/board/notice/write) 로 이동하게 하기), 로그인 안한 경우에 버튼 클릭할시 '로그인을 해주세요' 라고 alert() 띄워주기 */}
                                <input type="button" value="글쓰기" className="btn btn-primary btn-lg px-4 me-sm-3" onClick={moveNoticeWrite}/>
                            </div>
                            <ul className="page-list">
                                {/* 페이지 번호 목록 */}
                                {pagingData.startPage !== 1 && (
                                    <li>
                                        <Link to={`/board/notice/list?nowPage=${pagingData.startPage - 1}&cntPerPage=${pagingData.cntPerPage}`}>&lt;</Link>
                                    </li>
                                )}
                                {Array.from({length: pagingData.endPage - pagingData.startPage + 1}, (_, i) => i + pagingData.startPage).map((p) => (
                                    <li key={p}>
                                        {p === pagingData.nowPage ? (
                                            <span>{p}</span>
                                        ) : (
                                            <Link to={`/board/notice/list?nowPage=${p}&cntPerPage=${pagingData.cntPerPage}`}>{p}</Link>
                                        )}
                                    </li>
                                ))}
                                {pagingData.endPage !== pagingData.lastPage && (
                                    <li>
                                        <Link to={`/board/notice/list?nowPage=${pagingData.endPage + 1}&cntPerPage=${pagingData.cntPerPage}`}>&gt;</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 푸터 */}
        </>
    );

}

export default NoticeList;