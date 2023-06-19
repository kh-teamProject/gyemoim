import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import classes from "../css/board/BoardDetail.module.css";
import facebookImg from "../../component/images/facebook.png";
import kakaotalkImg from "../../component/images/kakaotalk.png";
import linkImg from "../../component/images/copy-link.png";
import ReplyWrite from "../../component/ReplyWrite";
import ReplyList from "../../component/ReplyList";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import viewImg from "../../component/images/view.png";


const NoticeDetail = () => {

    const [noticeDetail, setNoticeDetail] = useState({});
    // 파라미터 가져오기
    const {bid} = useParams();
    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;
    const userRole = token.userRole; // 운영자

    const navigate = useNavigate();

    const getNoticeDetail = async () => {

        await axios.get("/board/read", {
            params: {
                "bid": bid,
            }
        })
            .then((response) => {
                console.log("NoticeDetail_공지사항 게시글 세부내용 가져오기 성공 :D");
                console.log("NoticeDetail_가져온 데이터 : " + response.data);
                console.log("bid 가져와지니? " + bid);
                console.log("readerUNo 가져와지니? " + uNo);

                setNoticeDetail(response.data);

            })
            .catch((error) => {
                console.log("NoticeDetail_getNoticeDetail 게시글 못가져옴 :<");
                console.log("readerUNo = " + uNo);
                console.log("NoticeDetail_axios 에러사항: " + error);
            });
    }


    // 공지사항 목록으로 이동하는 함수
    const moveToNoticeList = (event) => {
        navigate('/board/notice');
    };

    // 글 수정 페이지로 이동하는 함수
    const moveToNoticeModify = async () => {
        await axios.get("/board/modify", {params: {bid: bid}})
            .then((response) => {
                console.log("NoticeDetail.moveToNoticeModify 글 수정 페이지로 이동 :D ");
                navigate(`/board/notice/modify/${bid}`);
            })
            .catch((error) => {
                console.log("NoticeDetail.moveToNoticeModify 글 수정 페이지 이동 안됨 :< ");
                console.log(error);
            })
    };


    // 글 삭제하는 함수
    const moveToNoticeDelete = async () => {

        const deleteDTO = {
            bid: noticeDetail.bid,
            uno: noticeDetail.uno,
        };
        console.log("*** 글 삭제 moveToNoticeDelete 들어옴 ***");

        // post 는 주로 데이터 생성 또는 업데이트 할 때 사용
        await axios.delete("/board/delete", {data: deleteDTO})
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
            <div className={`${classes['detail-content']}`}>
                <div className={`${classes['common_inner_sub']}`}>
                    <div className={`${classes['evt_detail_ttl']}`}>
                        <h2>공지사항</h2>
                        <p>계모임의 주요한 소식을 전달합니다.</p>
                    </div>
                    <div className={`${classes['evt_detail_wrap']}`}>
                        <div className={`${classes['evt_detail_cont_ttl']}`}>
                            <h3 id="title" style={{whiteSpace: "normal"}}>{noticeDetail.title}</h3>
                            <div style={{display: "flex"}}>
                            <span className={`${classes['evt_detail_cont_ttl_date']}`}
                                  id="date">{new Date(noticeDetail.writeDate).toLocaleString()}</span>
                                <span className={`${classes['evt_detail_cont_ttl_views']}`}><img src={viewImg}
                                                                                                 className={`${classes['view-img']}`}/>{noticeDetail.views}</span>
                            </div>
                            <div className={`${classes['evt_share_btns']}`}>
                                <button className={`${classes['event_btns']}`}>
                                    <img alt="facebook-img" src={facebookImg} className={`${classes['facebook-img']}`}/>
                                </button>
                                <button className={`${classes['event_btns']}`}
                                        id="kakaotalk">
                                    <img alt="kakaotalk-img" src={kakaotalkImg}
                                         className={`${classes['kakaotalk-img']}`}/>
                                </button>
                                <button className={`${classes['event_btns']}`}>
                                    <img alt="link-img" src={linkImg} className={`${classes['link-img']}`}/>
                                </button>
                            </div>
                        </div>
                        <div className={`${classes['evt_detail_cont']}`} id="contents">
                            <span style={{fontSize: "x-large"}}>{noticeDetail.content}</span>
                        </div>

                        {/* 수정,삭제,목록보기 버튼 */}
                        <div className={`${classes['stage_step_btn-box']}`}>
                            <div className={`${classes['stage_step_btn']}`}>
                                <ul>
                                    <li className={`${classes['blue_bdr']}`}>
                                        <button onClick={moveToNoticeList}>목록보기</button>
                                    </li>
                                </ul>
                                {userRole == '관리자' && (
                                    <>
                                        <ul>
                                            <li className={`${classes['blue_bdr']}`}>
                                                <button onClick={moveToNoticeModify}>수정하기</button>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li className={`${classes['blue_bdr']}`}>
                                                <button onClick={moveToNoticeDelete}>삭제하기</button>
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </div>
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

export default NoticeDetail;