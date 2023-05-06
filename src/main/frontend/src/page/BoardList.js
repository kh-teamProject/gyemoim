import axios from "axios";
import Formm from "../component/Formm";
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Pagination from "react-js-pagination";

const BoardList = () => {

    const [boardList, setBoardList] = useState([]);

    // 검색용 Hook
    const [choiceVal, setChoiceVal] = useState("");// 내가 선택하는 검색 타입
    const [searchVal, setSearchVal] = useState("");// 내가 입력하는 검색어

    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    // Link용 (함수)
    // Link 는 특정 주소로 이동해주는 태그
    // Navigate 는 특정 행동을 했을 때 해당 주소로 이동해줄 수 있게 만들어줌
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('/list')
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    /* [GET /board] : 게시글 목록 */
    const getBoardList = async (choice, search, page) => {

        await axios.get("http://localhost:3000/board", {params: {"choice": choice, "search": search, "page": page}})
            .then((resp) => {
                console.log("[BoardList.js] useEffect() success :D");
                console.log(resp.data);

                setBoardList(resp.data.boardList);//boardList
                setTotalCnt(resp.data.pageCnt);
            })
            .catch((err) => {
                console.log("[BoardList.js] useEffect() error :<");
                console.log(err);

            });
    }

    // useEffect() 란
    // react component가 렌더링 될 때마다 특정 작업(side effect)을 실행할 수 있도록 하는 리액트 Hook 이다.
    // 여기서 side effect 는 component 가 렌더링 된 이후에 비동기로 처리되어야 하는 부수적인 효과들을 뜻함
    // 이로 인해 함수형 컴포넌트에서도 클래스형 컴포넌트에서 사용했던 생명주기 메서드를 사용할 수 있게 된다.
    // 첫번째 파라미터는 실행하고자 하는 함수, 두번째 파라미터는 의존값이 들어있는 배열 형태(함수를 실행시킬 조건)
    // 만일 두번째 파라미터 deps를 비우게 되면 컴포넌트가 처음 나타날때만
    // useEffect 에 등록한 함수가 호출된다.
    // 그리고 useEffect 에선 함수를 반환할 수 있는데 이것을 cleanup 함수라고 한다.
    // cleanup 함수는 useEffect 에 대한 뒷정리를 해준다고 이해하면 된다.
    // deps 가 비어있는 경우에는 컴포넌트가 사라질때 cleanup 함수가 호출된다.

    // deps 위치에 빈 배열을 넣어주게 되면
    // 맨 처음 렌더링 될 때 한번만 getBoardList 함수를 실행하게 된다.
    useEffect(() => {
        getBoardList("", "", 1);
    }, []);


    const changeChoice = (event) => {
        setChoiceVal(event.target.value);
    }
    const changeSearch = (event) => {
        setSearchVal(event.target.value);
    }

    /* 검색타입과 검색어 입력 후 수행되는 검색 함수 */
    const search = () => {
        console.log("[BoardList.js searchBtn()] choiceVal=" + choiceVal + ", searchVal=" + searchVal);

        navigate("/boardList");
        getBoardList(choiceVal, searchVal, 1);

    }

    const changePage = (page) => {
        setPage(page);
        getBoardList(choiceVal, searchVal, page);
    }


    return (
        /*<Formm title={"board"}/>*/

        <div>
            {/* 검색 */}
            <table className="search">
                <tbody>
                <tr>
                    <td>
                        <select className="custom-select" value={choiceVal} onChange={changeChoice}>
                            <option>검색 옵션 선택</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                            <option value="name">작성자</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" className="form-control" placeholder="검색어" value={searchVal}
                               onChange={changeSearch}/>
                    </td>
                    <td>
                        <button type="button" className="btn btn-outline-secondary" onClick={search}>검색</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <br/>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="text-center">글번호</th>
                    <th className="text-center">작성자</th>
                    <th className="text-center">작성일</th>
                    <th className="text-center">조회수</th>
                </tr>
                </thead>

                <tbody>
                {
                    boardList.map(function (board, idx) {
                        return (
                            <TableRow obj={board} key={idx} cnt={idx + 1}/>
                        )
                    })
                }
                </tbody>

            </table>

            <Pagination className="pagination"
                        activePage={page}
                        itemsCountPerPage={10}
                        totalItemsCount={totalCnt}
                        pageRangeDisplayed={5}
                        prevPageText={"<"}
                        nextPageText={">"}
                        onChange={changePage}/>

            <div className="my-5 d-flex justify-content-center">
                <Link className="btn btn-outline-secondary" to="/boardWrite"><i
                    className="fas fa-pen"></i> &nbsp; 글쓰기</Link>
            </div>

        </div>

    );
}

/* 글 목록 테이블 행 컴포넌트 */
const TableRow = (props) => {

    const board = props.obj;

    return (
        <tr>
            <th>{props.cnt}</th>
            {
                (board.del == 0) ?
                    <>
                        <td>
                            <Link to={{pathname: `/boardDetail/${board.bid}`}}>{/* 게시글 상세 링크 */}
                                <span className="underline bbs-title">{board.title}</span>{/* 게시글 제목 */}
                            </Link>
                        </td>
                        <td>{board.bid}</td>
                    </>
                    :
                    <>
                        <td>
                            <span className="del-span">⚠️ 이 글은 작성자에 의해 삭제됐습니다.</span>
                        </td>
                    </>
            }
        </tr>
    );
}

export default BoardList;