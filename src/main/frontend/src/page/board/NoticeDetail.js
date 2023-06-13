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


const NoticeDetail = () => {

    const [noticeDetail, setNoticeDetail] = useState({});
    // 파라미터 가져오기
    const {bid} = useParams();
    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;

    const navigate = useNavigate();

    const getNoticeDetail = async () => {

        await axios.get("/board/read", {
            params: {
                "bid": bid,
                "increaseViews": false, // 조회수 증가 여부를 false 로 설정
            }
        })
            .then((response) => {
                console.log("NoticeDetail_공지사항 게시글 세부내용 가져오기 성공 :D");
                console.log("NoticeDetail_가져온 데이터 : " + response.data);
                console.log("bid 가져와지니? " + bid);
                //console.log("readerUNo 가져와지니? " + readerUno);

                setNoticeDetail(response.data);
            })
            .catch((error) => {
                console.log("NoticeDetail_getNoticeDetail 게시글 못가져옴 :<");
                //console.log("readerUNo = " + readerUno);
                console.log("NoticeDetail_axios 에러사항: " + error);
            });
    }

    // 파일 다운로드
    const downloadImage = async (fileName) => {
        const url = "";
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

    const handleFacebookShare = () => {
        // Facebook 공유 기능 구현
    };

    const handleKakaoTalkShare = () => {
        // 카카오톡 공유 기능 구현
    };

    const handleLinkCopy = () => {
        // 링크 복사 기능 구현
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
                            <span className={`${classes['evt_detail_cont_ttl_date']}`}
                                  id="date">{new Date(noticeDetail.writeDate).toLocaleString()}</span>
                            <div className={`${classes['evt_share_btns']}`}>
                                <button onClick={handleFacebookShare}>
                                    <img src={facebookImg} className={`${classes['facebook-img']}`}/>
                                </button>
                                <button onClick={handleKakaoTalkShare} id="kakaotalk">
                                    <img src={kakaotalkImg} className={`${classes['kakaotalk-img']}`}/>
                                </button>
                                <button onClick={handleLinkCopy}>
                                    <img src={linkImg} className={`${classes['link-img']}`}/>
                                </button>
                            </div>
                        </div>
                        <div className={`${classes['evt_detail_cont']}`} id="contents">
                            <span style={{fontSize: "x-large"}}>{noticeDetail.content}</span>
                        </div>

                        {/* 수정,삭제,목록보기 버튼 */}
                        <div className={`${classes['stage_step_btn']}`}>
                            <ul>
                                <li className={`${classes['blue_bdr']}`}>
                                    <button onClick={moveToNoticeList}>목록보기</button>
                                </li>
                            </ul>
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
                        </div>
                    </div>


                    {/*댓글 시작
                    <div id="replyArea">
                        <div className={`${classes['card-body']}`}>
                                        <textarea className="form-control" name="comm" id="newReplyComm" cols="30"
                                                  rows="3"
                                                  placeholder="댓글을 입력해주세요"></textarea>
                            <input className="form-control" type="hidden" id="newReplyBid" name="bid"
                                   value={noticeDetail.bid || ''}/>
                            <input className="form-control" type="hidden" id="newReplyUNo" name="uno"
                                   value="{login.uno}"/>
                            <input className="form-control" type="hidden" id="newReplyName" name="name"
                                   value="{login.name}"/>

                            <button type="submit"
                                    className="btn btn-primary btn-md px-3 mt-2 me-sm-3 replyAddBtn"
                                    id="replyAddBtn">댓글 작성
                            </button>

                        </div>
                    </div>*/}

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