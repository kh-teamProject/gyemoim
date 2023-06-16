import {useParams} from "react-router-dom";

const TestAdminAccountDetail = () => {
    const {uno}= useParams();
    console.log(uno);
    return (
        <>
            <h1>회원상세 페이지</h1>
            성공하셧쎼요

        </>
    );
};

export default TestAdminAccountDetail;