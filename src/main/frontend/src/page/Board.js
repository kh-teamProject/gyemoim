import React from 'react';
import {Link} from "react-router-dom";

/*
const Board = () => {

    // 리스트 객체
    const [boardList, setBoardList] = useState([]);


    // 웹에서 서버로 요청 --> 나 리스트 전달해줘
    // 백엔드단에서 리스트 객체를 가져오는 부분
    useEffect(() => {
        const getBoardList = async () => {
            let response = await axios
                .get('/board/list')// axios 를 통해 HTTP 요청을 보내는 코드
                .then((response) => {// then() 에서는 HTTP 요청을 통해 받아온 데이터를 처리할 수 있다
                    console.log("getBoardList() success :D");
                })
                .catch(error => console.log(error));


            console.log("Board/response: ", response);
            setBoardList(response.data.boardList);// 이전에 useState 으로 생성했던 setBoardList 함수를 통해 data 를 boardList 에 저장한다
        };




    getBoardList();
    }, []);

    return (
        <>
            <Link to = {"/board/write"} >
                <input type="button" value="글 작성하기" />
            </Link>
            <List boardList = {boardList} />
        </>
    );
}


// list.js (게시글 리스트를 표시하는 컴포넌트) <= NoticeList 컴포넌트
// 'posts' 와 'loading' 을 props 로 받아서
// 'loading' 상태일 때는 "Loading..." 을,
// 게시글이 없을 때는 "No posts available" 을,
// 그 외에는 게시글 목록을 표시한다.
const List = (props) => {

    console.log('List/props: ', props);
    console.log('List/props.data: ', props.data);

    return (
        <>
            {Array.isArray(props.data) && props.data.length !== 0 ?
                props.data.map((i) => (
                    <BoardBox key={i.bid}
                              id={i.bid}
                              title={i.title}
                              content={i.content}
                    />
                ))
                : <p>게시글이 존재하지 않습니다.</p>}
        </>
    );

};
*/

const Board = () => {


    const boardListLine = {
        borderBottom: 1,
        borderBlockStyle: 'solid',
        borderColor: '#eee',
    }



    return (
        <>
            <div style={boardListLine}>
                <ul>
                    <li>
                        <Link to="notice">공지사항</Link>
                    </li>
                    <li>
                        <Link to="question">1:1 문의사항</Link>
                    </li>
                </ul>
            </div>
        </>
    );

}


export default Board;