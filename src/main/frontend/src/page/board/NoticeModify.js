import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const NoticeModify = () => {

    const [noticeModify, setNoticeModify] = useState([]); // BoardVO 받아올 변수
    const {bid} = useParams();// 파라미터 가져오기
    const navigate = useNavigate();


    useEffect(() => {
        getNoticeModify();
    }, []);


    // 수정 전 기존 게시글 내용들 가져오기
    const getNoticeModify = async () => {

        /*try {
            const response = await axios.get(`/board/notice/modify/${bid}`);
            setBoardModify(response.data);
            console.log("NoticeModify_getNoticeModify 게시글 가져오기 성공! " + response);
        } catch (error) {
            console.log("NoticeModify_getNoticeModify 게시글 가져오기 실패" + error.message);
        }*/


        await axios.get("/board/notice/modify", {params: {bid: bid}})
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


    // 글 공개 설정 변경하는 함수
    // 공개 선택시 secret == 'P',
    // 비공개 선택 시 secret === 'S' 로 변경하기
    const handleRadioChange = (e) => {
        const {name, value} = e.target;
        setNoticeModify((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

    };



    // 수정 취소 기능 (이전 글 세부사항 페이지로 이동함)
    const moveToNoticeDetail = (e) => {
        e.preventDefault();

        navigate(`/board/notice/detail/${bid}`);

    }


// 수정하기 버튼 누르면 글 수정했습니다 alert 띄워주고 글 detail 페이지로 이동
    const modifyPost = async (e) => {
        e.preventDefault();

        alert("글 수정하였습니다.");


        await axios.post("/board/notice/modifyPost", noticeModify)
            .then((response) => {
                console.log("NoticeModify_getNoticeModify 수정 하기 성공 :D");
                console.log("NoticeModify_가져온 데이터 : " + response.data);
                console.log("bid 가져와지니? " + bid);

                window.location.href = `/board/notice/detail/${bid}`; // 글 수정 완료 후 글 상세보기로 이동
            })
            .catch((error) => {
                console.log("NoticeModify_getNoticeModify 왜 안되는거얏 :<");
                console.log("NoticeModify_axios 에러사항: " + error);
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
                                <p>공지사항 세부내용</p>
                            </div>

                            <form onSubmit={modifyPost} id="noticeModifyPost">

                                <input type="hidden" id="write-input-bid" name="bid" value={noticeModify.bid}/>
                                <input type="hidden" id="write-input-uno" name="uno" value={noticeModify.uno}/>

                                <div>
                                    <label htmlFor="write-input-title">제목</label>
                                    <input type="text" id="write-input-title" name="title" value={noticeModify.title}
                                           required/>
                                </div>
                                <div>
                                    <label htmlFor="write-input-writer">작성자</label>
                                    <input type="text" id="write-input-writer" name="name" value={noticeModify.name}
                                           readOnly/>
                                </div>

                                <div>
                                    <label htmlFor="write-input-writer">공개설정</label>
                                    <div>
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs-open" value="P"
                                                   className="radio" checked={noticeModify.secret === 'P'}
                                                   onChange={handleRadioChange} required/>
                                            <label htmlFor="write-cs-open">공개</label>
                                        </div>
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs-close" value="S"
                                                   className="radio" checked={noticeModify.secret === 'S'}
                                                   onChange={handleRadioChange}/>
                                            <label htmlFor="write-cs-close">비공개</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <textarea name="content" value={noticeModify.content}
                                              required></textarea>
                                </div>

                                <div>
                                    <button type="submit">수정하기</button>
                                    <button onChange={moveToNoticeDetail}>취소하기</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NoticeModify;