import React, {useState} from "react";
import axios from "axios";


const NoticeWritePost = () => {

    const [uNo, setUNo] = useState('1');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const [formData, setFormData] = useState({
        uNo: '1',
        name: '현지',
        title: '',
        content: '',
        secret: 'P',
        uploadFile: null,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleFileChange = (e) => {
        /*const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }*/

        setFormData((prevFormData) => ({
            ...prevFormData,
            uploadFile: e.target.files[0],
        }));
    };

    const removeImage = () => {
        setFile(null);
        setImagePreview("");
    };


    /* 게시글 제출하는 함수 */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('uNo', formData.uNo);
        form.append('title', formData.title);
        form.append('name', formData.name);
        form.append('secret', formData.secret);
        form.append('content', formData.content);
        form.append('uploadFile', formData.uploadFile);

        /* headers: { "Content-Type": "multipart/form-data"} 를 설정하는 것
        * => 멀티파트 형식의 데이터를 서버로 전송하기 위해 필요함
        *    이 설정을 통해 서버는 요청이 멀티파트 형식임을 인식하고 데이터를 올바르게 처리할 수 있음
        * 멀티파트 형식은 파일 업로드와 같이 바이너리 데이터를 전송할 때 사용되며,
        * 'FormData'를 사용하여 데이터를 구성할 때 일반적으로 설정된다.
        * 따라서 파일 업로드와 같은 경우에는 'Content-Type'을 'multipart/form-data'로 설정해야 한다.
        * 만일, 설정하지 않거나 다른 형식으로 설정하면 서버는 요청을 잘못된 형식으로
        * 처리하게 되어 데이터를 올바르게 수신하지 못할 수 있다. */
        try {
            const response = await axios.post("/board/notice/writePost", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("NoticeWritePost.handleSubmit success :D");
            window.location.href = "/board/notice";
        } catch (error) {
            console.log('NoticeWritePost.handleSubmit not success :< ' + error);
        }

        /*await axios
            .post('/board/notice/writePost', null, {
                params
            })
            .then((response) => {
                //게시글 작성 완료 후의 동작 처리
                console.log('NoticeWritePost.handleSubmit success :D');
                window.location.href = '/board/notice';
            })
            .catch((error) => {
                // 에러 처리
                console.log(error.data);
                console.log('NoticeWritePost.handleSubmit not success :< ' + error);
            });*/
    };

    return (
        <>
            <section className="py-5">
                <div className="container px-5">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <div className="title text-center mb-3">
                                <h1>공지사항 글쓰기</h1>
                                <p>반갑습니다 운영자님, 공지사항을 적어주세요</p>
                            </div>
                            <form onSubmit={handleSubmit} encType="multipart/form-data" id="writeConn">
                                {/*<input type="hidden" id="write-input-uNo" name="uNo" value="{login.getUno()}"/>*/}

                                <div className="write-attr">
                                    <label className="attr-name" htmlFor="write-input-title">제목</label>
                                    <input type="text" id="write-input-title" className="form-control" name="title"
                                           value={formData.title} onChange={handleChange} placeholder="제목을 입력해주세요"
                                           required/>
                                </div>
                                <div className="write-attr">
                                    <label className="attr-name" htmlFor="write-input-writer">작성자</label>
                                    <input type="text" id="write-input-writer" className="form-control" name="name"
                                           value={formData.name} onChange={handleChange} readOnly/>
                                </div>
                                <div className="secret-attr">
                                    <label className="attr-name" htmlFor="write-input-writer">공개설정</label>
                                    <div className="secretF-9">
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs_open" value="P"
                                                   className="radio" checked={formData.secret === 'P'}
                                                   onChange={handleChange} required/>
                                            <label className="attr-name" htmlFor="write-cs_open">공개</label>
                                        </div>
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs_open" value="S"
                                                   className="radio" checked={formData.secret === 'S'}
                                                   onChange={handleChange} required/>
                                            <label className="attr-name" htmlFor="write-cs_open">비공개</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="write-attr">
                                    <textarea className="form-control" name="content" value={formData.content}
                                              onChange={handleChange} placeholder="내용을 입력해주세요"
                                              required></textarea>
                                </div>

                                <div className="write-attr Attached">
                                    <label className="attr-name" htmlFor="upload" multipart="true">첨부파일</label>
                                    <div className="attr-img">
                                        <input type="file" className="" name="uploadFile" id="theFile"
                                               onChange={handleFileChange}/>
                                        {file && (
                                            <img src={imagePreview} id="ImgPreview" className="preview"/>
                                        )}
                                        {file && (
                                            <button type="button" id="removeImage" onClick={removeImage}
                                                    className="btn-rmv">X</button>
                                        )}
                                    </div>
                                </div>

                                <div className="write-btn-area text-center">
                                    <button type="submit" className="btn btn-primary btn-lg px-4 me-sm-3">작성하기</button>
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
