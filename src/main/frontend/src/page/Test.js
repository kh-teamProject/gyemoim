import {useEffect, useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";

const Test = () => {
  const {pfID} = useParams();
  const [message, setMessage] = useState([]);

  useEffect(() => {
      axios.get(`/test`, {
        params:{
          pfID: pfID,
        }
      })
        .then((res) => {
          setMessage(res.data);
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
        </li>
      ))}
    </ul>
    </>
  );
};

export default Test;