import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import profileImg from "./images/profile-placeholder.png";
import chatImg from "./images/chat.png"
import className from "../page/css/board/Reply.module.css";

/* ReplyWrite 컴포넌트 : 댓글 작성을 위한 폼을 나타냄 */
const ReplyWrite = (props) => {

    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;
    const name = token.name;
    // 게시글 번호 bid
    const bid = props.bid;
    // Link 용 함수
    const navigate = useNavigate();
    // 댓글 내용 담는 변수
    const [replyComm, setReplyComm] = useState("");

    // 댓글 내용 상태 변경하는 함수
    const createReplyComment = (event) => {
        setReplyComm(event.target.value);
    };

    // 댓글 작성하고 API 로 요청하는 역할
    const createReply = async () => {

        const req = {
            uno: uNo,
            replyComm: replyComm,
            bid: bid,
            name: name,
        }

        await axios
            .post("/reply", req, {
                params: {bid: bid}
            })
            .then((response) => {
                if (response.data.bid !== 0) {
                    navigate(0);
                }
            })
            .catch((error) => {
                console.log("Reply_createReply_axios_errorMessage : " + error.message);
            })
    };


    return (
        <>
            {/* 상단 영역 (프로필 이미지, 댓글 작성자) */}
            <div className={`${className['reply-ttl']}`}>
                <div>
                    <div className={`${className['profile-box']}`}>
                        <img src={profileImg} className={`${className['profile-img']}`}/>
                        <span className={`${className['reply-name']}`}>{name}</span>
                    </div>

                    <div className={`${className['reply-button-box']}`}>
                        <button className={`${className['reply-write-button']}`} onClick={createReply}>
                            <img src={chatImg} className={`${className['chat-img']}`}/>
                            댓글 추가
                        </button>
                    </div>
                </div>
            </div>
            {/* 하단 영역 (댓글 내용) */}
            <div className={`${className['reply-content']}`}>
                <textarea className="col-10" rows="5" value={replyComm} onChange={createReplyComment}></textarea>
            </div>
            <br/><br/>
        </>
    )
}

export default ReplyWrite;