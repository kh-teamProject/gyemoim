import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";


const NoticeDetail = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [views, setViews] = useState(0);
    const [writeDate, setWriteDate] = useState(writeDate);
    // useLocation() : useLocation 훅은 현재의 URL 을 대표하는 location 객체를 반환한다.
    // URL 이 바뀔 때마다 새로운 location 이 반환되는 useState 처럼 생각할 수 있다.

    const location = useLocation();
    const navigate = useNavigate();

    const bid = location.state.bid; // 상세보기하려는 게시글의 id값 즉, bid 값

    const handleDeleteBtnClick = async (e) => {
        e.preventDefault();

        if (window.confirm("게시글을 삭제하겠습니까?")) {
            const request_data = {bid: bid};
            let response = await axios({
                method: 'delete',
                url: '/board/delete',
                headers: {'Content-type': 'application/json'},
                data: JSON.stringify(request_data)
            });
            console.log('QuestionDetail/handleDeleteBtnClick/response: ', response);

            if (response.status === 204) {
                alert("게시글 삭제 완료!")
                navigate("board/list", {});
            }
            else {
                alert("게시글 삭제 실패 :<")
            }

        }
        else {
            return
        }
    };

    useEffect(() => {
        const getBoardDetail = async () => {
            let response = await axios.get(`/board/detail/${bid}`);
            console.log('QuestionDetail/response: ' , response);
            console.log('QuestionDetail/response.data: ' , response.data)
            console.log('QuestionDetail/response.data.data: ', response.data.data);
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
            setViews(response.data.data.views+1);
        }

        getBoardDetail();
    }, [])


    return (
        < >

        </>
    );
}


export default NoticeDetail;