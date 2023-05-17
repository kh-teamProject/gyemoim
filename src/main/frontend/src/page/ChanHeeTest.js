import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";


const ChanHeeTest = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const navigate = useNavigate();

    const handleClick = (value) => {
    setSelectedButton(value);
    console.log(value);
    axios.post('/stageIn', null, {
      params: {
        uNo: 4,
        receiveTurn: value,
        pfID: 1
      }
    })
      .then(response => {
          navigate('/stage');
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