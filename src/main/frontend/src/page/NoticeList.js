import {useState} from "react";
import {Link} from "react-router-dom";

const NoticeList = () => {

    const [list, setList] = useState([
        {
            title: "title1",
            uNo: "1",
            writeDate: "2023-05-05",
            views: 0
        },
        {
            title: "title2",
            uNo: "1",
            writeDate: "2023-05-06",
            views: 0
        },
        {
            title: "title3",
            uNo: "1",
            writeDate: "2023-05-07",
            views: 0
        },
        {
            title: "title4",
            uNo: "1",
            writeDate: "2023-05-08",
            views: 0
        },
        {
            title: "title5",
            uNo: "1",
            writeDate: "2023-05-09",
            views: 0
        },
    ]);
    const [paging, setPaging] = useState({
        total: 5,
        nowPage: 1,
        cntPage: 5,
        startPage: 0,
        cntPerPage: 5,
        /*endPage: paging.startPage + 10,
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

                            <table className="table table-hover">
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
                                {/* 게시글 목록 */}
                                {list.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{(paging.total - index) - ((paging.nowPage - 1) * 10)}</td>
                                        <td>
                                            <Link to={'/board/notice/detail?${bid}'}>{item.title}</Link>
                                        </td>
                                        <td className="text-center">{item.uNo}</td>
                                        <td className="text-center">{item.writeDate}</td>
                                        <td className="text-center">{item.views}</td>
                                    </tr>
                                ))}
                            </table>
                            <div className="list-btn-area">
                                {/* 로그인 여부에 따른 글쓰기 버튼(/board/write 로 이동하게 하기) */}
                                <input type="button" value="글쓰기" className="btn btn-primary btn-lg px-4 me-sm-3" />
                            </div>
                            <ul className="page-list">
                                {/* 페이지 번호 목록 */}
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