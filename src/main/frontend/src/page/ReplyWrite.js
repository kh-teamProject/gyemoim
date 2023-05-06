import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {HttpHeadersContext} from "./HttpHeadersProvider";

const ReplyWrite = (props) => {

    const {headers, setHeaders} = useContext(HttpHeadersContext);

    const uNo = localStorage.getItem("uNo");
    const bid = props.bid;

    const navigate = useNavigate();

    const [comm, setComm] = useState("");

    const changeComm = (event) => {
        setComm(event.target.value);
    }

    const createReply = async () => {

        const req = {
            uNo: uNo,
            comm: comm,
            bid: bid
        }

        await axios.post(`http://localhost:3000/reply`, req, {params: {"bid": bid}, headers: headers})
            .then((resp) => {
                console.log("[ReplyWrite.js] createReply() success :D");
                console.log(resp.data);

                if(resp.data.bid != null) {
                    alert("댓글을 성공적으로 등록했습니다 :D");
                    navigate(0);
                }

            }).catch((err) => {
               console.log("[ReplyWrite.js] createReply() error :<");
               console.log(err);

            });
    }

    return (
        <>
            {/* 상단 영역 (프로필 이미지, 댓글 작성자) */}
            <div>
                <div>
                    <img src="/images/profile-placeholder.png" alt="프로필 이미지" className="profile-img" />
                </div>

                <div>
                    <span className="reply-uNo" >{uNo}</span>
                </div>

                <div>
                    <button onClick={createReply}> 댓글 추가</button>
                </div>
            </div>

            {/* 하단 영역 (댓글 내용) */}
            <div>
                <textarea rows="5" value={comm} onChange={changeComm}></textarea>
            </div><br/><br/>
        </>
    );


}

export default ReplyWrite;