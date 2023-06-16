import {useEffect, useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const Test = () => {
  const {pfID} = useParams();
  const [message, setMessage] = useState([]);

  //로그인 여부 체크
  const checkedLogin = useSelector((state) => state.checkedLogin);

  useEffect(() => {
      axios.get(`/test`, {
        params:{
          pfID: pfID,
        }
      })
        .then((res) => {
          setMessage(res.data);
          console.log(message);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);


  return (
    <>
    <h1>제발 나와</h1>
    <ul>
      {message.map((value, index) => (
        <li key={index}>
          {/*계모임 식별번호: {value.pfID} |  약정금 : {value.deposit}*/}
          수령순서 : {value.receiveTurn}
          {value.uno}
        </li>
      ))}
    </ul>
    </>
  );
};

export default Test;