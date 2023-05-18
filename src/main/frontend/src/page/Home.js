import {useEffect, useState} from "react";
import axios from "axios";

const Home = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    axios.get('/hello', {

    })
=======
    axios.get('/hello')
>>>>>>> 30a23975ccf0dd6c71a73cbc72643b9006717774
      .then((res) => {
        setMessage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
      <h1>DB값 불러오기</h1>
    <ul>
      {message.map((value, index) => (
        <li key={index}>{value.name}, age: {value.age}</li>
      ))}
    </ul>
  );
};

export default Home;