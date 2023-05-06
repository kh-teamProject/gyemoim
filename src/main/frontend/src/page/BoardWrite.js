import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthProvider";
import {HttpHeadersContext} from "./HttpHeadersProvider";


const BoardWrite = () => {

    const {auth, setAuth} = useContext(AuthContext);
    const {headers, setHeaders} = useContext(HttpHeadersContext);

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }

    const changeContent = (event) => {
        setContent(event.target.value);
    }

    /* [POST /board] : 게시글 작성 */
    // localStorage 브라우저가 가지고 있는 임시 저장공간 localStorage 에 데이터를 저장할 수 있다.
    const createBoard = async () => {


        const req = {
            uNo: localStorage.getItem("uNo"),
            title: title,
            content: content
        }

        await axios.post("http://localhost:3000/board", req, {headers: headers})
            .then((resp) => {
                console.log("[BoardWrite.js] createBoard() success :D");
                console.log(resp.data);

                alert("새로운 게시글을 성공적으로 등록했습니다!");
                navigate(`/boardDetail/${resp.data.bid}`); // 새롭게 등록한 글 상세페이지로 이동
            })
            .catch((err) => {
                console.log("[BoardWrite.js] createBoard() error :<");
                console.log(err);
            });
    }

    /* 로그인 안되어 있으면 alert 창 띄어주면서 로그인 한 사용자만 게시글 작성할 수 있다고 알려줌
    useEffect(() => {
        if (!auth) {
            alert("로그인 한 사용자만 게시글을 작성할 수 있습니다.");
            navigate(-1);
        }
    }, []);
    */

    const styleTitle = {
        textAlign: "center",
        marginBottom: 1

    }

    const styleBoardTable = {
        textAlign: "center",
        justifyContent: "space-around"
    }
    /* 제목 작성자 공개설정 내용 첨부파일(선택된 파일 없음) 작성하기버튼 */
    return (
        <div>
            <div style={styleTitle}>
            <h1> 문의사항 </h1>
            <p>문의사항을 작성해주세요.</p>
            </div>
            <table style={styleBoardTable}>
                <tbody>
                <tr>
                    <th>제목</th>
                    <td>
                        <input type="text" className="form-control" value={title} onChange={changeTitle} size="50px"/>
                    </td>
                </tr>
                <tr>
                    <th>작성자</th>
                    <td>
                        <input type="text" className="form-control" value={localStorage.getItem("name")} size="50px"
                               readOnly/>
                    </td>
                </tr>
                <tr>
                    <th>공개설정</th>
                    <td className="checkBox">
                        <label><input type="radio" name="secret" value={false} checked required/>공개</label>
                        <label><input type="radio" name="secret" value={true} required/>비공개</label>
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <textarea type="text" className="form-control" value={content} onChange={changeContent}
                                  placeholder="내용을 입력하세요."></textarea>
                    </td>
                </tr>
                {/*
                <tr>
                    <th>첨부파일</th>
                    <td>
                        <input type="file" className="" name="UploadFile" value="" id="theFile">
                            <img id="ImgPreview" src="" className="preview"/>
                            <input type="button" id="removeImage" value="X" class="btn-rmv"/></input>
                    </td>
                </tr>
                */}
                </tbody>
            </table>

            <button className="btn btn-outline-secondary" onClick={createBoard}>작성하기</button>
        </div>


    );
}


export default BoardWrite;