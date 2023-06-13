import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import classes from "../css/board/Board.module.css";

const NoticeModify = () => {

    const [noticeModify, setNoticeModify] = useState({}); // BoardVO 수정 전 데이터 담는 변수
    const [attachments, setAttachments] = useState(null); // 수정 전 첨부파일
    const [updateAttachments, setUpdateAttachments] = useState(null); // 수정 후 첨부파일
    const [selectedFileName, setSelectedFileName] = useState(""); // 선택한 첨부파일 이름

    const {bid} = useParams();// 파라미터 가져오기
    const navigate = useNavigate();


    useEffect(() => {
        getNoticeModify();
    }, []);


    // 수정 전 기존 첨부파일 및 게시글 내용 가져오기
    const getNoticeModify = async () => {
        try {
            const response = await axios.get("/board/modify", {
                params: {
                    "bid": bid
                },
            });
            console.log("NoticeModify_getNoticeModify 수정 전 세부내용 가져오기 성공 :D");
            console.log("NoticeModify_가져온 데이터 : " + response.data);
            console.log("bid 가져와지니? " + bid);

            setNoticeModify(response.data);
            console.log("수정전 게시글 noticeModify: " + setNoticeModify(response.data));

            const attachmentResponse = await axios.get("/board/attachment", {
                params: {
                    bid: bid,
                },
            });
            setAttachments(attachmentResponse.data);
            console.log("수정전 첨부파일 attachments : " + setAttachments(attachmentResponse.data));

        } catch (error) {
            console.log("NoticeModify_getNoticeModify 왜 안되는거얏 :<");
            console.log("NoticeModify_axios 에러사항: " + error);
        }
    };


    // 게시글 수정된 데이터로 바꿔주는 함수
    const handleChange = (e) => {
        const {name, value} = e.target;// 변경된 요소의 'name' 과 'value' 속성을 추출함

        setNoticeModify((prevNoticeModify) => ({
            ...prevNoticeModify,
            [name]: value,
        }));
    };

    // 첨부 파일 선택(input type="file") 요소의 변경 이벤트에 대한 핸들러
    // 파일을 선택하면 이벤트가 발생하고 선택한 파일 객체를 추출하여
    // setSelectedFile 함수를 사용하여 상태를 업데이트 한다.
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setUpdateAttachments(selectedFile);

        if (selectedFile) {
            setSelectedFileName(selectedFile.name);
        } else {
            setSelectedFileName("");
        }
    };

    // 선택한 첨부 파일 삭제
    // 첨부파일 선택했다가 삭제버튼 눌러서 첨부파일 없애는 함수
    const handleDeleteFile = () => {
        setUpdateAttachments(null);
        setSelectedFileName("");
    };

    // 수정 취소 기능 (이전 글 세부사항 페이지로 이동함)
    const moveToNoticeDetail = (e) => {
        e.preventDefault();

        try {
            console.log("수정 취소하겠습니다!! ");
            alert("문의사항 게시글 수정 취소합니다.");
            navigate(-1);
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

        setNoticeModify(updateNotice);

        try {
            const formData = new FormData();
            formData.append("file", updateAttachments);
            formData.append("boardModifyDTO", JSON.stringify(updateNotice));

            console.log("업데이트 할 데이터 : " + updateNotice);

            const response = await axios.post("/board/modifyPost", updateNotice, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("NoticeModify_getNoticeModify 수정 하기 성공 :D");
            console.log("NoticeModify_가져온 데이터 : " + response.data);
            console.log("bid 가져와지니? " + bid);

            alert("글 수정하였습니다.");
            navigate('/board/notice');// 글 수정 완료 후 업데이트된 글 상세보기로 이동(이때 조회수가 또 올라감)

        } catch (error) {
            console.log("NoticeModify_getNoticeModify 수정 왜 안되는거얏 :<");
            console.log("업로드할 첨부파일 : " + setUpdateAttachments);
            console.log("글 작성자의 uNo 또는 uno: " + updateNotice.uno);
            console.log("글 작성자의 name: " + updateNotice.name);
            console.log("글 게시물 제목: " + updateNotice.title);
            console.log("글 게시물 내용: " + updateNotice.content);
            console.log("axios 에러사항: " + error);
        }

    }


    return (
        <>
            <section>
                <div>
                    <div>
                        <h1>공지사항</h1>
                        <p>글 수정 페이지</p>
                    </div>

                    <form encType="multipart/form-data" onSubmit={modifyUpdateNoticePost}>
                        {/*<div>
                            <input type="hidden" id="write-input-bid" name="bid" value={noticeModify.bid}/>
                            <input type="hidden" id="write-input-uno" name="uno" value={noticeModify.uno}/>
                        </div>*/}

                        <table className={`${classes['write-table']}`}>
                            <tbody className={`${classes['write-tbody']}`}>
                            <tr>
                                <th>
                                    제목
                                </th>
                                <td>
                                    <div className={`${classes['write_table_input_wrap']}`}>
                                        <input type="text" className={`${classes['w800']}`} id="write-input-title"
                                               name="title"
                                               value={noticeModify.title} onChange={handleChange}
                                               required/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    작성자
                                </th>
                                <td>
                                    <div className={`${classes['write_table_input_wrap']}`}>
                                        <input type="text" id="write-input-writer" name="name"
                                               value={noticeModify.name}
                                               onChange={handleChange}
                                               readOnly/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    내용
                                </th>
                                <td>
                                    <div className={`${classes['write_table_input_wrap']}`}>
                                        <textarea name="content" value={noticeModify.content} onChange={handleChange} required/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    첨부파일
                                </th>
                                <td>
                                    <div className={`${classes['write_table_input_wrap']}`}>
                                        <input id="showFileName" value={attachments} readOnly/>
                                        <label htmlFor="allFileName" className={`${classes['ps-label']}`} type="file">찾아보기</label>
                                        <label htmlFor="delFileName" className={`${classes['ps-label']}`} onClick={handleDeleteFile}>삭제</label>
                                        <input id="allFileName" className={`${classes['w400']}}`} name="allFileName" type="file" onChange={handleFileChange} style={{
                                                   display: "none"
                                               }}/>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className={`${classes['write-button-container']}`}>
                            <button className={`${classes['write-button']}`} type="submit">수정하기</button>
                            <button className={`${classes['write-button']}`} onClick={moveToNoticeDetail}>취소하기</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default NoticeModify;