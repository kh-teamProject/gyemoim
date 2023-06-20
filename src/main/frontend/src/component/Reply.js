import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import profileImg from "./images/profile-placeholder.png";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import className from "../page/css/board/Reply.module.css";
import replyModifyImg from "./images/reply-modify-button.png";
import replyDeleteImg from "./images/reply-delete-button.png";

/* 댓글 컴포넌트 */
const Reply = (props) => {

    const token = Cookies.get('Set-Cookie');
    const userRole = jwtDecode(token).userRole;
    const uno = jwtDecode(token).uNo;
    // ReplyList.js 에 있는 댓글 리스트 ReplyList.map 에서 받는 원소 하나하나의 댓글
    const reply = props.obj;
    // 댓글 원소의 댓글번호 rno
    const rno = reply.rno;
    const name = reply.name;
    // Link 용 함수
    const navigate = useNavigate();
    // 댓글 수정 영역 표시 여부
    const [show, setShow] = useState(false);
    // 댓글 내용 담는 변수
    const [replyComm, setReplyComm] = useState(reply.replyComm);

    // 댓글 내용 변경
    const changeComment = (event) => {
        setReplyComm(event.target.value);
    };

    // 댓글 작성일자 포맷팅 함수 (YYYY/MM/DD HH:MM:SS)
    const formatDate = (repDate) => {
        const date = new Date(repDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    /* 댓글 수정 */
    const updateReply = async () => {

        const req = {
            rno: rno,
            replyComm: replyComm
        };

        await axios.patch("/reply", req, {params: {rno: rno}})
            .then((response) => {
                navigate(0);
            }).catch((error) => {
                console.log("Reply_updateReply_axios_errorMessage : " + error.getMessage);
            });

        updateToggle();
    };


    /* 댓글 삭제 */
    const deleteReplyComment = async () => {
        await axios.delete("/reply", {params: {rno: rno}})
            .then((response) => {
                navigate(0);
            }).catch((error) => {
                console.log("Reply_deleteReplyComment_axios_errorMessage : " + error.message);
            })
    };

    // 댓글 수정 영역의 표시 여부 전환하는 함수
    const updateToggle = () => {
        setShow(show => !show)
    };

    return (
        <>
            {/* 상단 영역 (프로필 이미지, 댓글 작성자) */}
            <div className={`${className['reply-ttl']}`}>
                <div>
                    <div className={`${className['profile-box']}`}>
                        <img alt="profile-img" src={profileImg} className={`${className['profile-img']}`}/>
                        <div className={`${className['reply-container']}`}>
                            <span className={`${className['reply-name']}`}>{name}</span>
                            <span className={`${className['reply-repDate']}`}>{formatDate(reply.repDate)}</span>
                        </div>
                    </div>

                    <div className={`${className['reply-button-box']}`}>
                        {/* 자신이 작성한 댓글인 경우와 운영자인 경우 수정, 삭제 가능 */}
                        {(userRole == '관리자' ? (
                                <>
                                    <button className={`${className['reply-modify-button']}`} onClick={updateToggle}>
                                        <img alt="reply-modify-img" src={replyModifyImg}
                                             className={`${className['replyModifyImg']}`}/>
                                        수정
                                    </button>
                                    &nbsp;
                                    <button className={`${className['reply-delete-button']}`}
                                            onClick={deleteReplyComment}>
                                        <img alt="reply-delete-img" src={replyDeleteImg}
                                             className={`${className['replyDeleteImg']}`}/>
                                        삭제
                                    </button>
                                </>
                            ) : (
                                reply.uno === uno ? (
                                    <>
                                        <button className={`${className['reply-modify-button']}`}
                                                onClick={updateToggle}>
                                            <img alt="reply-modify-img" src={replyModifyImg}
                                                 className={`${className['replyModifyImg']}`}/>
                                            수정
                                        </button>
                                        &nbsp;
                                        <button className={`${className['reply-delete-button']}`}
                                                onClick={deleteReplyComment}>
                                            <img alt="reply-delete-img" src={replyDeleteImg}
                                                 className={`${className['replyDeleteImg']}`}/>
                                            삭제
                                        </button>
                                    </>
                                ) : (
                                    null
                                ))
                        )}
                    </div>

                </div>
            </div>

            {/* 하단 영역 (댓글 내용) */}
            <div className={`${className['reply-content']}`}>
                {
                    /* 댓글 수정하는 경우 */
                    show ?
                        <>
                            {/* 수정하는 경우 : 하단 영역 (댓글 내용 + 댓글 내용 편집 창) */}
                            <div className={`${className['reply-content']}`}>
                                <textarea className="col-10" rows="5" value={replyComm}
                                          onChange={changeComment}></textarea>
                            </div>
                            <div className="my-1 d-flex justify-content-center">
                                <button className="btn btn-dark" onClick={updateReply}> 수정 완료</button>
                            </div>
                        </>
                        :
                        <>
                            {/* 수정 안하는 경우 : 하단 영역 (댓글 내용) */}
                            <div className={`${className['reply-content']}`}>
                                <textarea className="col-10" rows="5" value={replyComm} readOnly></textarea>
                            </div>
                        </>
                }
            </div>
        </>
    )
}


export default Reply;