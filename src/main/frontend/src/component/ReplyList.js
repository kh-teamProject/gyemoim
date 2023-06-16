import {useEffect, useState} from "react";
import axios from "axios";
import Reply from "./Reply";
import className from "../page/css/board/Reply.module.css";
import replyListImg from "./images/reply-list-clip.png";

const ReplyList = (props) => {

    const bid = props.bid;

    // 댓글 리스트 담는 변수
    const [replyList, setReplyList] = useState([]);


    const getReplyList = async () => {
        await axios.get("/reply/list", {params: {bid: bid}})
            .then((response) => {
                console.log("댓글 리스트 가져오기 성공 :D");
                console.log(response.data);

                setReplyList(response.data);

            }).catch((error) => {
                console.log("댓글 리스트 가져오기 실패 :<");
                console.log(error);
            });
    }


    useEffect(() => {
        getReplyList();
    }, []);


    return (
        <>
            <div className={`${className['reply-list']}`}>
                <img src={replyListImg} className={`${className['reply-list-img']}`}/><h5>댓글 목록</h5>
            </div>

            {
                replyList.map((reply, idx) => {
                    return (
                        <div className="my-5" key={idx}>
                            <Reply obj={reply} key={idx}/>
                        </div>
                    );
                })
            }
        </>
    )

}


export default ReplyList;