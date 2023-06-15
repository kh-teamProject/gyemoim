import {useEffect, useState} from "react";
import classes from "../css/admin/AccountManagement.module.css";
import {useNavigate} from "react-router-dom";
import Paging from "../../component/Paging";
import axios from "axios";

const ReplyManagement = () => {
    // 댓글 리스트
    const [replyList, setReplyList] = useState([]);
    // 검색용 변수
    const [searchTypeVal, setSearchTypeVal] = useState("");
    const [searchKeywordVal, setSearchKeywordVal] = useState("");
    const [typeVal, setTypeVal] = useState("");


    // Link 용 함수
    const navigate = useNavigate();

    // API 호출하여 댓글 리스트 목록 가져오기 (게시판종류, 검색타입, 검색어)
    const fetchReplyList = async (type, searchType, searchKeyword) => {
        // 검색된 List<ReplyVO> 리턴받음
        await axios.get("/admin/reply/searchList", {
            params: {
                "type": type,
                "searchType": searchType,
                "searchKeyword": searchKeyword,
            },
        })
            .then((response) => {
                console.log("댓글 목록 리스트 : " + response.data);

                setReplyList(response.data);
            })
            .catch((error) => {
                console.log("ReplyManagement_fetchReplyList_error : " + error);
            })
    };

    useEffect(() => {
        fetchReplyList("", "", "");
    }, []);


    // 게시판 종류 변경하는 함수
    const changeType = (e) => {
        setTypeVal(e.target.value);
    }
    // 검색 타입 변경하는 함수
    const changeSearchType = (e) => {
        setSearchTypeVal(e.target.value);
    }
    // 검색어 변경하는 함수
    const changeSearchKeyword = (e) => {
        setSearchKeywordVal(e.target.value);
    }
    // 게시판종류, 검색어타입, 검색키워드 기반으로 조회하는 함수
    const handleFormSubmit = () => {
        fetchReplyList(typeVal, searchTypeVal, searchKeywordVal);
    }
    // 검색창 초기화
    const deleteFormSubmit = () => {
        setTypeVal("");
        setSearchTypeVal("");
        setSearchKeywordVal("");
    }

    // 댓글 작성일자 포맷팅 함수 (YYYY/MM/DD HH:MM:SS)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }


    return (
        <>
            <div>
                <h1>댓글 관리</h1>
                {/* 검색창 시작 */}
                <div style={{display: 'inline-block'}}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <select value={typeVal} onChange={changeType}>
                                    <option value="">게시판 선택</option>
                                    <option value="공지사항">공지</option>
                                    <option value="1:1 문의사항">문의</option>
                                </select>
                            </td>
                            <td>
                                <select value={searchTypeVal} onChange={changeSearchType}>
                                    <option value="">검색 옵션 선택</option>
                                    <option value="bid">게시글 번호</option>
                                    <option value="uno">회원 번호</option>
                                    <option value="name">작성자</option>
                                    <option value="replyComm">내용</option>
                                    <option value="repDate">작성시간</option>
                                </select>
                            </td>
                            <td>
                            <span>
                                <input type="text" placeholder="검색어를 입력하세요."
                                       value={searchKeywordVal}
                                       onChange={changeSearchKeyword}/>
                            </span>
                            </td>
                            <td>
                                <button type="button" onClick={handleFormSubmit}>검색</button>
                            </td>
                            <td>
                                <button type="button" onClick={deleteFormSubmit}>초기화</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/* 검색창 끝 */}

                <div style={{display: 'grid'}}>
                    <table>
                        <thead>
                        <tr>
                            <th>댓글번호</th>
                            <th>게시판</th>
                            <th>게시글번호</th>
                            <th>내용</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                        </thead>

                        <tbody>
                        {replyList.length > 0 ? (
                            replyList.map((item, index) => {
                                const formattedDate = formatDate(item.repDate);

                                return (
                                    <tr key={index}>
                                        <td>
                                            {item.rno}
                                        </td>
                                        <td>
                                            {item.type}
                                        </td>
                                        <td>
                                            {item.bid}
                                        </td>
                                        <td>
                                            {item.replyComm}
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {formattedDate}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" style={{textAlign: "center"}}>
                                    댓글이 없습니다.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default ReplyManagement;