import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import profileImg from "./images/profile-placeholder.png";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

/* 댓글 컴포넌트 */
const Reply = (props) => {

    const token = jwtDecode(Cookies.get('Set-Cookie'));

    // ReplyList.js 에 있는 댓글 리스트 ReplyList.map 에서 받는 원소 하나하나의 댓글
    const reply = props.obj;

    // 댓글 원소의 댓글번호 rno
    const rno = reply.rno;

    const navigate = useNavigate();

    // 댓글 수정 영역 표시 여부
    const [show, setShow] = useState(false);

    // 댓글 내용 담는 변수
    const [replyComm, setReplyComm] = useState(reply.replyComm);

    // 댓글 내용 변경
    const changeComment = (event) => {
        setReplyComm(event.target.value);
    };

    // 수정된 날짜 포맷 변경 함수
    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().replace(/T/, " ").replace(/\..+/, "");
        return formattedDate;
    }

    /* 댓글 수정 */
    const updateReply = async () => {

        const req = {
            rno: rno,
            replyComm: replyComm
        };

        await axios.patch("/reply", req, {params: {rno: rno}})
            .then((response) => {
                console.log("댓글 수정 성공 :D");
                console.log(response.data);

                alert("댓글을 성공적으로 수정했습니다. :D");
                navigate(0);
            }).catch((error) => {
                console.log("댓글 수정 실패 :<");
                console.log(error);

                alert(error.response.data);
            });

        updateToggle();
    }


    /* 댓글 삭제 */
    const deleteReplyComment = async () => {
        await axios.delete("/reply", {params: {rno: rno}})
            .then((response) => {
                console.log("댓글 삭제 성공 :D");
                console.log("response.data: " + response.data);

                alert("댓글을 성공적으로 삭제했습니다. :D");
                navigate(0);
            }).catch((error) => {
                console.log("댓글 삭제 실패 :<");
                console.log("에러 메시지 : " + error.message);
            })
    }

    // 댓글 수정 영역의 표시 여부 전환하는 함수
    const updateToggle = () => {
        setShow(show => !show)
    }

    return (
        <>
            {/* 상단 영역 (프로필 이미지, 댓글 작성자, 댓글 작성시간) */}
            <div>
                <div>
                    <img style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "ivory"
                    }} src={profileImg} alt="프로필 이미지" className="profile-img"/>
                </div>
                <div>
                    <div>
                        <span className="reply-uNo">{reply.uno}</span>
                    </div>
                    <div>
                        <span>{formatDate(reply.repDate)}</span>
                    </div>
                </div>
                <div>
                    {/* 자신이 작성한 댓글인 경우에만 수정, 삭제 가능 */}
                    {(reply.uno === token.uNo) ? (
                        <>
                            <button onClick={updateToggle}> 댓글 수정</button>
                            &nbsp;
                            <button onClick={deleteReplyComment}> 댓글 삭제</button>
                        </>
                    ) : null}
                </div>
            </div>

            {
                /* 댓글 수정하는 경우 */
                show ?
                    <>
                        {/* 수정하는 경우 : 하단 영역 (댓글 내용 + 댓글 내용 편집 창) */}
                        <div className="my-3 d-flex justify-content-center">
                            <textarea className="col-10" rows="5" value={replyComm} onChange={changeComment}></textarea>
                        </div>
                        <div className="my-1 d-flex justify-content-center">
                            <button className="btn btn-dark" onClick={updateReply}> 수정 완료</button>
                        </div>
                    </>
                    :
                    <>
                        {/* 수정 안하는 경우 : 하단 영역 (댓글 내용) */}
                        <div className="my-3 d-flex justify-content-center">
                            <div className="col-10 reply">{replyComm}</div>
                        </div>
                    </>
            }
        </>
    )
}


export default Reply;