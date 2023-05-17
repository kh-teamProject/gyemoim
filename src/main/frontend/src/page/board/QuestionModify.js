/*
import {useContext, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";


const BoardUpdate = () => {

    const {headers, setHeaders} = useContext(HttpHeadersContext);
    const {auth, setAuth} = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation();
    const {board} = location.state;

    const [title, setTitle] = useState(board.title);
    const [content, setContent] = useState(board.content);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }

    const changeContent = (event) => {
        setContent(event.target.value);
    }


    const updateBoard = async () => {

        const req = {
            uNo: auth,
            title: title,
            content: content
        }

        await axios.patch(`http://localhost:3000/board/${board.bid}`, req, {headers: headers})
            .then((resp) => {
                console.log("[NoticeModify.js] updateBoard() success :D");
                console.log(resp.data);

                if(resp.data.updatedRecordCount == 1) {
                    alert("게시글을 성공적으로 수정했습니다 :D");
                    navigate(`/boardDetail/${board.bid}`); // 글 상세로 이동
                }

            })
            .catch((err) => {
               console.log("[NoticeModify.js] updateBoard() error :<");
               console.log(err);
            });
    }


    return (
      <div>
          <table>
              <tbody>
              <tr>
                  <th>작성자</th>
                  <td>
                      <input type="text" value={board.uNo} readOnly />
                  </td>
              </tr>

              <tr>
                  <th>제목</th>
                  <td>
                      <input type="text" value={title} onChange={changeTitle} />
                  </td>
              </tr>

              <tr>
                  <th>내용</th>
                  <td>
                      <textarea value={content} onChange={changeContent} rows="15" ></textarea>
                  </td>
              </tr>
              </tbody>
          </table>

          <div>
              <button onClick={updateBoard}>수정하기</button>
          </div>
      </div>
    );


}


export default BoardUpdate;*/

const QuestionModify = () => {


    return (
        <>

        </>
    );
}

export default QuestionModify;