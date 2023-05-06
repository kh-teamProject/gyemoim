import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {AuthContext} from "./AuthProvider";
import ReplyWrite from "./ReplyWrite";
import ReplyList from "./ReplyList";


const BoardDetail = () => {

    const {auth, setAuth} = useContext(AuthContext);

    const [board, setBoard] = useState({});
    const {bid} = useParams();  // 파라미터 가져오기

    const navigate = useNavigate();

    /* 상세 글 보여주는 컴포넌트 */
    const getBoardDetail = async () => {

        await axios.get(`http://localhost:3000/board/${bid}`, {params: {rno: auth ? auth : ""}})
            .then((resp) => {
                console.log("[BoardDetail.js] getBoardDetail() success :D");
                console.log(resp.data);

                setBoard(resp.data.board);
            })
            .catch((err) => {
                console.log("[BoardDetail.js] getBoardDetail() error :<");
                console.log(err);
            });

    }

    const deleteBoard = async () => {

        await axios.delete(`http://localhost:3000/board/${bid}`)
            .then((resp) => {
                console.log("[BoardDetail.js] deleteBoard() success :D");
                console.log(resp.data);

                if (resp.data.deletedRecordCount === 1) {
                    alert("게시글을 성공적으로 삭제했습니다!");
                    navigate("/boardList");
                }

            }).catch((err) => {
                console.log("[BoardDetail.js] deleteBoard() error :<");
                console.log(err);
            });
    }

    useEffect(() => {
        getBoardDetail();
    }, []);


    const updateBoard = {
        bid: board.bid,
        uNo: board.uNo,
        title: board.title,
        content: board.content
    }


    const parentBoard = {
        uNo: board.uNo,
        title: board.title
    }


    return (
        <div>
            <div>
                <Link to={{pathname: `/boardAnswer/${board.bid}`}} state={{parentBoard: parentBoard}}>댓글쓰기</Link> &nbsp;

                {
                    /* 자신이 작성한 게시글인 경우에만 수정, 삭제 가능함 */
                    (localStorage.getItem("rno") == board.uNo) ?
                        <>
                            <Link to="/boardUpdate" state={{board: updateBoard}}>수정</Link> &nbsp;
                            <button onClick={deleteBoard}> 삭제</button>
                        </>
                        :
                        null
                }
            </div>


            <table>
                <tbody>
                <tr>
                    <th>작성자</th>
                    <td>
                        <span>{board.uNo}</span>
                    </td>
                </tr>

                <tr>
                    <th>제목</th>
                    <td>
                        <span>{board.title}</span>
                    </td>
                </tr>

                <tr>
                    <th>작성일</th>
                    <td>
                        <span>{board.writeDate}</span>
                    </td>
                </tr>

                <tr>
                    <th>조회수</th>
                    <td>
                        <span>{board.views}</span>
                    </td>
                </tr>

                <tr>
                    <th>내용</th>
                    <td>
                        <div>
                            {board.content}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div>
                <Link to="/boardList">글목록</Link>
            </div><br/><br/>

            {/* 댓글 작성 컴포넌트 */}
            {
                (auth) ? // 로그인한 사용자만 댓글 작성 가능
                    <ReplyWrite bid={bid}/>
                    :
                    null
            }

            {/* 댓글 리스트 컴포넌트 */}
            <ReplyList bid={bid}/>

        </div>
    );
}


export default BoardDetail;