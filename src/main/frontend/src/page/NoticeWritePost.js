import React, {useState} from "react";
import axios from "axios";

const NoticeWritePost = () => {

    const [formData, setFormData] = useState({
        uNo: '', // 글 작성자 회원번호
        name: '', // 글 작성자 이름
        title: '', // 게시글 제목
        content: '', // 게시글 내용
        secret: '', // 글 여부 (공개/비공개)
        uploadFile: '', // 업로드할 파일
    });

    // 입력 요소의 값이 변경될 때 호출되는 이벤트 핸들러 함수
    // 이 함수는 `e` 라는 이벤트 객체를 매개변수로 받는 함수이다.
    // 함수 내부에서는 `e.target`을 통해 이벤트가 발생한 요소에 대한 정보에 접근한다.
    // 이 정보는 `name`, `value`, `files` 등의 속성을 포함하고 있다.
    // 먼저 `name`, `value`, `files` 를 변수로 추출하고
    // `name`은 변경된 요소의 `name` 속성, `value` 는 변경된 요소의 값,
    // `files`는 변경된 요소가 파일 업로드(input type='file')인 경우 선택된 파일을 나타낸다.
    // useState 훅을 사용하여 formData 상태를 업데이트함
    // e.target 사용하여 이벤트가 발생한 요소에 대한 정보 접근
    // 즉, `handleChange` 함수는 입력 요소의 값이 변경될 때마다
    // 해당 입력 요소의 `name` 속성에 해당하는 `formData` 상태를 업데이트한다.
    // 이를 통해 사용자가 입력한 값이 실시간으로 상태에 반영되고 저장됨.
    const handleChange = (e) => {
        const {name, value, files} = e.target;// 변경된 요소의 'name' 과 'value' 속성을 추출함
        // setFormData 함수 사용하여 이전 'formData' 상태를 업데이트 함
        // 업데이트할 때, 이전 `formData` 상태를 스프레드 연산자(`...`)를 사용하여 복사하고,
        // `[name]`을 통해 해당하는 속성을 업데이트한다.
        // `[name]` 은 Computed property names 라고 하는 자바스크립 문법이다.
        // 즉, `name`에 해당하는 속성을 동적으로 업데이트 할 수 있다.

        // `name` 이 'uploadFile' 인 경우
        // setFormData 함수 사용하여 이전 'formData' 상태를 업데이트 함
        // 이전 `formData` 상태를 스프레드 연산자(`...`)를 사용하여 복사한 후,
        // `[name]`을 통해 해당하는 속성을 업데이트 한다.
        // 이 경우 `[name]`은 'uploadFile' 을 의미하며,
        // `files[0]` 값을 할당하여 업로드된 파일을 업데이트 한다.
        if (name === 'uploadFile') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

            // 이미지 미리보기 업데이트
            // `reader.onload` 이벤트 핸들러 정의하여 파일을 읽은 후에 실행 될 동작 지정함
            // `reader.readAsDataURL(files[0])` 를 호출하여 파일을 읽고
            // `event.target.result`를 통해 파일의 데이터 URL 을 가져와서
            // `ImgPreview`요소의 `src` 속성에 할당하여 이미지 미리보기를 한다.
            const reader = new FileReader();// 이미지 미리보기 업데이트를 하기 위해 FileReader 객체를 사용
            reader.onload = (event) => {
                document.getElementById('ImgPreview').src = event.target.result;
            };
            reader.readAsDataURL(files[0]);
        }

            // `name` 이 'uploadFile' 이 아닌경우
            // 업데이트할 속성이 파일 업로드가 아닌 경우이므로
            // `setFormData` 함수를 사용하여 이전 `formData`상태를 업데이트 한다.
            // 이전 `formData`상태를 스프레드 연산자를 사용하여 복사한 후,
            // `[name]` 을 통해 해당하는 속성을 업데이트한다.
            // 이 경우 `[name]`은 변경된 요소의 `name` 속성을 의미하며,
            // `value` 값을 할당하여 업데이트 한다.
        else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

    };


    // 이미지 미리보기 삭제를 위한 함수
    const handleRemoveImage = () => {
        setFormData((prevData) => ({
            ...prevData,
            uploadFile: null,
        }));

        document.getElementById('ImgPreview').src = '';
        document.getElementById('theFile').value = '';
    }

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            uploadFile: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();// 리로드 방지

        const url = '/board/notice/writePost';// 요청 보낼 URL 정의

        const formDataWithFile = new FormData();
        formDataWithFile.append('uNo', formData.uNo);
        formDataWithFile.append('name', formData.name);
        formDataWithFile.append('title', formData.title);
        formDataWithFile.append('content', formData.content);
        formDataWithFile.append('secret', formData.secret);
        //formDataWithFile.append('uploadFile', formData.uploadFile);

        const response = await axios.post(url, formDataWithFile);// POST 요청 뵤내고 response 변수에 응답을 받아온다.

        console.log("여기 handleSubmit은 들어오나?");

        try {

            console.log("NoticeWritePost_handleSubmit 작동한닷!! try문으로 들어옴");
            console.log(response.data); // success message or error message

        } catch (error) {
            console.log("NoticeWritePost_handleSubmit 왜 안되는거얏!?");
            console.log(formDataWithFile);
            console.log(response.data);
            console.log(error);
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
                            <form onSubmit={handleSubmit} encType="multipart/form-data" id="writeConn">
                                <div>
                                    <label htmlFor="uNo">회원번호</label>
                                    <input type="text" id="uNo" name="uNo" value={formData.uNo}
                                           onChange={handleChange}/>
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
                                                   onChange={handleChange} required/>
                                            <label htmlFor="write-cs-open">공개</label>
                                        </div>
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs-close" value="S"
                                                   className="radio" checked={formData.secret === 'S'}
                                                   onChange={handleChange} required/>
                                            <label htmlFor="write-cs-close">비공개</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <textarea name="content" placeholder="내용을 입력해주세요" value={formData.content}
                                              onChange={handleChange} required/>
                                </div>

                                <div>
                                    <label htmlFor="theFile">첨부파일</label>
                                    <div> 파일 선택을 취소할 때 이미지 미리보기와 파일 입력 요소를 초기화해야한다. 이를 위해 handleRemoveImage 함수를 onChange 이벤트에서 호출하도록 해야한다.
                                        <input type="file" name="uploadFile" value={formData.uploadFile} id="theFile"
                                               onChange={(e) => {
                                                   handleChange(e);
                                                   if (!e.target.files.length) {
                                                       handleRemoveImage();
                                                   }
                                               }}
                                        />
                                        <img id="ImgPreview" src=""/>
                                        <input type="button" id="removeImage" onChange={handleRemoveImage} value="x"/>
                                    </div>
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
