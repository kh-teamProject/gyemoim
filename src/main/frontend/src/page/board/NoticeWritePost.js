import React, {useState} from "react";
import axios from "axios";
import classes from "../css/board/Board.module.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const NoticeWritePost = () => {
    const token = jwtDecode(Cookies.get("Set-Cookie"));
    const writer = token.userRole[0];
    const uno = token.uNo;
    const navigate = useNavigate();

    const [noticeFormData, setNoticeFormData] = useState({
        uno: uno,
        name: writer,
        btype: "공지사항",
        title: "",
        content: "",
        secret: "P",
    });

    /* 첨부파일 관련 변수 */
    // 1) 첨부파일 업로드 담을 파일 변수
    const [file, setFile] = useState(null);
    // 2) 업로드 하려고 선택한 첨부파일 이름 변수
    const [selectedFileName, setSelectedFileName] = useState("");
    // 3) 첨부파일 미리보기
    const [imgBase64, setImgBase64] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;// 변경된 요소의 'name' 과 'value' 속성을 추출함
        setNoticeFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // 첨부 파일 선택(input type="file") 요소의 변경 이벤트에 대한 핸들러
    const handleChangeFile = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setSelectedFileName(selectedFile.name);
        setImgBase64([]);

        // 업로드 할 선택된 파일이 있는 경우
        if (selectedFile) {
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                const base64 = reader.result;
                if (base64) {
                    let base64Sub = base64.toString();
                    setImgBase64([base64Sub]);
                }
            };
        }
    };

    // 첨부파일 삭제
    const handleDeleteFile = () => {
        setFile(null);
        setSelectedFileName("");
        setImgBase64([]);
    };

    // 공지사항 목록 페이지로 이동
    const moveToNoticeList = () => {
        navigate("/board/notice");
    };

    const handleNoticeSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("boardWriteDTO", JSON.stringify(noticeFormData));

            const response = await axios.post("/board/writePost", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/board/notice");
        } catch (error) {
            console.log("NoticeWritePost_handleSubmit_axios_errorMessage : " + error.message);
        }
    };

    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <div>
                                <h2>공지사항 글쓰기</h2>
                                <p>반갑습니다 운영자님, 공지사항을 적어주세요</p>
                            </div>

                            <form
                                encType="multipart/form-data"
                                onSubmit={handleNoticeSubmit}
                                id="writeConn"
                            >
                                <table className={`${classes["write-table"]}`}>
                                    <tbody className={`${classes["write-tbody"]}`}>
                                    <tr>
                                        <th>회원번호</th>
                                        <td>
                                            <div className={`${classes["write_table_input_wrap"]}`}>
                                                <input
                                                    type="number"
                                                    id="uno"
                                                    name="uno"
                                                    value={noticeFormData.uno}
                                                    onChange={handleChange}
                                                    readOnly
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            제목<span>*</span>
                                        </th>
                                        <td>
                                            <div className={`${classes["write_table_input_wrap"]}`}>
                                                <input
                                                    type="text"
                                                    className={`${classes["w800"]}`}
                                                    id="write-input-title"
                                                    name="title"
                                                    value={noticeFormData.title}
                                                    placeholder="제목을 입력해주세요.(255자 이내)"
                                                    onChange={handleChange}
                                                    required/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>작성자</th>
                                        <td>
                                            <div className={`${classes["write_table_input_wrap"]}`}>
                                                <input
                                                    type="text"
                                                    id="write-input-writer"
                                                    name="name"
                                                    value={noticeFormData.name}
                                                    onChange={handleChange}
                                                    required/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>내용</th>
                                        <td>
                                            <div className={`${classes["write_table_input_wrap"]}`}>
                          <textarea
                              name="content"
                              className={`${classes["ps-text-area"]}`}
                              placeholder="내용을 입력해주세요.(2000자 이내)"
                              value={noticeFormData.content}
                              onChange={handleChange}
                              required/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>첨부파일</th>
                                        <td>
                                            <div className={`${classes["write_table_input_wrap"]}`}>
                                                <input
                                                    id="showFileName"
                                                    value={selectedFileName}
                                                    readOnly/>
                                                <label
                                                    htmlFor="allFileName"
                                                    className={`${classes["ps-label"]}`}
                                                    type="file">
                                                    찾아보기
                                                </label>
                                                <label
                                                    htmlFor="delFileName"
                                                    className={`${classes["ps-label"]}`}
                                                    onClick={handleDeleteFile}>
                                                    삭제
                                                </label>
                                                <input
                                                    id="allFileName"
                                                    className={`${classes["w400"]}}`}
                                                    name="allFileName"
                                                    type="file"
                                                    onChange={handleChangeFile}
                                                    style={{
                                                        display: "none",
                                                    }}
                                                    accept=""
                                                />
                                                <div className="image-preview">
                                                    {imgBase64.map((base64, index) => (
                                                        <img
                                                            key={index}
                                                            src={base64}
                                                            alt="Preview"
                                                            style={{width: "100px", height: "100px"}}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className={`${classes["write-button-container"]}`}>
                                    <button className={`${classes["write-button"]}`} type="submit">
                                        작성하기
                                    </button>
                                    <button
                                        className={`${classes["write-button"]}`}
                                        onClick={moveToNoticeList}>
                                        돌아가기
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NoticeWritePost;
