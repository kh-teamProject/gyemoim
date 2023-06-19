import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import classes from "../css/board/Board.module.css";

const QuestionList = () => {

    // 전체 게시글 리스트 받는 변수
    const [questionList, setQuestionList] = useState([]);

    // 게시글 타입 : 1:1 문의사항
    const bType = "1:1 문의사항";

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

    // 로그인 토큰에서 회원번호 uno 가 있으면 가져오고 아니면 null 로 설정
    const token = Cookies.get('Set-Cookie');
    const uno = token ? jwtDecode(token).uNo : null;
    const userRole = jwtDecode(token).userRole;


    // API 호출하여 게시글 목록 가져오기
    const fetchQuestionList = async (searchType, searchKeyword) => {

        // 검색된 List<BoardVO> 리턴받음
        await axios.get("/board/searchList", {
            params: {
                "btype": bType,
                "searchType": searchType,
                "searchKeyword": searchKeyword,
            }
        })
            .then((response) => {
                console.log("게시글 목록 response.data.list: " + response);

                setQuestionList(response.data); // 검색된 문의사항 리스트 가져오기
                setTotalPage(Math.ceil(response.data.length / 10)); // total 값을 가져와서 업데이트
            })
            .catch((error) => {
                console.log("QuestionList_fetchQuestionList 게시글 불러오기 에러발생 :< ");
                console.log(error);
            })

    };


    // 초기 렌더링 시 게시글 목록과 전체 페이지 수를 가져온다.
    useEffect(() => {
        fetchQuestionList("", "");
    }, []);

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
        console.log("QuestionList_handleFormSubmit_searchTypeVal= " + searchTypeVal + ", searchKeywordVal= " + searchKeywordVal);

        fetchQuestionList(searchTypeVal, searchKeywordVal);
        navigate("/board/question");

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
        console.log("userRole = " + userRole);
    };

    // 글쓰기 버튼 클릭시 문의사항 글쓰기 페이지로 이동하는 함수
    const moveQuestionWrite = () => {
        navigate("/board/question/write");
    };


    return (
        <section style={{
            marginLeft: '0px',
        }}>
            <div>
                <div>
                    <div>
                        <div>
                            <h1>1:1 문의사항</h1>
                            <p>문의사항을 상세하게 적어주세요.</p>
                        </div>

                        <div>
                            {/* 검색 시작 */}
                            <table className={`${classes['search-container']}`}>
                                <tbody>
                                <tr>
                                    <td>
                                        <select className={`${classes['search-option']}`} value={searchTypeVal}
                                                onChange={changeSearchType}>
                                            <option>검색 옵션 선택</option>
                                            <option value="title">제목</option>
                                            <option value="content">내용</option>
                                            <option value="name">작성자</option>
                                        </select>
                                    </td>
                                    <td>
                                        <span className={`${classes['search-window']}`}>
                                        <input type="text" className={`${classes['input-text']}`}
                                               placeholder="검색어를 입력하세요."
                                               value={searchKeywordVal} onChange={changeSearchKeyword}/></span>
                                    </td>
                                    <td>
                                        <button type="button" className={`${classes['search-button']}`}
                                                onClick={handleFormSubmit}> 검색
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <br/>
                            {/* 검색 끝 */}

                            <table className={`${classes['board-container']}`} style={{
                                borderCollapse: 'collapse'
                            }}>
                                <thead>
                                <tr>
                                    <th className={`${classes['board-column']}`} style={{
                                        borderSpacing: "30px"
                                    }}>글번호
                                    </th>
                                    <th className={`${classes['board-column']}`} style={{
                                        borderSpacing: "10px"
                                    }}>제목
                                    </th>
                                    <th className={`${classes['board-column']}`} style={{
                                        borderSpacing: "10px"
                                    }}>작성자
                                    </th>
                                    <th className={`${classes['board-column']}`} style={{
                                        borderSpacing: "10px"
                                    }}>작성일
                                    </th>
                                    <th className={`${classes['board-column']}`} style={{
                                        borderSpacing: "10px"
                                    }}>조회수
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                {/* 게시글 목록 (적용시켜야하는 것 : 비밀글인 경우, 로그인 되어있는 사람의 uNo와 글의 uNo가 같으면 글 제목 눌렀을 때 글 상세보기로 이동하게하고 uNo가 서로 같지 않으면 '비밀글입니다.' 라고 alert() 띄워주기 / 공개글인 경우 그냥 제목 누르면 상세보기로 이동시키기 ) */}
                                {questionList.length > 0 ? (
                                    questionList
                                        .slice((nowPage - 1) * 10, nowPage * 10)
                                        .map((item, index) => {
                                            // 작성일을 Date 객체로 변환
                                            const writeDate = new Date(item.writeDate);
                                            // 원하는 형식 ('YYYY-MM-DD') 으로 날짜 구성
                                            const formattedWriteDate = writeDate.toISOString().split('T')[0];

                                            return (
                                                <tr className={`${classes['text-center']}`} key={index}>
                                                    <td className={`${classes['text-center']}`} style={{
                                                        borderSpacing: "50px"
                                                    }}>{item.bid}</td>
                                                    <td className={`${classes['text-center'], classes['title-link']}`}>
                                                        {item.secret === 'S' ? (
                                                            userRole == "관리자" ? (
                                                                <Link
                                                                    to={`/board/question/detail/${item.bid}`}
                                                                    className={`${classes['title-link']}`}>
                                                                    [비밀글]
                                                                </Link>
                                                            ) : (
                                                                uno === item.uno ? (
                                                                    <Link
                                                                        to={`/board/question/detail/${item.bid}`}
                                                                        className={`${classes['title-link']}`}>
                                                                        [비밀글]
                                                                    </Link>
                                                                ) : (
                                                                    <Link to="#"
                                                                          onClick={handleSecretClick}>[비밀글]
                                                                    </Link>
                                                                )
                                                            )
                                                        ) : (
                                                            <Link
                                                                to={`/board/question/detail/${item.bid}`}
                                                                className={`${classes['title-link']}`}>
                                                                {item.title}
                                                            </Link>
                                                        )}
                                                    </td>
                                                    <td className={`${classes['text-center']}`}>{item.name}</td>
                                                    <td className={`${classes['text-center']}`}>{formattedWriteDate}</td>
                                                    <td className={`${classes['text-center']}`}>{item.views}</td>
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
                            <div>
                                <nav aria-label="Page navigation">
                                    <div className={`${classes['pagination']}`}>
                                        {nowPage > 1 && (
                                            <span className={`${classes['page-item']}`}>
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
                                            <span className={`${classes['page-item']}`}>
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
                            <div className={`${classes['board-write']}`}>
                                {uno && (
                                    <button onClick={moveQuestionWrite}> 문의하기</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuestionList;