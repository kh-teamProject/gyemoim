/*
import {useState, useEffect} from "react";
import axios from "axios";
import Pagination from "react-js-pagination";

import Reply from "./Reply";*/
/*
const ReplyList = (props) => {

    const bid = props.bid; // rno 인지 bid 인지,,,

    // Paging
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    const [replyList, setReplyList] = useState([]);

    const changePage = (page) => {
        setPage(page);
        setReplyList(page);
    }


    const getReplyList = async (page) => {
        await axios.get(`http://localhost:3000/reply`, {params: {"boardBid": bid, "page": page }})
            .then((resp) => {
                console.log("[BoardReply.js] getReplyList() success :D");
                console.log(resp.data);

                setReplyList(resp.data.replyList);
                setTotalCnt(resp.data.pageCnt);
            }).catch((err) => {
                console.log("BoardReply.js] getReplyList() error :<");
                console.log(err);
            });
    }

    useEffect(() => {
        getReplyList(1);
    }, []);


    return (
        <>

            <div>
                <h5> 댓글 목록 </h5>
            </div>

            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={changePage} />
            {
                replyList.map(function (reply, idx) {
                    return (
                        <div key={idx}>
                            <Reply obj={reply} key={idx} />
                        </div>
                    );
                })
            }

        </>

    );

}

export default ReplyList;*/
