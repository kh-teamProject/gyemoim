import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const NoticeModify = () => {

    const [noticeModify, setNoticeModify] = useState([]); // BoardVO 수정 전 데이터 담는 변수
    const [updateNotice, setUpdateNotice] = useState([]); // 수정 후 데이터 담는 변수

    const {bid} = useParams();// 파라미터 가져오기
    const navigate = useNavigate();


    useEffect(() => {
        getNoticeModify();
    }, []);


    // 수정 전 기존 게시글 내용들 가져오기
    const getNoticeModify = async () => {

        await axios.get("/board/modify/", {params: {bid: bid}})
            .then((response) => {
                console.log("NoticeModify_getNoticeModify 수정 전 세부내용 가져오기 성공 :D");
                console.log("NoticeModify_가져온 데이터 : " + response.data);
                console.log("bid 가져와지니? " + bid);

                setNoticeModify(response.data);
            })
            .catch((error) => {
                console.log("NoticeModify_getNoticeModify 왜 안되는거얏 :<");
                console.log("NoticeModify_axios 에러사항: " + error);
            })
    };



    // 게시글 수정된 데이터로 바꿔주는 함수
    const handleChange = (e) => {
        const {name, value} = e.target;// 변경된 요소의 'name' 과 'value' 속성을 추출함

        setNoticeModify((prevNoticeModify) => ({
            ...prevNoticeModify,
            [name]: value,
        }));
    };


    // 수정 취소 기능 (이전 글 세부사항 페이지로 이동함)
    const moveToNoticeDetail = (e) => {
        e.preventDefault();

        try {
            console.log("수정 취소하겠습니다!! ");
            navigate(`/board/notice/detail/${bid}`);
        } catch (error) {
            console.log("수정 취소 불가합니다 에러발생 :<");
            console.log(error);
        }

    }


    // 수정 업데이트 하기
    // 수정하기 버튼 누르면 글 수정했습니다 alert 띄워주고 글 detail 페이지로 이동
    const modifyUpdateNoticePost = async (e) => {
        e.preventDefault();

        console.log("글 수정 업데이트 가보자구~");

        // 수정한 데이터 보내기 위해서 updateNotice 변수에 담기
        const updateNotice = {
            bid: noticeModify.bid,
            uno: noticeModify.uno,
            name: noticeModify.name,
            title: noticeModify.title,
            content: noticeModify.content,
            writeDate: noticeModify.writeDate,
            secret: noticeModify.secret,
        };

        console.log("업데이트 할 데이터 : " + updateNotice);

        await axios.post("/board/modifyPost", updateNotice, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("NoticeModify_getNoticeModify 수정 하기 성공 :D");
                console.log("NoticeModify_가져온 데이터 : " + response.data);
                console.log("bid 가져와지니? " + bid);

                alert("글 수정하였습니다.");
                navigate(`/board/notice/detail/${bid}`);// 글 수정 완료 후 업데이트된 글 상세보기로 이동
            })
            .catch((error) => {
                console.log("NoticeModify_getNoticeModify 수정 왜 안되는거얏 :<");
                console.log("axios 에러사항: " + error);
            });

    }


    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <div className="title">
                                <h1>공지사항</h1>
                                <p>글 수정 페이지</p>
                            </div>

                            <div>
                                <form onSubmit={modifyUpdateNoticePost}>
                                    <div>

                                        <input type="hidden" id="write-input-bid" name="bid" value={noticeModify.bid}/>
                                        <input type="hidden" id="write-input-uno" name="uno" value={noticeModify.uno}/>

                                        <div>
                                            <label htmlFor="write-input-title">제목</label>
                                            <input type="text" id="write-input-title" name="title"
                                                   value={noticeModify.title === undefined ? () => {
                                                       alert("제목을 입력하세요.");
                                                   } : noticeModify.title} onChange={handleChange}
                                                   required/>
                                        </div>
                                        <div>
                                            <label htmlFor="write-input-writer">작성자</label>
                                            <input type="text" id="write-input-writer" name="name"
                                                   value={noticeModify.name}
                                                   onChange={handleChange}
                                                   readOnly/>
                                        </div>

                                        <div>
                                            <label htmlFor="write-input-writer">공개설정</label>
                                            <div>
                                                <div className="secret-detail">
                                                    <input type="radio" name="secret" id="write-cs-open" value="P"
                                                           className="radio" checked={noticeModify.secret === 'P'}
                                                           onChange={handleChange} required/>
                                                    <label htmlFor="write-cs-open">공개</label>
                                                </div>
                                                <div className="secret-detail">
                                                    <input type="radio" name="secret" id="write-cs-close" value="S"
                                                           className="radio" checked={noticeModify.secret === 'S'}
                                                           onChange={handleChange}/>
                                                    <label htmlFor="write-cs-close">비공개</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                    <textarea name="content" value={noticeModify.content} onChange={handleChange}
                                              required></textarea>
                                        </div>

                                        <div>
                                            <button type="submit">수정하기</button>
                                        </div>

                                    </div>
                                </form>
                                <div>
                                    <button onClick={moveToNoticeDetail}>취소하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NoticeModify;