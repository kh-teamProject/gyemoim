import {useState} from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom';


const ChanHeeTest = () => {
    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;

    const [selectedButton, setSelectedButton] = useState(null);
    const navigate = useNavigate();

    const handleClick = (value) => {
    setSelectedButton(value);
    console.log(value);
    axios.post('/stageIn', null, {
      params: {
        uNo: uNo,
        receiveTurn: value,
        pfID: 22
      }
    })
      .then(response => {
          navigate('/stage/22');
      })
      .catch(error => {
        // 에러 처리
      });
    };

  return (
    <div>
      <button onClick={() => handleClick(1)}>Button 1</button>
      <button onClick={() => handleClick(2)}>Button 2</button>
      <button onClick={() => handleClick(3)}>Button 3</button>
      <button onClick={() => handleClick(4)}>Button 4</button>
      <button onClick={() => handleClick(5)}>Button 5</button>
    </div>
  );
}

export default ChanHeeTest;