import {useState} from "react";
import ErrorModal from "../component/UI/ErrorModal";

const Stage = () => {
  const [error, setError] = useState();

  const modalHandler = () => {
    setError('Modal');
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <button onClick={modalHandler}>Modal</button>
      {error && <ErrorModal title={'Modal'} onConfirm={errorHandler} />}
    </>
  );
};

export default Stage;