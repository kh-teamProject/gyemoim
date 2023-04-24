import React, {useState, useEffect} from "react";
import axios from 'axios';
import './App.css';

const App = () => {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    axios.get('/hello')
      .then((res) => {
        setMessage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {message.map((text, index) => (
            <li key={`${index}-${text}`}>{`name: ${text.name}, age: ${text.age}`}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;

