import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import ReplyWrite from "../../component/ReplyWrite";
import ReplyList from "../../component/ReplyList";
import classes from "../css/board/BoardDetail.module.css";

const QuestionDetail = () => {

    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;
    const userRole = token.userRole;
    const [questionDetail, setQuestionDetail] = useState({});
    const [attachments, setAttachments] = useState([]);
    // 파라미터 가져오기
    const {bid} = useParams();
    const navigate = useNavigate();

    const getQuestionDetail = async () => {
        try {
            const response = await axios.get("/board/read", {
                params: {
                    "bid": bid,
                },
            });
            setQuestionDetail(response.data);

            const attachmentResponse = await axios.get("/board/attachment", {
                params: {
                    bid: bid,
                },
            });
            setAttachments(attachmentResponse.data);
        } catch (error) {
            console.log("QuestionDetail_getQuestionDetail_axios_errorMessage : " + error.message);
        }
    };

    // 1:1 문의사항 목록으로 이동하는 함수
    const moveToQuestionList = () => {
        navigate("/board/question");
    };

    // 글 수정 페이지로 이동하는 함수
    const moveToQuestionModify = async () => {
        await axios.get("/board/modify", {params: {bid: bid}})
            .then((response) => {
                navigate(`/board/question/modify/${bid}`);
            })
            .catch((error) => {
                console.log("QuestionDetail_moveToQuestionModify_axios_errorMessage : " + error.message);
            })
    };


    // 글 삭제하는 함수
    const moveToQuestionDelete = async () => {

        const deleteDTO = {
            bid: questionDetail.bid,
            uno: questionDetail.uno,
        };

        await axios.delete('/board/delete', {data: deleteDTO})
            .then((response) => {
                alert("글 삭제되었습니다.");
                navigate("/board/question");
            }).catch((error) => {
                console.log("QuestionDetail_moveToQuestionDelete_axios_errorMessage : " + error.message);
            });
    };


    useEffect(() => {
        getQuestionDetail();
    }, []);


    return (
        <>
            <div className={`${classes['detail-content']}`}>
                <div className={`${classes['common_inner_sub']}`}>
                    <div className={`${classes['evt_detail_ttl']}`}>
                        <h2>고객 문의사항</h2>
                        <p>여러분들의 궁금증을 해결해드립니다.</p>
                    </div>
                    <div className={`${classes['evt_detail_wrap']}`}>
                        <div className={`${classes['evt_detail_cont_ttl']}`}>
                            <h3 id="title" style={{whiteSpace: "normal"}}>{questionDetail.title}</h3>
                            <span className={`${classes['evt_detail_cont_ttl_date']}`}
                                  id="date">{new Date(questionDetail.writeDate).toLocaleString()}</span>
                        </div>
                        <div className={`${classes['evt_detail_cont']}`} id="contents">
                            <span style={{fontSize: "x-large"}}>{questionDetail.content}</span>
                        </div>

                        {/* 수정,삭제,목록보기 버튼 */}
                        <div className={`${classes['stage_step_btn']}`}>
                            <ul>
                                <li className={`${classes['blue_bdr']}`}>
                                    <button onClick={moveToQuestionList}>목록보기</button>
                                </li>
                            </ul>
                            {userRole == '관리자' ? (
                                <>
                                    <ul>
                                        <li className={`${classes['blue_bdr']}`}>
                                            <button onClick={moveToQuestionModify}>수정하기</button>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li className={`${classes['blue_bdr']}`}>
                                            <button onClick={moveToQuestionDelete}>삭제하기</button>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                uNo == questionDetail.uno ? (
                                    <>
                                        <ul>
                                            <li className={`${classes['blue_bdr']}`}>
                                                <button onClick={moveToQuestionModify}>수정하기</button>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li className={`${classes['blue_bdr']}`}>
                                                <button onClick={moveToQuestionDelete}>삭제하기</button>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                            )}
                        </div>
                    </div>

                    {/* 댓글 테이블 */}
                    {/* 댓글 작성 컴포넌트 */}
                    {
                        (uNo != null) ? // 로그인한 사용자만 댓글 작성 가능
                            <ReplyWrite bid={bid}/>
                            :
                            null
                    }

                    {/* 댓글 리스트 컴포넌트 */}
                    <ReplyList bid={bid}/>
                </div>
            </div>
        </>
    );
}


export default QuestionDetail;