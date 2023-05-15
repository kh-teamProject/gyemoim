import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

/*
const NoticeDetail = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [views, setViews] = useState(0);
    const [writeDate, setWriteDate] = useState(writeDate);
    // useLocation() : useLocation 훅은 현재의 URL 을 대표하는 location 객체를 반환한다.
    // URL 이 바뀔 때마다 새로운 location 이 반환되는 useState 처럼 생각할 수 있다.

    const location = useLocation();
    const navigate = useNavigate();

    const bid = location.state.bid; // 상세보기하려는 게시글의 id값 즉, bid 값

    const handleDeleteBtnClick = async (e) => {
        e.preventDefault();

        if (window.confirm("게시글을 삭제하겠습니까?")) {
            const request_data = {bid: bid};
            let response = await axios({
                method: 'delete',
                url: '/board/delete',
                headers: {'Content-type': 'application/json'},
                data: JSON.stringify(request_data)
            });
            console.log('NoticeDetail/handleDeleteBtnClick/response: ', response);

            if (response.status === 204) {
                alert("게시글 삭제 완료!")
                navigate("board/list", {});
            }
            else {
                alert("게시글 삭제 실패 :<")
            }

        }
        else {
            return
        }
    };

    useEffect(() => {
        const getNoticeDetail = async () => {
            let response = await axios.get(`/board/notice/detail/${bid}`);
            console.log('NoticeDetail/response: ' , response);
            console.log('NoticeDetail/response.data: ' , response.data)
            console.log('NoticeDetail/response.data.data: ', response.data.data);
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
            setViews(response.data.data.views+1);
        }

        getNoticeDetail();
    }, [])


    return (
        < >

        </>
    );
}
*/

/*
const NoticeDetail = () => {

    const [board, setBoard] = useState({});
    const [attached, setAttached] = useState({});
    const [reply, setReply] = useState([]);
    const [login, setLogin] = useState({});


    useEffect(() => {
        // 데이터 로드 및 설정하는 로직 추가

        // board, attached, reply, login 데이터 설정 예시
        const fetchedNotice = {
            getTitle: () => '게시글 제목',
            getName: () => '작성자 이름',
            getWriteDate: () => '작성일자',
            getViews: () => '조회수',
            getContent: () => '게시글 내용',
            getBid: () => '게시글 번호',
            uNo: '작성자 ID',
        };

        const fetchedAttached = {
            getFileName: () => '첨부파일 이름',
        };

        const fetchedReply = [
            {
                getRno: () => '댓글 ID',
                getName: () => '작성자 이름',
                getRepDate: () => '댓글 작성일자',
                getComm: () => '댓글 내용',
                uNo: '작성자 ID',
            },
        ];

        const fetchedLogin = {
            getUno: () => '로그인한 사용자 ID',
            getName: () => '로그인한 사용자 이름',
        };

        setBoard(fetchedNotice);
        setAttached(fetchedAttached);
        setReply(fetchedReply);
        setLogin(fetchedLogin);
    }, []);


    const handleReplyAddBtnClick = () => {
        // 댓글 작성 버튼 클릭 시 처리 로직
        // 작성한 댓글 데이터를 서버로 전송하는 코드 작성

    };

    const handleFakeReplyModifyBtnClick = () => {
        // 댓글 수적 버튼 클릭 시 처리 로직
        // 수정 가능한 상태로 입력 필드 변경하는 코드 작성
    };

    const handleReplyModifyBtnClick = () => {
        // 수정한 댓글 데이터를 서버로 전송하는 코드 작성
    };

    const handleReplyDeleteBtnClick = () => {
        // 댓글 삭제 버튼 클릭 시 처리 로직
        // 삭제할 댓글 데이터를 서버로 전송하는 코드 작성
    };

    return (
        // JSX 코드 이어서 작성
    );


}
 */


/*
const NoticeDetail = ({bid}) => {

    const [board, setBoard] = useState(null);
    const [attached, setAttached] = useState([]);
    const [reply, setReply] = useState([]);
    //const [login, setLogin] = useState({});


    useEffect(() => {
        // 데이터 로드 및 설정하는 로직 추가

        // board, attached, reply, login 데이터 설정 예시
        // 게시글 상세 내용
        const fetchedNoticeDetail = async () =>{
            getTitle: () => '게시글 제목',
            getName: () => '작성자 이름',
            getWriteDate: () => '작성일자',
            getViews: () => '조회수',
            getContent: () => '게시글 내용',
            getBid: () => '게시글 번호',
            uNo: '작성자 ID',
            try {
                const response = await getBoardDetail(bid);
                setBoard(response.data);
            } catch (error) {
                // 오류 처리
                console.log("NoticeDetail_fetchedNoticeDetail_not_success :< " + error);
            }
        };

        // 첨부파일 목록
        const fetchedAttachedList = async () =>{
            getFileName: () => '첨부파일 이름',
            try {
                const response = await getAttachedList(bid);
                setAttached(response.data);
            } catch (error) {
                // 오류처리
                console.log("NoticeDetail_fetchedAttachedList_not success :< " + error);
            }
        };

        // 댓글 목록
        const fetchedReplyList = async () => {
            try {
                const response = await getReplyList(bid);
                setReply(response.data);
            } catch (error) {
                // 오류 처리
                console.log("NoticeDetail_fetchedReplyList_not success :< " + error);
            }
        };

        const fetchedLogin = {
            getUNo: () => '로그인한 사용자 ID',
        };

        setBoard(fetchedNotice);
        setAttached(fetchedAttached);
        setReply(fetchedReply);
        setLogin(fetchedLogin);
    }, [bid]);


    const handleReplyAddBtnClick = () => {
        // 댓글 작성 버튼 클릭 시 처리 로직
        // 작성한 댓글 데이터를 서버로 전송하는 코드 작성

    };

    const handleFakeReplyModifyBtnClick = () => {
        // 댓글 수적 버튼 클릭 시 처리 로직
        // 수정 가능한 상태로 입력 필드 변경하는 코드 작성
    };

    const handleReplyModifyBtnClick = () => {
        // 수정한 댓글 데이터를 서버로 전송하는 코드 작성
    };

    const handleReplyDeleteBtnClick = () => {
        // 댓글 삭제 버튼 클릭 시 처리 로직
        // 삭제할 댓글 데이터를 서버로 전송하는 코드 작성
    };

    return (
        <>
            <section className="py-5">
                <div className="container px-5">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <div className="title">
                                <h1>공지사항</h1>
                                <p>공지사항을 알립니다.</p>
                            </div>
                            <div className="container">
                                <table className="table text-center">
                                    <tr>
                                        <td>
                                            <h2>제목: {board.getTitle()} </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="read-detail">
                                            <div>
                                                <b>작성자 : </b>
                                                {board.getName()}
                                            </div>
                                            <div>
                                                <b>작성일자 : </b>
                                                {board.getWriteDate()}
                                            </div>
                                            <div>
                                                <b>조회수 : </b>
                                                {board.getViews()}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="read-content p-3">{board.getContent()}</td>
                                    </tr>

                                    {attached.getFileName() != null && (
                                        <tr>
                                            <td className="text-start AttachedFile">
                                                <b>첨부파일 : </b>{' '}
                                                <Link to={`/fileDownload?fileName=${attached.getFileName()}`}>
                                                    {attached.getFileName()}

                                                    <br/>
                                                    <div className="fileImg pt-3">
                                                        <img
                                                            id="ImgPreview"
                                                            name="fileName"
                                                            src={`/fileDownload?fileName=${attached.getFileName()}`}
                                                            className="preview"
                                                        />
                                                    </div>
                                                    <input type="hidden" id="write-input-bid" name="fileName"
                                                           value={attached.getFileName()}/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )}
                                </table>


                                <div id="replyArea" className="card bg-light replyArea">
                                    <div className="card-body">
                                        <textarea className="form-control" name="comm" id="newReplyComm" cols="30" rows="3" placeholder="댓글을 입력해주세요"></textarea>
                                        <input className="form-control" type="hidden" id="newReplyBid" name="bid" value={board.getBid()}/>
                                        <input className="form-control" type="hidden" id="newReplyUNo" name="uNo" value={login.getUNo()}/>
                                        <button type="submit" className="btn btn-primary btn-md px-3 mt-2 me-sm-3 replyAddBtn" id="replyAddBtn" onClick={handleReplyAddBtnClick}>
                                            댓글작성하기
                                        </button>

                                        <table id="reply" className="table mt-3">
                                            {reply.map((item) => (
                                                <React.Fragment key={item.getRNo()}>
                                                    <tr>
                                                        <td className="replyInfo">
                                                            <div className="fw-bold pb-0">{item.getName()}</div>
                                                                <div className="small fst-italic">{item.getRepDate()}</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input className="reply-contents form-control newModifyComm" id="newModifyComm" name="comm" value={item.getComm()} readOnly />
                                                            <input className="form-control" type="hidden" id="newReplyRno" name="rno" value={item.getRNo()} />

                                                            {item.uNo === login.uNo && (
                                                                <>

                                                                    <button type="submit" id="fakeReplyModifyBtn" className="fakeReplyModifyBtn btn-primary" onClick={handleFakeReplyModifyBtnClick} >
                                                                        수정하기
                                                                    </button><button type="submit" id="replyModifyBtn" className="replyModifyBtn btn-primary" onClick={handleReplyModifyBtnClick} >
                                                                        수정하기
                                                                    </button>
                                                                    <button type="submit" id="replyDeleteBtn" className="replyDeleteBtn btn-danger" onClick={handleReplyDeleteBtnClick} >
                                                                        삭제하기
                                                                    </button>
                                                                </>
                                                                )}
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </table>
                                    </div>
                                </div>


                                <div className="read-btn-area mt-4 text-center">
                                    {board.uNo === login.uNo && (
                                        <>
                                            <input type="button" value="목록보기" className="btn btn-primary btn-lg px-4 me-sm-3" onClick={() => (window.location.href = '/board/notice')}/>
                                            <input type="button" value="수정하기" className="btn btn-primary btn-lg px-4 me-sm-3" onClick={() => (window.location.href = `/board/notice/modify?bid=${board.getBid()}`)}/>
                                            <input type="button" value="삭제하기" className="btn btn-danger btn-lg px-4 me-sm-3" onClick={() => (window.location.href = `/board/notice/delete?bid=${board.getBid()}&uNo=${login.uNo}`)}/>
                                        </>
                                    )}
                                    {board.uNo !== login.uNo && (
                                        <input type="button" value="목록보기" className="btn btn-primary btn-lg px-4 me-sm-3" onClick={() => (window.location.href = '/board/notice')}/>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
*/

const NoticeDetail = () => {


    return (
        <>
        </>
    );
}

export default NoticeDetail;