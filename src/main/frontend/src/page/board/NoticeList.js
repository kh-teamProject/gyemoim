import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styleTable from "../../component/styleTable";
import axios from "axios";
import NoticeSearchList from "./NoticeSearchList";

const NoticeList = () => {

    // 게시글 데이터 받는 변수
    const [boardList, setBoardList] = useState([]);

    // 페이징 관련 변수
    // 1. 현재페이지 : curPage
    const [curPage, setCurPage] = useState(1);
    // 2. 전체 페이지 수 : totalPage
    const [totalPage, setTotalPage] = useState(0);
    // 3. 현재 게시글 수 : list
    const [list, setList] = useState(10);

    useEffect(() => {
        fetchList();
    }, []);


    // 게시글 목록 가져오기
    const fetchList = async () => {

        await axios.get('/board/notice/list', {})
            .then((response) => {
                console.log("NoticeList_fetchList_컨트롤러로 들어갑니다~ :D");
                console.log("NoticeList_fetchList_컨트롤러에서 받아온 res: " + response);
                console.log("게시글 목록 response.data.list: " + response.data);

                setBoardList(response.data);
                setTotalPage(Math.ceil(response.data.bid.length / 10)); // 전체 페이지 수 (bid 개수 가지고) 계산
            })
            .catch((error) => {
                console.log("NoticeList_fetchList 게시글 불러오기 에러발생 :< ");
                console.log(error);
            })

        try {
            const response = await axios.get('/board/notice/list', {});

            setBoardList(response.data);

            console.log("NoticeList_fetchList_컨트롤러로 들어갑니다~ :D");
            console.log("NoticeList_fetchList_컨트롤러에서 받아온 res: " + response);
            console.log("게시글 목록 response.data.list: " + response.data);
        } catch (error) {
            console.log("NoticeList_fetchList 게시글 불러오기 에러발생 :< ");
            console.log(error);
        }
    };

    // keyword (검색어), type (검색타입) 기반으로 조회하는 함수
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const searchKeyword = document.getElementById('search-keyword').value;
        const searchType = document.getElementById('search-type').value;

        if (searchKeyword === '') {
            alert('검색어를 입력해주세요.');
            return false;
        }
        // 검색 로직 구현


        // 페이지 버튼 클릭 시 현재 페이지를 1로 초기화
        setCurPage(1);
        setList(10);

    };


    // 페이징 함수
    const handlePageClick = (e) => {
        // 클릭한 페이지
        const targetPage = Number(e.target.value);

        // 클릭한 targetPage 가 0보다 크고 totalPage 보다 작거나 같으면
        // 즉, 클릭한 페이지가 유효 범위에 있을 때
        // 현재페이지 setCurPage 를 클릭한 페이지 targetPage 로 변경해준다.
        if (targetPage > 0 && targetPage <= totalPage) {
            setCurPage(targetPage);
            setList(list + 10); // 현재 게시글 수를 +10한 상태로 변경해준다.
        }
    }


    const handleSecretClick = () => {
        alert("다른 사람의 비밀글은 볼 수 없습니다.");
    };

    const moveNoticeWrite = () => {
        window.location.href = 'notice/write';
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
                                    <select name="searchType" id="search-type" className="search-item" defaultValue="title">
                                        <option value="title">제목</option>
                                        <option value="content">내용</option>
                                        <option value="name">작성자</option>
                                    </select>
                                    <input className="form-control search-item" type="text" id="search-keyword"
                                           name="searchKeyword" placeholder="검색어를 입력하세요."/>
                                    <button type="submit" className="btn btn-primary search-item"
                                            onSubmit={handleFormSubmit}>검색
                                    </button>

                                    <div className="list-btn-area">
                                        {/* 적용시켜야 할 것: 로그인한 사람이 운영자인 경우에만 글쓰기 버튼 활성화(/board/notice/write) 로 이동하게 하기), 로그인 안한 경우에 버튼 클릭할시 '로그인을 해주세요' 라고 alert() 띄워주기 */}
                                        <input type="button" value="글쓰기" className="btn btn-primary btn-lg px-4 me-sm-3"
                                               onClick={moveNoticeWrite}/>
                                    </div>
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
                                {boardList.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{item.bid}</td>
                                        <td>
                                            <Link to={`/board/notice/detail/${item.bid}`}>{item.title}</Link>
                                        </td>
                                        <td className="text-center">{item.name}</td>
                                        <td className="text-center">{item.writeDate}</td>
                                        <td className="text-center">{item.views}</td>
                                    </tr>
                                ))}
                                <div>
                                    <button onClick={() => handlePageClick({target: {value: curPage - 1}})}>《</button>
                                    {/*어레이로 숫자를 클릭해서 페이지 전환을 할 수 있게함.*/}
                                    {Array.from({length: totalPage}, (_, i) => (
                                      <button key={i + 1} value={i + 1} onClick={handlePageClick}
                                              className={curPage === i + 1 ? 'active' : ''}>{i + 1}</button>
                                    ))}
                                </div>
                            </table>

                        </div>
                    </div>
                </div>
            </section>

            {/* 푸터 */}
        </>
    );

}

export default NoticeList;