import React, {useState} from "react";
import axios from "axios";
import classes from "../css/board/Board.module.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const NoticeWritePost = () => {
    const token = jwtDecode(Cookies.get("Set-Cookie"));
    const writer = token.userRole[0];
    const uno = token.uNo;

    const [noticeFormData, setNoticeFormData] = useState({
        uno: uno,
        name: writer,
        type: "공지사항",
        title: "",
        content: "",
        secret: "P",
    });

    const [file, setFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");//첨부파일 이름
    const [imgBase64, setImgBase64] = useState([]);// 첨부파일 미리보기

    const handleChange = (e) => {
        const {name, value} = e.target;

        setNoticeFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleChangeFile = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setSelectedFileName(selectedFile.name);
        setImgBase64([]);

        if (selectedFile) {
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                const base64 = reader.result;
                console.log(base64);
                if (base64) {
                    let base64Sub = base64.toString();
                    setImgBase64([base64Sub]);
                }
            };
        }
    };

    const handleDeleteFile = () => {
        setFile(null);
        setSelectedFileName("");
        setImgBase64([]);
    };

    const moveToNoticeList = () => {
        window.location.href = "/board/notice";
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

            console.log("NoticeWritePost_handleSubmit 성공 :D");
            console.log("공지사항 : " + noticeFormData);
            window.location.href = "/board/notice";
        } catch (error) {
            console.log("NoticeWritePost_handleSubmit axios 실패 :<");
            console.log("글 작성자의 uNo 또는 uno: " + noticeFormData);
            console.log("NoticeWritePost_handleSubmit axios 에러: " + error);
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
