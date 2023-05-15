import handleFileChange from "../component/HandleFileChange";
import handleRemoveImage from "../component/HandleRemoveImage";


const QuestionWritePost = () => {


    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        // You can access form field values using event.target.elements
    }


    return (
        <>
            <section className="py-5">
                <div className="container px-5">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <div className="title text-center mb-3">
                                <h1>1:1 문의사항 글쓰기</h1>
                                <p>반갑습니다 고객님, 문의사항을 적어주세요</p>
                            </div>
                            <form onClick={handleSubmit} encType="multipart/form-data" id="writeConn">
                                <input type="hidden" id="write-input-uNo" name="uNo" value="{login.getUno()}" />
                                
                                <div className="write-attr">
                                    <label className="attr-name" htmlFor="write-input-title">제목</label>
                                    <input type="text" id="write-input-title" className="form-control" name="title" value="" placeholder="제목을 입력해주세요" required />
                                </div>
                                <div className="write-attr">
                                    <label className="attr-name" htmlFor="write-input-writer">작성자</label>
                                    <input type="text" id="write-input-writer" className="form-control" name="uNo" value="{login.uNo}" readOnly />
                                </div>
                                <div className="secret-attr">
                                    <label className="attr-name" htmlFor="write-input-writer">공개설정</label>
                                    <div className="secretF-9">
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs_open" value="P" className="radio" checked required />
                                            <label className="attr-name" htlmlFor="write-cs_open">공개</label>
                                        </div>
                                        <div className="secret-detail">
                                            <input type="radio" name="secret" id="write-cs_open" value="S" className="radio" required />
                                            <label className="attr-name" htlmlFor="write-cs_open">비공개</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="write-attr">
                                    <textarea className="form-control" name="content" placeholder="내용을 입력해주세요" required></textarea>
                                </div>

                                <div className="write-attr Attached">
                                    <label className="attr-name" htlmlFor="upload" multipart>첨부파일</label>
                                    <div className="attr-img">
                                        <input type="file" className="" name="UploadFile" value="" id="theFile" onChange={handleFileChange}/>
                                        <img id="ImgPreview" src="" className="preview"/>
                                        <input type="button" id="removeImage" value="X" className="btn-rmv" onClick={handleRemoveImage}/>
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

export default QuestionWritePost;
