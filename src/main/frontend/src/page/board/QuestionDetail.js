import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import ReplyWrite from "../../component/ReplyWrite";
import ReplyList from "../../component/ReplyList";

const QuestionDetail = () => {

    const [questionDetail, setQuestionDetail] = useState({});

    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;

    // 파라미터 가져오기
    const {bid} = useParams();


    const navigate = useNavigate();

    const getQuestionDetail = async () => {

        await axios.get("/board/read", {
            params: {
                "bid": bid,
            }
        })
            .then((response) => {
                console.log("QuestionDetail_문의사항 게시글 세부내용 가져오기 성공 :D");
                console.log("QuestionDetail_가져온 데이터: " + response.data);
                console.log("가져온 bid: " + bid);

                setQuestionDetail(response.data);
            })
            .catch((error) => {
                console.log("QuestionDetail_문의사항 게시글 세부내용 못가져옴 :<");
                console.log("QuestionDetail_axios 에러발생: " + error);

            });
    }

    // 1:1 문의사항 목록으로 이동하는 함수
    const moveToQuestionList = (e) => {
        window.location.href = "/board/question";
    }

    // 글 수정 페이지로 이동하는 함수
    const moveToQuestionModify = async () => {
        await axios.get("/board/modify", {params: {bid: bid}})
            .then((response) => {
                console.log("QuestionDetail.moveToQuestionModify 문의사항 수정 페이지로 이동 :D");
            })
            .catch((error) => {
                console.log("QuestionDetail.moveToQuestionModify 문의사항 수정 페이지 이동 안됨 :<");
                console.log("문의사항 에러: " + error);

            })
        window.location.href = `/board/question/modify/${bid}`;
    };


    // 글 삭제하는 함수
    const moveToQuestionDelete = async () => {

        const deleteDTO = {
            bid: questionDetail.bid,
            uno: questionDetail.uno,
        };

        await axios.delete('/board/delete', {data: deleteDTO})
            .then((response) => {
                console.log("moveToQuestionDelete 문의사항 삭제 성공 >< ");
                console.log(response.data);

                alert("글 삭제되었습니다.");
                navigate("/board/question");
            }).catch((error) => {
                console.log("moveToQuestionDelete 문의사항 글 삭제 실패 :<");
                console.log("에러 메시지: " + error);
            });
    };


    useEffect(() => {
        getQuestionDetail();
    }, []);


    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <div className="title">
                                <h1>1:1 문의사항</h1>
                                <p>문의사항 세부내용</p>
                            </div>
                            <div>

                                {/* 수정,삭제,목록보기 버튼 */}
                                <div>
                                    <button className="btn btn-primary btn-lg px-4 me-sm-3"
                                            onClick={moveToQuestionList}>목록보기
                                    </button>
                                    <button className="btn btn-primary btn-lg px-4 me-sm-3"
                                            onClick={moveToQuestionModify}>수정하기
                                    </button>
                                    <button className="btn btn-primary btn-lg px-4 me-sm-3"
                                            onClick={moveToQuestionDelete}>삭제하기
                                    </button>
                                </div>

                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="read-detail">
                                            <div className="col-3"><b>작성자: </b>{questionDetail.name}</div>
                                            <div className="col-3"><b>제목: </b>{questionDetail.title}</div>
                                            <div className="col-3"><b>작성일자: </b>{questionDetail.writeDate}</div>
                                            <div className="col-3"><b>조회수: </b>{questionDetail.views}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="col-3"><b>내용: </b>{questionDetail.content}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-start AttachedFile">
                                            <b>첨부파일 : </b>
                                            <div><img id="ImgPreview" className="preview"/></div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                                {/* 댓글 시작
                                <div id="replyArea">
                                    <div className="card-body">
                                        <textarea className="form-control" name="comm" id="newReplyComm" cols="30"
                                                  rows="3"
                                                  placeholder="댓글을 입력해주세요"></textarea>
                                        <input className="form-control" type="hidden" id="newReplyBid" name="bid"
                                               value={questionDetail.bid}/>
                                        <input className="form-control" type="hidden" id="newReplyUNo" name="uno"
                                               value="{login.uno}"/>
                                        <input className="form-control" type="hidden" id="newReplyName" name="name"
                                               value="{login.name}"/>

                                        <button type="submit"
                                                className="btn btn-primary btn-md px-3 mt-2 me-sm-3 replyAddBtn"
                                                id="replyAddBtn">댓글 작성
                                        </button>


                                         댓글 테이블
                                         댓글 나오고 그 아래에 댓글 수정하기, 삭제하기 버튼 (로그인 uno === 댓글 uno 인 경우에만 실행)

                                    </div>
                                </div>*/}

                                {/* 댓글 작성 컴포넌트 */}
                                {
                                    (uNo != null) ? // 로그인한 사용자만 댓글 작성 가능
                                        <ReplyWrite bid={bid}/>
                                        :
                                        null
                                }

                                {/* 댓글 리스트 컴포넌트 */}
                                <ReplyList bid={bid} />

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default QuestionDetail;