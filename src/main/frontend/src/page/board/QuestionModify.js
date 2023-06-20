import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import classes from "../css/board/Board.module.css";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const QuestionModify = () => {
    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = parseInt(token.uNo);
    // BoardVO 수정 전 데이터 담는 변수
    const [questionModify, setQuestionModify] = useState([]);
    // 파라미터 가져오기
    const {bid} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getQuestionModify();
    }, []);


    // 수정 전 기존 문의사항 내용들 가져오기
    const getQuestionModify = async () => {
        await axios.get("/board/modify", {params: {bid: bid}})
            .then((response) => {
                setQuestionModify(response.data);
            })
            .catch((error) => {
                console.log("QuestionModify_getQuestionModify_axios_errorMessage : " + error.message);
            })
    };

    // 게시글 수정된 데이터로 바꿔주는 함수
    const handleChange = (e) => {
        const {name, value} = e.target;// 변경된 요소의 'name' 과 'value' 속성을 추출함
        setQuestionModify((prevQuestionModify) => ({
            ...prevQuestionModify,
            [name]: value,
        }));
    };


    // 수정 취소 기능 (이전 글 세부사항 페이지로 이동함)
    const moveToQuestionDetail = (e) => {
        e.preventDefault();

        try {
            alert("문의사항 게시글 수정 취소합니다.");
            navigate(-1);
        } catch (error) {
            console.log("QuestionModify_moveToQuestionDetail_axios_errorMessage : " + error.message);
        }
    };


    // 수정 업데이트 하기
    // 수정하기 버튼 누르면 글 수정했습니다 alert 띄워주고 글 detail 페이지로 이동
    const modifyUpdateQuestionPost = async (e) => {
        e.preventDefault();

        // 수정한 데이터 보내기 위해서 boardModifyDTO 변수에 담기
        const boardModifyDTO = {
            bid: questionModify.bid,
            uno: uNo,
            name: questionModify.name,
            title: questionModify.title,
            content: questionModify.content,
            writeDate: questionModify.writeDate,
            secret: questionModify.secret,
        };

        await axios.post("/board/modifyPost", boardModifyDTO)
            .then((response) => {
              alert("글 수정하였습니다.");
                navigate(`/board/question/detail/${bid}`);// 문의사항 수정 완료 후 글 상세보기로 이동
            })
            .catch((error) => {
                console.log("QuestionModify_getQuestionModify_axios_errorMessage : " + error.message);
            });
    };

    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <div className="title">
                                <h1>문의사항</h1>
                                <p>문의사항 수정 페이지</p>
                            </div>

                            <div>

                                <form onSubmit={modifyUpdateQuestionPost}>
                                    <table className={`${classes['write-table']}`}>
                                        <tbody className={`${classes['write-tbody']}`}>
                                        <tr>
                                            <th>
                                                제목
                                            </th>
                                            <td>
                                                <div className={`${classes['write_table_input_wrap']}`}>
                                                    <input type="text" className={`${classes['w800']}`}
                                                           id="write-input-title" name="title"
                                                           value={questionModify.title === undefined ? () => {
                                                               alert("제목을 입력하세요.");
                                                           } : questionModify.title} onChange={handleChange}
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
                                                           value={questionModify.name}
                                                           onChange={handleChange}
                                                           readOnly/>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                공개설정
                                            </th>
                                            <td className={`${classes['secret-type']}`}>
                                                <div className={`${classes['write_table_input_wrap']}`}>
                                                    <input type="radio" name="secret" id="write-cs-open" value="P"
                                                           className="radio" checked={questionModify.secret === 'P'}
                                                           onChange={handleChange} required/>
                                                    <label htmlFor="write-cs-open">공개</label>
                                                </div>
                                                <div className={`${classes['write_table_input_wrap']}`}>
                                                    <input type="radio" name="secret" id="write-cs-close" value="S"
                                                           className="radio" checked={questionModify.secret === 'S'}
                                                           onChange={handleChange}/>
                                                    <label htmlFor="write-cs-close">비공개</label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                내용
                                            </th>
                                            <td>
                                                <div className={`${classes['write_table_input_wrap']}`}>
                                                    <textarea name="content" className={`${classes['ps-text-area']}`}
                                                              value={questionModify.content} onChange={handleChange}
                                                              required></textarea>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className={`${classes['write-button-container']}`}>
                                        <button className={`${classes['write-button']}`} type="submit">수정하기</button>
                                        <button className={`${classes['write-button']}`}
                                                onClick={moveToQuestionDetail}>취소하기
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default QuestionModify;