import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import profileImg from "./images/profile-placeholder.png";

/* ReplyWrite 컴포넌트 : 댓글 작성을 위한 폼을 나타냄 */
const ReplyWrite = (props) => {

    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;

    /*const uno = uNo;*/
    const bid = props.bid;

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
        }

        await axios
            .post("/reply", req, {
                params: {bid: bid}
            })
            .then((response) => {
                console.log("ReplyWrite_createReply 댓글 작성 성공 :D");
                console.log("댓글 응답 데이터: " + response.data);

                if (response.data.bid !== 0) {
                    alert("댓글을 성공적으로 작성했습니다!");
                    navigate(0);
                }
            })
            .catch((error) => {
                console.log("ReplyWrite_createReply 댓글 작성 실패 :<");
                console.log("보낼 댓글정보: " + req);
                console.log(error);
            })

    }


    return (
        <>
            {/* 상단 영역 (프로필 이미지, 댓글 작성자) */}
            <div className="my-1 d-flex justify-content-center">
                <div className="col-1">
                    <img style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "ivory"
                    }} src={profileImg} className="profile-img"/>
                </div>

                <div className="col-7">
                    <span style={{fontWeight: "bold"}} className="comment-id">{uNo}</span>
                </div>
                <div className="col-2 my-1 d-flex justify-content-end">
                    <button className="btn btn-outline-secondary" onClick={createReply}><i
                        className="fas fa-comment-dots"></i> 댓글 추가
                    </button>
                </div>
            </div>
            {/* 하단 영역 (댓글 내용) */}
            <div className="my-3 d-flex justify-content-center">
                <textarea className="col-10" rows="5" value={replyComm} onChange={createReplyComment}></textarea>
            </div>
            <br/><br/>
        </>
    )
}

export default ReplyWrite;