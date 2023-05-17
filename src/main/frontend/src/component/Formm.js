import Login from "../page/Login";
import BoardList from "../page/board/Board";

const LoginForm = () => {
  const handler = (event) => {
    event.preventDefault();
    console.log('login form');
  }
  return (
    <form onSubmit={handler}>
      <label htmlFor="">id</label>
      <input type="text"/>
      <label htmlFor="">password</label>
      <input type="password"/>
      <button type={"submit"}>클릭</button>
    </form>
  );
};

const BoardForm = () => {

  return (
    <form action="">
      <label htmlFor="">title</label>
      <input type="text"/>
      <label htmlFor="">content</label>
      <input type="text"/>
    </form>
  );
};

/* 글 검색하는 검색창 폼
const NoticeList = () => {

    const SearchContainer = () => {
        const handleSubmit = (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const searchType = formData.get('type');
            const keyword = formData.get('keyword');
            const searchUrl = `/board/getSearchList?type=${searchType}&keyword=${keyword}`;
            window.location.href = searchUrl;
        }
    }

    return (
        <div className="search-container row justify-content-center">
            <form className="col-8 search-box" name="search_form" onClick={handleSubmit}>
                <select name="type" className="search-item">
                    <option selected value="title">제목</option>
                    <option value="content">내용</option>
                    <option value="name">작성자</option>
                </select>
                <input className="form-control search-item" type="text" id="search-input" name="keyword" placeholder="검색어를 입력하세요." />
                <button id="search-button" type="submit" className="btn btn-primary search-item">검색</button>
            </form>
        </div>
    );
}
*/


const Formm = (props) => {
  console.log(props.title);

  return (
    <>
      {props.title === "login" && <LoginForm />}
      {props.title === 'board' && <BoardForm />}
    </>
  )
}

export default Formm;