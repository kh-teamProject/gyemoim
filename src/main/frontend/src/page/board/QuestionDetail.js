import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import ReplyWrite from "../../component/ReplyWrite";
import ReplyList from "../../component/ReplyList";
import classes from "../css/board/BoardDetail.module.css";

const QuestionDetail = () => {

    const [questionDetail, setQuestionDetail] = useState({});
    const [attachments, setAttachments] = useState([]);

    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;
    const name = token.name;
    const userRole = token.userRole;

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
            console.log("QuestionDetail_문의사항 게시글 세부내용 가져오기 성공 :D");
            console.log("QuestionDetail_가져온 데이터: " + response.data);
            console.log("가져온 bid: " + bid);

            setQuestionDetail(response.data);

            const attachmentResponse = await axios.get("/board/attachment", {
                params: {
                    bid: bid,
                },
            });
            setAttachments(attachmentResponse.data);
        } catch (error) {
            console.log("QuestionDetail_문의사항 게시글 세부내용 못가져옴 :<");
            console.log("QuestionDetail_axios 에러발생: " + error);

        }
    };


    // 1:1 문의사항 목록으로 이동하는 함수
    const moveToQuestionList = (e) => {
        navigate("/board/question");
    }

    // 글 수정 페이지로 이동하는 함수
    const moveToQuestionModify = async () => {
        await axios.get("/board/modify", {params: {bid: bid}})
            .then((response) => {
                console.log("QuestionDetail.moveToQuestionModify 문의사항 수정 페이지로 이동 :D");
                navigate(`/board/question/modify/${bid}`);
            })
            .catch((error) => {
                console.log("QuestionDetail.moveToQuestionModify 문의사항 수정 페이지 이동 안됨 :<");
                console.log("문의사항 에러: " + error);

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
                console.log("moveToQuestionDelete 문의사항 삭제 성공 >< ");
                console.log(response.data);

                alert("글 삭제되었습니다.");
                navigate("/board/question");
            }).catch((error) => {
                console.log("moveToQuestionDelete 문의사항 글 삭제 실패 :<");
                console.log("에러 메시지: " + error);
            });
    };

    // 이미지 파일인지 확인하는 함수
    const isImageFile = (fileName) => {
        const imageExtension = ["jpg", "jpeg", "png", "gif"]; // 이미지 확장자 목록

        const extension = fileName.split(".").pop().toLowerCase();
        return imageExtension.includes(extension);
    };

    // 첨부파일 다운로드 함수
    const downloadAttachment = (attachedID) => {
        axios({
            url: `/attachments/download/${attachedID}`,
            method: 'GET',
            responseType: "blob",
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute("download", response.headers.filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log("첨부파일 다운로드 에러: ", error);
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
                                    <></>
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