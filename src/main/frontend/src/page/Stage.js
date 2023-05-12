import {useEffect, useState} from "react";
import axios from "axios";
import ErrorModal from "../component/UI/ErrorModal";
import {Link} from "react-router-dom";
import classes from '../component/css/Stage.css';

const Stage = () => {
  const [error, setError] = useState();
  // 계모임 값 뿌리기
  const [stage, setStage] = useState([]);
  // 버튼으로 스테이지 세팅하는 State
  const [isClicked, setIsClicked] = useState('전체');
  //페이징 가보자고~
  const [curPage, setCurPage] = useState(1); //현재페이지
  const [totalPage, setTotalPage] = useState(0); //전체 페이지 수

  const modalHandler = () => {
    setError('Modal');
  };

  const errorHandler = () => {
    setError(null);
  };

  const handleButtonClick = (event) => {
    if (event.target.value == '전체') {
      setIsClicked(event.target.value);
      console.log(event.target.value);
    } else {
      let i = Number(event.target.value);
      setIsClicked(i);
      console.log(i);
    }
    setCurPage(1); //페이지 버튼 클릭시 현재 페이지를 1로 초기화

  };
  const handlePageClick = (event) => {
    const targetPage = Number(event.target.value); //클릭한 페이지
    if (targetPage > 0 && targetPage <= totalPage) {
      //클릭한 타겟페이지가 0보다 크고 totalPage보다 작거나 같으면 -> 즉, 클릭한 페이지가 유효범위에 있을때
      setCurPage(targetPage); //현재페이지를 클릭페이지로 설정
    }
  };

  useEffect(() => {
    // 버튼 클릭으로 스테이지 조회하는 구문
    if (isClicked === '전체') {
      axios
        .get('/stage', {})
        .then((res) => {
          console.log(res.data.PF);
          setStage(res.data.PF);
          setTotalPage(Math.ceil(res.data.PF.length / 35)); //전체 페이지 수 계산
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get('/filter', {
          params: {
            deposit: isClicked,
          },
        })
        .then((res) => {
          setStage(res.data);
          setTotalPage(Math.ceil(res.data.length / 35)); //전체 페이지 수 계산
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isClicked]);

  return (
    <>
      <h1>스테이지 조회</h1>
      <div >
        <button onClick={handleButtonClick} value='전체'>전체</button>
        <button onClick={handleButtonClick} value='2500000'>250만원</button>
        <button onClick={handleButtonClick} value='3500000'>350만원</button>
        <button onClick={handleButtonClick} value='5000000'>500만원</button>
        <button onClick={handleButtonClick} value='7000000'>700만원</button>
      </div>

      <div>
        <table>

          {stage.slice((curPage - 1) * 35, curPage * 35)
                .reduce((acc,value) =>{
                  const index = acc.findIndex(item => item.pfID === value.pfID)
                  if(index === -1){
                    acc.push({
                      pfName: value.pfName, pfID : value.pfID, receiveTurn:[value.receiveTurn],
                      deposit:value.deposit, payment : value.payment ,pfEntry :value.pfEntry})
                  } else{
                    acc[index].receiveTurn.push(value.receiveTurn)
                  }
                  return acc
                },[])
              .map((value, index) => (
              <Link to={`/test/${value.pfID}`} style={{textDecoration: "none"}}>
              <div key={index}>
                <div>
                <h3>{value.pfName}</h3>
                </div>
                <td>계모임 식별번호 ->{value.pfID}</td>
                <div>
                 {value.receiveTurn.join(<li/>)}
                </div>
                {/*{5 === <></>}*/}
                <div>
                <p>약정금 :<strong>{value.deposit}</strong> |
                  월 입금액 : <strong>{value.payment}</strong></p>
                </div>
              </div>
            </Link>
        ))}
        </table>
      </div>

      <div>
        <button onClick={modalHandler}>Modal</button>
        {error && <ErrorModal title={'Modal'} onConfirm={errorHandler}/>}
      </div>
      <button onClick={() => handlePageClick({target: {value: curPage - 1}})}>《</button>
      {/*어레이로 숫자를 클릭해서 페이지 전환을 할 수 있게함.*/}
      {Array.from({length: totalPage}, (_, i) => (
        <button key={i + 1} value={i + 1} onClick={handlePageClick}
                className={curPage === i + 1 ? 'active' : ''}>{i + 1}</button>
      ))}
      <button onClick={() => handlePageClick({target: {value: curPage + 1}})}>》</button>
    </>
  );

}

export default Stage;