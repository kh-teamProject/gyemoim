import {useContext, useState} from "react";
import {AuthContext} from "./AuthProvider";
import {HttpHeadersContext} from "./HttpHeadersProvider";
import {useNavigate} from "react-router-dom";
import axios from "axios";


/* 댓글 컴포넌트 */
const Reply = (props) => {

    const {auth, setAuth} = useContext(AuthContext);
    const {headers, setHeaders} = useContext(HttpHeadersContext);
    const reply = props.obj;

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const [comm, setComm] = useState(reply.comm);

    const changeComm = (event) => {
      setComm(event.target.value);
    };



    /* 댓글 수정 */
    const updateReply = async () => {

        const req = {
            comm: comm
        };

        await axios.patch(`http://localhost:3000/reply/${reply.rno}`, req, {headers: headers})
            .then((resp) => {

                console.log("[Reply.js] updateReply() success :D");
                console.log(resp.data);

                alert("댓글을 성공적으로 수정했습니다!");
                navigate(0);

            }).catch((err) => {

                console.log("[Reply.js] updateReply() error :<");
                console.log(err);

                alert(err.response.data);

            });

        updateToggle();

    }



    /* 댓글 삭제 */
    const deleteReply = async () => {
        await axios.delete(`http://localhost:3000/reply/${reply.rno}`)
            .then((resp) => {
                console.log("[BoardReply.js] deleteReply() success :D");
                console.log(resp.data);

                if(resp.data.deletedRecordCount == 1) {
                    alert("댓글을 성공적으로 삭제했습니다 :D");
                    navigate(0);
                }
            }).catch((err) => {
                console.log("[BoardReply.js] deleteReply() error :<");
                console.log(err);
            });
    }


    const updateToggle = () => {
        setShow(show => !show)
    }


    // 삭제되지 않은 댓글의 경우
    if (reply.del == 0) {
        return (
            <>
                {/* 상단 영역 (프로필 이미지, 댓글 작성자, 댓글 작성시간) */}
                <div>
                    <div>
                        <img src="/images/profile-placeholder.png" alt="프로필 이미지" className="profile-img" />
                    </div>
                    <div>
                        <div>
                            <span className="comm-uNo">{reply.uNo}</span>
                        </div>
                        <div>
                            <span>{reply.repDate}</span>
                        </div>
                    </div>

                    <div>
                        {
                            /* 자신이 작성한 댓글인 경우에만 수정, 삭제 가능함 */
                            (localStorage.getItem("uNo") == reply.uNo) ?
                                <>
                                    <button onClick={updateToggle}>수정하기</button> &nbsp;
                                    <button onClick={deleteReply}>삭제하기</button>

                                </>
                                :
                                null
                        }
                    </div>
                </div>

                {
                    /* 댓글 수정하는 경우 */
                    show ?
                        <>
                            {/* 댓글 수정하는 하단 영역 : (댓글내용 + 댓글 내용 편집 창) */}
                            <div>
                                <textarea rows="5" value={comm} onClick={changeComm}></textarea>
                            </div>
                            <div>
                                <button onClick={updateReply}> 댓글 수정완료</button>
                            </div>
                        </>
                        :
                        <>
                            {/* 댓글 수정 안하는 하단 영역 : (댓글 내용) */}
                            <div>
                                <div className="col-10 comm">{comm}</div>
                            </div>
                        </>
                }

            </>
        );
    }


    // 삭제된 댓글의 경우
    else {
        return (
            <>
                <div>
                    <div>
                        <span className="del-span">⚠️ 작성자에 의해 삭제된 댓글입니다.</span>
                    </div>
                </div>
            </>
        );
    }

}

export default Reply;