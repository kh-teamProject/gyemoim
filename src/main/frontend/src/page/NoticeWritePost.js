import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

/*
const QuestionWritePost = () => {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용

    const resetInput = () => {
        setContent("");
        setTitle("");
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
    }

    const handleInputClick = async (e) => {
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';

        console.log('QuestionWritePost');

        const request_data = {title: title, content: content};

        console.log('req_data: ', request_data);

        try {
            let response = await axios({
                method: 'post',
                url: '/board/writePost',
                headers:{'Content-Type': 'application/json'},
                data: JSON.stringify(request_data)
            });
            console.log('QuestionWritePost/response: ', response);
            console.log('QuestionWritePost/response.status: ', response.status);

            if (response.status >= 200 && response.status < 300) {
                alert("게시글이 정상적으로 작성되었습니다.")
            }
            if (response.status >= 400) {
                alert("게시글 작성이 정상적으로 되지 않았습니다.");
            }
            navigate("/board", {});
        }
        catch (err) {
            console.log('QuestionWritePost/handleInput/err: ', err);
            resetInput();
        }
    }

    return (
        <>

        </>
    );
}
*/

const NoticeWritePost = () => {


    /*
    const handleRemoveImage = (event) => {
        event.preventDefault();
        const inputFile = document.getElementById("theFile");
        const imgPreview = document.getElementById("ImgPreview");
        inputFile.value = "";
        imgPreview.src = "";
        imgPreview.classList.remove("it");
        document.querySelector(".btn-rmv").classList.remove("rmv");
    }
     */


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
                                <p>문의사항을 적어주세요</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}

export default NoticeWritePost;
