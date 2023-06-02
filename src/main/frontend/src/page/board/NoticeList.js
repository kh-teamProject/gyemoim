import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../../component/css/Board.module.css";
import "../../component/css/Page.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const NoticeList = () => {

    // 전체 게시글 리스트 받는 변수
    const [noticeList, setNoticeList] = useState([]);

    // 게시글 타입 : 공지사항
    const type = "공지사항";

    // 페이징 관련 변수
    // 1) 현재페이지 : nowPage
    const [nowPage, setNowPage] = useState(1);
    // 2) 전체 페이지 수 : totalPage
    const [totalPage, setTotalPage] = useState(0);

    // 검색용 변수
    const [searchTypeVal, setSearchTypeVal] = useState("");
    const [searchKeywordVal, setSearchKeywordVal] = useState("");

    // Link 용 (함수)
    let navigate = useNavigate();

    // 로그인 토큰에서 식별자(역할) userRole, 회원번호 uno 가져오기
    /*const token = jwtDecode(Cookies.get('Set-Cookie'));
    const userRole = token.userRole;
    const uno = token.uNo;*/


    // 운영자 여부 확인을 위한 상태 변수
    //const [isAdmin, setIsAdmin] = useState(false);


    // API 호출하여 게시글 목록 가져오기
    const fetchNoticeList = async (searchType, searchKeyword) => {

        // 검색된 List<BoardVO> 리턴받음
        await axios.get("/board/searchList", {
            params: {
                "searchType": searchType,
                "searchKeyword": searchKeyword,
                "type": type,
            },
        })
            .then((response) => {
                console.log("NoticeList_fetchNoticeList_컨트롤러로 들어갑니다~ :D");
                console.log("게시글 목록 response.data.list: " + response.data);
                console.log(response);

                setNoticeList(response.data); // 검색된 게시글 리스트 가져오기
                setTotalPage(Math.ceil(response.data.length / 10)); // total 값을 가져와서 업데이트
            })
            .catch((error) => {
                console.log("NoticeList_fetchNoticeList 게시글 불러오기 에러발생 :< ");
                console.log(error);
            })
    };


    // 초기 렌더링 시 게시글 목록과 전체 페이지 수를 가져온다.
    useEffect(() => {
        /*// 사용자 역할(userRole)이 "관리자" 인 경우에만 운영자로 간주
        if (userRole == "관리자") {
            setIsAdmin(true);
        }*/
        fetchNoticeList("", "");
        //console.log("token : " + token);
    }, []);


    // searchKeyword (검색어), searchType(검색타입), nowPage(현재페이지) 상태가 변경될 때만 호출되도록 설정
    /*useEffect(() => {
        fetchNoticeList(searchTypeVal, searchKeywordVal);
    }, [searchTypeVal, searchKeywordVal, nowPage]);*/


    // 검색 타입 변경하는 함수
    const changeSearchType = (e) => {
        setSearchTypeVal(e.target.value);
    }

    // 검색어 변경하는 함수
    const changeSearchKeyword = (e) => {
        setSearchKeywordVal(e.target.value);
    }

    // searchKeyword (검색어), searchType (검색타입) 기반으로 조회하는 함수
    const handleFormSubmit = () => {
        console.log("NoticeList_handleFormSubmit_searchTypeVal= " + searchTypeVal + ", searchKeywordVal= " + searchKeywordVal);

        navigate("/board/notice");
        fetchNoticeList(searchTypeVal, searchKeywordVal);
        // 페이지 버튼 클릭 시 현재 페이지를 1로 초기화
        setNowPage(1);

    };

    // 페이지 변경할 때 호출되는 함수
    // 클릭한 페이지에 해당하는 게시글 목록 가져오도록 설정함
    const handlePageClick = (e) => {
        // 클릭한 페이지
        const targetPage = Number(e.target.value);
        // 클릭한 targetPage 가 0보다 크고 totalPage 보다 작거나 같으면
        // 즉, 클릭한 페이지가 유효 범위에 있을 때
        // 현재페이지 setNowPage 를 클릭한 페이지 targetPage 로 변경해준다.
        if (targetPage > 0 && targetPage <= totalPage) {
            setNowPage(targetPage);
        }
    }


    // (board.secret == 'S') && (board.uNo != login.uNo) 인 경우 발생하는 함수
    const handleSecretClick = () => {
        alert("다른 사람의 비밀글은 볼 수 없습니다.");
    };

    // 글쓰기 버튼 클릭시 발생하는 함수 (글쓰기 버튼 클릭 -> 글쓰기 page 로 이동)
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
                            <table className="search">
                                <tbody>
                                <tr>
                                    <td>
                                        <select className="custom-select" value={searchTypeVal}
                                                onChange={changeSearchType}>
                                            <option>검색 옵션 선택</option>
                                            <option value="title">제목</option>
                                            <option value="content">내용</option>
                                            <option value="name">작성자</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" placeholder="검색어를 입력하세요."
                                               value={searchKeywordVal} onChange={changeSearchKeyword}/>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-outline-secondary"
                                                onClick={handleFormSubmit}><i className="fas fa-search"></i> 검색
                                        </button>
                                    </td>
                                </tr>
                                </tbody>

                            </table>
                            {/* 검색 끝 */}


                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th className="col-1">글번호</th>
                                    <th className="col-8">제목</th>
                                    <th className="col-3">작성자</th>
                                    <th className="col-8">작성일</th>
                                    <th className="col-1">조회수</th>
                                </tr>
                                </thead>

                                <tbody>

                                {/* 게시글 목록 (적용시켜야하는 것 : 비밀글인 경우, 로그인 되어있는 사람의 uNo와 글의 uNo가 같으면 글 제목 눌렀을 때 글 상세보기로 이동하게하고 uNo가 서로 같지 않으면 '비밀글입니다.' 라고 alert() 띄워주기 / 공개글인 경우 그냥 제목 누르면 상세보기로 이동시키기 ) */}
                                {noticeList.length > 0 ? (
                                    noticeList
                                        .slice((nowPage - 1) * 10, nowPage * 10)
                                        .map((item, index) => {
                                            // 작성일을 Date 객체로 변환
                                            const writeDate = new Date(item.writeDate);
                                            // 원하는 형식 ('YYYY-MM-DD') 으로 날짜 구성
                                            const formattedWriteDate = writeDate.toISOString().split('T')[0];

                                            return (
                                                <tr key={index}>
                                                    <td>{item.bid}</td>
                                                    <td>
                                                        {item.secret === 'S' ? (
                                                                <Link to="#" onClick={handleSecretClick}>[비밀글]</Link>) :
                                                            (<Link
                                                                to={`/board/notice/detail/${item.bid}`}>{item.title}</Link>)}
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{formattedWriteDate}</td>
                                                    <td>{item.views}</td>
                                                </tr>
                                            );
                                        })
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{textAlign: "center"}}>
                                            게시글이 없습니다.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                                {/* 게시글 목록 끝 */}

                            </table>

                            {/* 페이징 시작 */}
                            <div className="pagination">
                                <nav aria-label="Page navigation"
                                     style={{display: "flex", justifyContent: "center", flex: 10}}>
                                    <div>
                                        {nowPage > 1 && (
                                            <span className="page-item">
                                                <button className="page-link"
                                                        value={nowPage - 1}
                                                        onClick={handlePageClick}>
                                                    {"<<"}
                                                </button>
                                            </span>
                                        )}
                                        {Array.from({length: totalPage}, (_, i) => (
                                            <button key={i + 1} value={i + 1} onClick={handlePageClick}
                                                    className={nowPage === i + 1 ? 'active' : ''}>{i + 1}</button>
                                        ))}
                                        {nowPage < totalPage && (
                                            <span className="page-item">
                                                <button className="page-link" value={nowPage + 1}
                                                        onClick={handlePageClick}>
                                                    {">>"}
                                                </button>
                                            </span>
                                        )}
                                    </div>
                                </nav>
                            </div>
                            {/* 페이징 끝 */}


                            {/* 글쓰기 버튼 */}
                            {/*{isAdmin && (
                                <div className="my-5 d-flex justify-content-center" style={{
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                }}>
                                     적용시켜야 할 것: 로그인한 사람이 운영자인 경우에만 글쓰기 버튼 활성화(/board/notice/write) 로 이동하게 하기), 로그인 안한 경우에 버튼 클릭할시 '로그인을 해주세요' 라고 alert() 띄워주기
                                    <Link to={"/board/notice/write"}><i className="fas fa-pen"></i> &nbsp; 글쓰기</Link>
                                </div>
                            )}*/}
                            <div className="my-5 d-flex justify-content-center" style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                            }}>
                                적용시켜야 할 것: 로그인한 사람이 운영자인 경우에만 글쓰기 버튼 활성화(/board/notice/write) 로 이동하게 하기), 로그인 안한 경우에 버튼 클릭할시 '로그인을 해주세요' 라고 alert() 띄워주기
                                <Link to={"/board/notice/write"}><i className="fas fa-pen"></i> &nbsp; 글쓰기</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 푸터 */}
        </>
    );

}

export default NoticeList;