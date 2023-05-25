import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


const NoticeDetail = () => {

    const [noticeDetail, setNoticeDetail] = useState({});
    // 파라미터 가져오기
    const {bid} = useParams();

    const navigate = useNavigate();

    const getNoticeDetail = async () => {

        await axios.get("/board/read", {params: {bid: bid}})
            .then((response) => {
                console.log("NoticeDetail_공지사항 게시글 세부내용 가져오기 성공 :D");
                console.log("NoticeDetail_가져온 데이터 : " + response.data);
                console.log("bid 가져와지니? " + bid);

                setNoticeDetail(response.data);
            })
            .catch((error) => {
                console.log("NoticeDetail_getNoticeDetail 게시글 못가져옴 :<");
                console.log("NoticeDetail_axios 에러사항: " + error);
            });
    }

    // 공지사항 목록으로 이동하는 함수
    const moveToNoticeList = (event) => {
        window.location.href = '/board/notice';
    };

    // 글 수정 페이지로 이동하는 함수
    const moveToNoticeModify = async () => {
        await axios.get("/board/modify", {params: {bid: bid}})
            .then((response) => {
                console.log("NoticeDetail.moveToNoticeModify 글 수정 페이지로 이동 :D ");

            })
            .catch((error) => {
                console.log("NoticeDetail.moveToNoticeModify 글 수정 페이지 이동 안됨 :< ");
                console.log(error);
            })
        window.location.href = `/board/notice/modify/${bid}`;
    };



    // 글 삭제하는 함수
    const moveToNoticeDelete = async () => {

        const deleteDTO = {
            bid: noticeDetail.bid,
            uno: noticeDetail.uno,
        };

        // post 는 주로 데이터 생성 또는 업데이트 할 때 사용
        await axios.delete('/board/delete', {data: deleteDTO})
            .then((response) => {
                console.log("moveToNoticeDelete 글 삭제 성공 :D");
                console.log(response.data);

                alert("글 삭제되었습니다.");
                navigate("/board/notice");
            }).catch((error) => {
                console.log("moveToNoticeDelete 글 삭제 실패 :<");
                console.log("글 삭제 에러: " + error);

            });

    };


    useEffect(() => {
        getNoticeDetail();
    }, []);

    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <div className="title">
                                <h1>공지사항</h1>
                                <p>공지사항 세부내용</p>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="read-detail">
                                            <div><b>작성자: </b>{noticeDetail.name}</div>
                                            <div><b>제목: </b>{noticeDetail.title}</div>
                                            <div><b>작성일자: </b>{noticeDetail.writeDate}</div>
                                            <div><b>조회수: </b>{noticeDetail.views}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="read-content p-3"><b>내용: </b>{noticeDetail.content}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-start AttachedFile">
                                            <b>첨부파일 : </b>
                                            <div><img id="ImgPreview" className="preview"/></div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                                {/* 댓글 시작 */}
                                <div id="replyArea">
                                    <div className="card-body">
                                        <textarea className="form-control" name="comm" id="newReplyComm" cols="30" rows="3"
                                                  placeholder="댓글을 입력해주세요"></textarea>
                                        <input className="form-control" type="hidden" id="newReplyBid" name="bid" value={noticeDetail.bid} />
                                        <input className="form-control" type="hidden" id="newReplyUNo" name="uno" value="{login.uno}" />
                                        <input className="form-control" type="hidden" id="newReplyName" name="name" value="{login.name}" />

                                        <button type="submit" className="btn btn-primary btn-md px-3 mt-2 me-sm-3 replyAddBtn" id="replyAddBtn">댓글 작성</button>


                                        {/* 댓글 테이블 */}
                                        {/* 댓글 나오고 그 아래에 댓글 수정하기, 삭제하기 버튼 (로그인 uno === 댓글 uno 인 경우에만 실행) */}

                                    </div>
                                </div>

                                {/* 수정,삭제,목록보기 버튼 */}
                                <div>
                                    <button className="btn btn-primary btn-lg px-4 me-sm-3" onClick={moveToNoticeList}>목록보기</button>
                                    <button className="btn btn-primary btn-lg px-4 me-sm-3" onClick={moveToNoticeModify}>수정하기</button>
                                    <button className="btn btn-primary btn-lg px-4 me-sm-3" onClick={moveToNoticeDelete}>삭제하기</button>
                                </div>
                                <br/><br/>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NoticeDetail;