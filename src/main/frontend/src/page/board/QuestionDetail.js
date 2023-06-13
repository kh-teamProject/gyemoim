import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import ReplyWrite from "../../component/ReplyWrite";
import ReplyList from "../../component/ReplyList";

const QuestionDetail = () => {

    const [questionDetail, setQuestionDetail] = useState({});
    const [attachments, setAttachments] = useState([]);

    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;
    const name = token.name;

    // 파라미터 가져오기
    const {bid} = useParams();
    const navigate = useNavigate();

    const getQuestionDetail = async () => {
        try {
            const response = await axios.get("/board/read", {
                params: {
                    "bid": bid,
                },
            });
            console.log("QuestionDetail_문의사항 게시글 세부내용 가져오기 성공 :D");
            console.log("QuestionDetail_가져온 데이터: " + response.data);
            console.log("가져온 bid: " + bid);

            setQuestionDetail(response.data);

            const attachmentResponse = await axios.get("/board/attachment", {
                params: {
                    bid: bid,
                },
            });
            setAttachments(attachmentResponse.data);
        } catch (error) {
            console.log("QuestionDetail_문의사항 게시글 세부내용 못가져옴 :<");
            console.log("QuestionDetail_axios 에러발생: " + error);

        }
    };


    // 1:1 문의사항 목록으로 이동하는 함수
    const moveToQuestionList = (e) => {
        window.location.href = "/board/question";
    }

    // 글 수정 페이지로 이동하는 함수
    const moveToQuestionModify = async () => {
        await axios.get("/board/modify", {params: {bid: bid}})
            .then((response) => {
                console.log("QuestionDetail.moveToQuestionModify 문의사항 수정 페이지로 이동 :D");
            })
            .catch((error) => {
                console.log("QuestionDetail.moveToQuestionModify 문의사항 수정 페이지 이동 안됨 :<");
                console.log("문의사항 에러: " + error);

            })
        window.location.href = `/board/question/modify/${bid}`;
    };


    // 글 삭제하는 함수
    const moveToQuestionDelete = async () => {

        const deleteDTO = {
            bid: questionDetail.bid,
            uno: questionDetail.uno,
        };

        await axios.delete('/board/delete', {data: deleteDTO})
            .then((response) => {
                console.log("moveToQuestionDelete 문의사항 삭제 성공 >< ");
                console.log(response.data);

                alert("글 삭제되었습니다.");
                navigate("/board/question");
            }).catch((error) => {
                console.log("moveToQuestionDelete 문의사항 글 삭제 실패 :<");
                console.log("에러 메시지: " + error);
            });
    };

    // 이미지 파일인지 확인하는 함수
    const isImageFile = (fileName) => {
        const imageExtension = ["jpg", "jpeg", "png", "gif"]; // 이미지 확장자 목록

        const extension = fileName.split(".").pop().toLowerCase();
        return imageExtension.includes(extension);
    };

    // 첨부파일 다운로드 함수
    const downloadAttachment = (attachedID) => {
        axios({
            url: `/attachments/download/${attachedID}`,
            method: 'GET',
            responseType: "blob",
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute("download", response.headers.filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log("첨부파일 다운로드 에러: ", error);
            });
    };

    useEffect(() => {
        getQuestionDetail();
    }, []);


    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <div className="title">
                                <h1>1:1 문의사항</h1>
                                <p>문의사항 세부내용</p>
                            </div>
                            <div>

                                {/* 수정,삭제,목록보기 버튼 */}
                                <div>
                                    <button className="btn btn-primary btn-lg px-4 me-sm-3"
                                            onClick={moveToQuestionList}>목록보기
                                    </button>
                                    <button className="btn btn-primary btn-lg px-4 me-sm-3"
                                            onClick={moveToQuestionModify}>수정하기
                                    </button>
                                    <button className="btn btn-primary btn-lg px-4 me-sm-3"
                                            onClick={moveToQuestionDelete}>삭제하기
                                    </button>
                                </div>

                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="read-detail">
                                            <div className="col-3"><b>작성자: </b>{questionDetail.name}</div>
                                            <div className="col-3"><b>제목: </b>{questionDetail.title}</div>
                                            <div className="col-3"><b>작성일자: </b>{questionDetail.writeDate}</div>
                                            <div className="col-3"><b>조회수: </b>{questionDetail.views}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="col-3"><b>내용: </b>{questionDetail.content}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-start AttachedFile">
                                            <b>첨부파일 : </b>
                                            {attachments.length > 0 ? (
                                                attachments.map((attachment) => (
                                                    <div key={attachment.id}>
                                                        {isImageFile(attachment.fileName) ? (
                                                            <img
                                                                src={`/attachments/download/${attachment.id}`}
                                                                alt={attachment.fileName}
                                                                width="200"
                                                                height="200"
                                                            />
                                                        ) : (
                                                            <button onClick={() => downloadAttachment(attachment.id)}>
                                                                {attachment.fileName}
                                                            </button>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div>첨부파일이 없습니다.</div>
                                            )}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>


                                {/* 댓글 작성 컴포넌트 */}
                                {
                                    (uNo != null) ? // 로그인한 사용자만 댓글 작성 가능
                                        <ReplyWrite bid={bid}/>
                                        :
                                        null
                                }

                                {/* 댓글 리스트 컴포넌트 */}
                                <ReplyList bid={bid}/>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default QuestionDetail;