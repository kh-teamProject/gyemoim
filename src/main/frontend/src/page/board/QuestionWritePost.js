import React, {useState} from "react";
import axios from "axios";


const QuestionWritePost = () => {

    // 문자열 1 을 10진수로 나타내주는
    //const uno = parseInt("1", 10);

    const [questionFormData, setQuestionFormData] = useState({
        uno: 1,
        name: "현지", // 글 작성자 이름
        type: "1:1 문의사항", // 게시글 타입
        title: "", // 게시글 제목
        content: "", // 게시글 내용
        secret: "P", // 글 여부 (공개/비공개)
    });


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


    const handleQuestionSubmit = async (e) => {
        e.preventDefault();// 리로드 방지


        axios.post('/board/writePost', questionFormData)
            .then((response) => {
                console.log("QuestionWritePost_handleSubmit 성공 :D");
                console.log("글 작성자의 uNo 또는 uno: " + questionFormData.uno);
                console.log("글 작성자의 name: " + questionFormData.name);
                console.log("글 게시물 종류: " + questionFormData.type);
                console.log("글 게시물 제목: " + questionFormData.title);
                console.log("글 게시물 내용: " + questionFormData.content);
                console.log("글 게시물 공개여부: " + questionFormData.secret);
                window.location.href = '/board/question';
            })
            .catch((error) => {
                console.log("QuestionWritePost_handleSubmit axios 실패 :<");
                console.log("글 작성자의 uNo 또는 uno: " + questionFormData.uno);
                console.log("글 작성자의 name: " + questionFormData.name);
                console.log("글 게시물 종류: " + questionFormData.type);
                console.log("글 게시물 제목: " + questionFormData.title);
                console.log("글 게시물 내용: " + questionFormData.content);
                console.log("글 게시물 공개여부: " + questionFormData.secret);
                console.log("QuestionWritePost_handleSubmit axios 에러: " + error)

                /*console.log("QuestionWritePost_handleSubmit 성공 :D");
                console.log("글 작성자의 uNo 또는 uno: " + questionFormData.uno);
                console.log("글 작성자의 name: " + questionFormData.name);
                console.log("글 게시물 종류: " + questionFormData.type);
                console.log("글 게시물 제목: " + questionFormData.title);
                console.log("글 게시물 내용: " + questionFormData.content);
                console.log("글 게시물 공개여부: " + questionFormData.secret);
                console.log("QuestionWritePost_handleSubmit 글 작성 컨트롤러로 가즈앗! ><");
                //window.location.href = '/board/question';*/
            });

    }

    return (
        <>
            <section>
                <div>
                    <div>
                        <div>
                            <div className="title text-center mb-3">
                                <h1>1:1 문의사항 글쓰기</h1>
                                <p>반갑습니다 고객님, 문의사항을 적어주세요</p>
                            </div>
                            <form onSubmit={handleQuestionSubmit} id="writeConn">
                                <div>
                                    <label htmlFor="uno">회원번호</label>
                                    <input type="number" id="uno" name="uno" value={questionFormData.uno}
                                           onChange={handleChange} readOnly/>
                                </div>
                                <div>
                                    <label htmlFor="write-input-title">제목</label>
                                    <input type="text" id="write-input-title" name="title"
                                           value={questionFormData.title}
                                           placeholder="제목을 입력해주세요" onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor="write-input-writer">작성자</label>
                                    <input type="text" id="write-input-writer" name="name" value={questionFormData.name}
                                           onChange={handleChange} required/>
                                </div>
                                <div>
                                    <label htmlFor="write-input-writer">공개설정</label>
                                    <div>
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs-open" value="P"
                                                   className="radio" checked={questionFormData.secret === 'P'}
                                                   onChange={handleRadioChange} required/>
                                            <label htmlFor="write-cs-open">공개</label>
                                        </div>
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs-close" value="S"
                                                   className="radio" checked={questionFormData.secret === 'S'}
                                                   onChange={handleRadioChange}/>
                                            <label htmlFor="write-cs-close">비공개</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <textarea name="content" placeholder="내용을 입력해주세요" value={questionFormData.content}
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

export default QuestionWritePost;
