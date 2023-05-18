import React, {useState} from "react";
import axios from "axios";

const NoticeWritePost = () => {

    const [formData, setFormData] = useState({
        uno: 1, // 글 작성자 회원번호
        name: '', // 글 작성자 이름
        title: '', // 게시글 제목
        content: '', // 게시글 내용
        secret: 'P', // 글 여부 (공개/비공개)
    });


    const handleChange = (e) => {
        const {name, value} = e.target;// 변경된 요소의 'name' 과 'value' 속성을 추출함


        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // 글 공개 설정 변경하는 함수
    // 공개 선택시 secret == 'P',
    // 비공개 선택 시 secret === 'S' 로 변경하기
    const handleRadioChange = (e) => {
      const {name, value} = e.target;
      setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
      }));

    };


    /*const moveToNoticeList = () => {
      <Link to="/board/notice/" />
    };*/


    const handleSubmit = async (e) => {
        e.preventDefault();// 리로드 방지


        // API 요청을 보내는 코드
        /*axios.post('/board/notice/writePost', formData)
            .then((response) => {
                console.log("NoticeWritePost_handleSubmit 성공 :D" + response.data);
                window.location.href = '/board/notice';
            })
            .catch((error) => {
                console.log("NoticeWritePost_handleSubmit axios 실패 :< ");
                console.log("이것은 uno 인가 uNo 인가 : " + formData.uno);
                console.log(error);
            })*/

        try {
            await axios.post('/board/notice/writePost', formData, {
                headers: {
                    Authorization: 'Bearer <your_access_token>',
                }
            });
            console.log("NoticeWritePost_handleSubmit 성공 :D");
            window.location.href = '/board/notice';
        } catch (error) {
            console.log("NoticeWritePost_handleSubmit axios 실패 :<");
            console.log("글 작성자의 uNo 또는 uno: " +formData.uno);
            console.log("NoticeWritePost_handleSubmit axios 에러: " + error);

        }

    }

    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <div className="title text-center mb-3">
                                <h1>공지사항 글쓰기</h1>
                                <p>반갑습니다 운영자님, 공지사항을 적어주세요</p>
                            </div>
                            <form onSubmit={handleSubmit} id="writeConn">
                                <div>
                                    <label htmlFor="uno">회원번호</label>
                                    <input type="number" id="uno" name="uno" value={formData.uno}
                                           onChange={handleChange} readOnly/>
                                </div>
                                <div>
                                    <label htmlFor="write-input-title">제목</label>
                                    <input type="text" id="write-input-title" name="title" value={formData.title}
                                           placeholder="제목을 입력해주세요" onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor="write-input-writer">작성자</label>
                                    <input type="text" id="write-input-writer" name="name" value={formData.name}
                                           onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor="write-input-writer">공개설정</label>
                                    <div>
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs-open" value="P"
                                                   className="radio" checked={formData.secret === 'P'}
                                                   onChange={handleRadioChange} required/>
                                            <label htmlFor="write-cs-open">공개</label>
                                        </div>
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs-close" value="S"
                                                   className="radio" checked={formData.secret === 'S'}
                                                   onChange={handleRadioChange}/>
                                            <label htmlFor="write-cs-close">비공개</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <textarea name="content" placeholder="내용을 입력해주세요" value={formData.content}
                                              onChange={handleChange} required/>
                                </div>

                                <div>
                                    <button type="submit">작성하기</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NoticeWritePost;
