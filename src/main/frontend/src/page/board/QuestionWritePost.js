import React, {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import classes from "../css/board/Board.module.css";
import {useNavigate} from "react-router-dom";

const QuestionWritePost = () => {

  const navigate = useNavigate();

    // 로그인 토큰에서 이름 name, 회원번호 uno 가져오기
    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const writer = token.name;
    const uno = token.uNo;

    const [questionFormData, setQuestionFormData] = useState({
        uno: uno,
        name: writer, // 글 작성자 이름
        bType: "1:1 문의사항", // 게시글 타입
        title: "", // 게시글 제목
        content: "", // 게시글 내용
        secret: "P", // 글 여부 (공개/비공개)
    });

    const [file, setFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;// 변경된 요소의 'name' 과 'value' 속성을 추출함

        setQuestionFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // 글 공개 설정 변경하는 함수
    // 공개 선택시 secret == 'P',
    // 비공개 선택 시 secret === 'S' 로 변경하기
    const handleRadioChange = (e) => {
        const {name, value} = e.target;
        setQuestionFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

    };

    // 첨부 파일 선택(input type="file") 요소의 변경 이벤트에 대한 핸들러
    // 파일을 선택하면 이벤트가 발생하고 선택한 파일 객체를 추출하여
    // setSelectedFile 함수를 사용하여 상태를 업데이트 한다.
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            setSelectedFileName(selectedFile.name);
        } else {
            setSelectedFileName("");
        }
    };
    
    // 선택한 첨부 파일 삭제
    // 첨부파일 선택했다가 삭제버튼 눌러서 첨부파일 없애는 함수
    const handleDeleteFile = () => {
        setFile(null);
        setSelectedFileName("");
    };

    const moveToQuestionList = () => {
        window.location.href = '/board/question';
    };


    const handleQuestionSubmit = async (e) => {
        e.preventDefault();// 리로드 방지

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("boardWriteDTO", JSON.stringify(questionFormData));

            const response = await axios.post("/board/writePost", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log("QuestionWritePost_handleSubmit 성공 :D");
            console.log("업로드할 첨부파일 : " + file);
            console.log("글 작성 : " + questionFormData);
          navigate('/board/question')
            // window.location.href = '/board/question';

        } catch (error) {
            console.log("QuestionWritePost_handleSubmit axios 실패 :<");
            console.log("업로드할 첨부파일 : " + file);
            console.log("글 작성자의 uNo 또는 uno: " + questionFormData.uno);
            console.log("글 작성자의 name: " + questionFormData.name);
            console.log("글 게시물 종류: " + questionFormData.bType);
            console.log("글 게시물 제목: " + questionFormData.title);
            console.log("글 게시물 내용: " + questionFormData.content);
            console.log("글 게시물 공개여부: " + questionFormData.secret);
            console.log("QuestionWritePost_handleSubmit axios 에러: " + error)

        }

    }

    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <div className="title text-center mb-3">
                                <h1>1:1 문의사항 글쓰기</h1>
                                <p>반갑습니다 고객님, 문의사항을 적어주세요.</p>
                            </div>


                            <form encType="multipart/form-data" onSubmit={handleQuestionSubmit} id="writeConn">
                                <table className={`${classes['write-table']}`}>
                                    <tbody className={`${classes['write-tbody']}`}>
                                    <tr>
                                        <th>
                                            회원번호
                                        </th>
                                        <td>
                                            <div className={`${classes['write_table_input_wrap']}`}>
                                                <input type="number" id="uno" name="uno" value={questionFormData.uno}
                                                       onChange={handleChange} readOnly/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            제목
                                            <span>*</span>
                                        </th>
                                        <td>
                                            <div className={`${classes['write_table_input_wrap']}`}>
                                                <input type="text" className={`${classes['w800']}`} id="write-input-title" name="title"
                                                       value={questionFormData.title}
                                                       placeholder="제목을 입력해주세요.(255자 이내)" onChange={handleChange} required/>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            작성자
                                        </th>
                                        <td>
                                            <div className={`${classes['write_table_input_wrap']}`}>
                                                <input type="text" id="write-input-writer" name="name" value={questionFormData.name}
                                                       onChange={handleChange} required/>
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
                                                       className="radio" checked={questionFormData.secret === 'P'}
                                                       onChange={handleRadioChange} required/>
                                                <label htmlFor="write-cs-open">공개</label>
                                            </div>
                                            <div className={`${classes['write_table_input_wrap']}`}>
                                                <input type="radio" name="secret" id="write-cs-close" value="S"
                                                       className="radio" checked={questionFormData.secret === 'S'}
                                                       onChange={handleRadioChange}/>
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
                                                <textarea name="content" className={`${classes['ps-text-area']}`} placeholder="내용을 입력해주세요.(2000자 이내)" value={questionFormData.content}
                                                          onChange={handleChange} required/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            첨부파일
                                        </th>
                                        <td>
                                            <div className={`${classes['write_table_input_wrap']}`}>
                                                <input id="showFileName" value={selectedFileName} readOnly />
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
                                    <button className={`${classes['write-button']}`} type="submit">작성하기</button>
                                    <button className={`${classes['write-button']}`} onClick={moveToQuestionList}>돌아가기</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default QuestionWritePost;
