import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthProvider";
import {HttpHeadersContext} from "./HttpHeadersProvider";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";


const BoardAnswer = () => {

    const {auth, setAuth} = useContext(AuthContext);
    const {headers, setHeaders} = useContext(HttpHeadersContext);

    const navigate = useNavigate();

    const { parentBid } = useParams(); // 부모 글 번호

    const location = useLocation();
    const {parentBoard} = location.state;

    const [title, setTitle] = useState("");
    const [comm, setComm] = useState("");

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }

    const changeComm = (event) => {
        setComm(event.target.value);
    }


    const createBoardAnswer = async () => {

        const req = {
            uNo: localStorage.getItem("uNo"),
            comm: comm
        }

        await axios.post(`http://localhost:3000/board/${parentBid}/answer`, req, {headers: headers})
            .then((resp) => {
                console.log("[BoardAnswer.js] createBoardAnswer() success :D");
                console.log(resp.data);

                alert("댓글을 성공적으로 등록했습니다 :D");
                navigate(`/boardDetail/${resp.data.bid}`); // 새롭게 등록한 댓글 상세로 이동
            })
            .catch((err) => {
                console.log("[BoardAnswer.js] createBoardAnswer() err :<");
                console.log(err);

            });

    }


    /*useEffect(() => {

        if (!auth) {
            alert("로그인 한 사용자만 게시글에 대한 댓글을 작성할 수 있습니다!");
            navigate(-1);
        }
    }, []);*/


    return (
        <div>
            {/* 부모 게시글 정보 */}
            <table>
                <tbody>
                <tr>
                    <th>작성자</th>
                    <td>
                        <input type="text" value={parentBoard.uNo} readOnly />
                    </td>
                </tr>

                <tr>
                    <th>제목</th>
                    <td>
                        <input type="text" value={parentBoard.title} readOnly />
                    </td>
                </tr>

                <tr>
                    <th>내용</th>
                    <td>
                        <input type="text" value={parentBoard.content} readOnly />
                    </td>
                </tr>
                </tbody>
            </table><br/><br/>


            {/* 댓글 작성 */}
            <h3>📌 Reply</h3>
            <table>
                <tr>
                    <th>댓글 작성자</th>
                    <td>
                        <input type="text" value={localStorage.getItem("uNo")} readOnly />
                    </td>
                </tr>

                <tr>
                    <th>댓글 내용</th>
                    <td>
                        <textarea value={comm} onChange={changeComm} rows="10"></textarea>
                    </td>
                </tr>
            </table>

            <div>
                <button onClick={createBoardAnswer}>댓글달기</button>
            </div>
        </div>
    );

}


export default BoardAnswer;