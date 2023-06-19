import {useEffect, useState} from "react";
import axios from "axios";
import Reply from "../../component/Reply";
import "../../page/css/admin/ReplyManagement.css";

const ReplyManagement = () => {
    // 댓글 리스트
    const [replyList, setReplyList] = useState([]);
    // 검색용 변수
    const [searchTypeVal, setSearchTypeVal] = useState("");
    const [searchKeywordVal, setSearchKeywordVal] = useState("");
    const [bTypeVal, setBTypeVal] = useState("");
    // 모달띄우는 false,true 여부 확인
    const [modal, setModal] = useState(false);
    // 특정 rno 에 대한 댓글 담기
    const [selectedReply, setSelectedReply] = useState(null);


    // API 호출하여 댓글 리스트 목록 가져오기 (게시판종류, 검색타입, 검색어)
    const fetchReplyList = async (bType, searchType, searchKeyword) => {
        // 검색된 List<ReplyVO> 리턴받음
        await axios.get("/admin/reply/searchList", {
            params: {
                "btype": bType,
                "searchType": searchType,
                "searchKeyword": searchKeyword,
            },
        })
            .then((response) => {
                setReplyList(response.data);
            })
            .catch((error) => {
                console.log("ReplyManagement_fetchReplyList_error : " + error);
            })
    };

    // 초기 렌더링
    useEffect(() => {
        fetchReplyList("", "", "");
    }, []);


    // 게시판 종류 변경하는 함수
    const changeBType = (e) => {
        setBTypeVal(e.target.value);
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
        fetchReplyList(bTypeVal, searchTypeVal, searchKeywordVal);
    }
    // 검색창 초기화
    const deleteFormSubmit = () => {
        setBTypeVal("");
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
    };

    // replyList 에서 댓글 원소 가져와 변경하기
    const handleReplyClick = (rno) => {
        const selectedReply = replyList.find((item) => item.rno === rno);
        setSelectedReply(selectedReply);
        setModal(true); // 모달 열기
    }

    // 모달 닫는 함수
    const closeModal = () => {
        setModal(false);
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
                                <select value={bTypeVal} onChange={changeBType}>
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
                                            {item.btype}
                                        </td>
                                        <td>
                                            {item.bid}
                                        </td>
                                        <td>
                                            <button style={{
                                                display: 'contents',
                                                fontSize: '15px',
                                                blockSize: '30px'
                                            }} onClick={() => handleReplyClick(item.rno)}>{item.replyComm}</button>
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

            {/* 모달창 */}
            {modal && (
                <div className="modal">
                    <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                        <Reply obj={selectedReply}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReplyManagement;