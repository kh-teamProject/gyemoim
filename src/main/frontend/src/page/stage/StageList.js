import {useEffect, useState} from "react";
import axios from "axios";
import ErrorModal from "../../component/UI/ErrorModal";
import {Link} from "react-router-dom";
import classes from '../css/StageList.modlue.css';
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {useSelector} from "react-redux";

const StageList = () => {
  const [error, setError] = useState();
  // 계모임 값 뿌리기
  const [stage, setStage] = useState([]);
  // 약정금 버튼으로 스테이지 세팅하는 State
  const [deposit, setDeposit] = useState('전체');
  // 관심사 기반으로 스테이지 세팅하는 State
  const [interest, setInterest] = useState('관심사');
  //로그인 여부 체크
  const checkedLogin = useSelector((state) => state.checkedLogin);

  //페이징 가보자고~
  const [curPage, setCurPage] = useState(1); //현재페이지
  const [totalPage, setTotalPage] = useState(0); //전체 페이지 수
  const [list, setList ] = useState(10);//현재 스테이지 수
  const modalHandler = () => {
    setError('Modal');
  };

  const errorHandler = () => {
    setError(null);
  };

  // 약정금 기반으로 조회하는 함수
  const handleButtonClick = (event) => {
    if (event.target.value === '전체') {
      setDeposit(event.target.value);
      console.log(event.target.value);
    } else {
      let i = Number(event.target.value);
      setDeposit(i);
      console.log(i);
    }
    setCurPage(1); //페이지 버튼 클릭시 현재 페이지를 1로 초기화
    setList(10);
    setInterest(interest);
  };
  //관심사 목록기반으로 조회하는 함수
  const selectInterest = (event) =>{
    console.log(event.target.value);
    setInterest(event.target.value);
    setCurPage(1);
    setList(10);

  }

  //페이징 함수
  const handlePageClick = (event) => {
    const targetPage = Number(event.target.value); //클릭한 페이지
    if (targetPage > 0 && targetPage <= totalPage) {
      //클릭한 타겟페이지가 0보다 크고 totalPage보다 작거나 같으면 -> 즉, 클릭한 페이지가 유효범위에 있을때
      setCurPage(targetPage); //현재페이지를 클릭페이지로 설정
      setList(list+10);
    }
  };

//숫자를 천단위마다 쉼표로 끊어서 표시
  const formatNum = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };



  useEffect(() => {
    // 버튼 클릭으로 스테이지 조회하는 구문
  // console.log(token);
    if (deposit === '전체') {
      axios
        .get('/stagelist', {})
        .then((res) => {
          console.log(res.data.PF);
          setStage(res.data.PF);
          setTotalPage(Math.ceil(res.data.PF.length / list)); //전체 페이지 수 계산
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get('/filter', {
          params: {
            deposit: deposit,
          },
        })
        .then((res) => {
          console.log(res.data);
          setStage(res.data);
          setTotalPage(Math.ceil(res.data.length / list)); //전체 페이지 수 계산

        })
        .catch((error) => {
          console.log(error);
        });
    }
    //추천테이블 작동 코드
    if(checkedLogin){
  //추천기능 변수와 state
  const token = jwtDecode(Cookies.get('Set-Cookie'));
  const uNo = token.uNo;
      axios
        .get('/recommend',{
          params : {
            uno: uNo
          },
        })
        .then((res)=>{
          console.log(res.data);
          setRecommend(res.data);
        })
        .catch((error)=>{
          console.log(error);
        });
    }
  },[deposit,checkedLogin] );

  //추천테이블 값 뿌리는 스테이트
  const [recommend, setRecommend] = useState([])

  return (
    <>
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {checkedLogin && recommend
          .reduce((acc,value) =>{
            const index = acc.findIndex(item => item.pfID === value.pfID)
            if(index === -1){
              acc.push({
                pfName: value.pfName,
                pfID : value.pfID,
                receiveTurn:[{turn:value.receiveTurn,uno: value.uno}],
                deposit:value.deposit,
                payment : value.payment ,
                pfEntry : value.pfEntry ,
                startFlag : value.startFlag,
                interest:value.interest})
              console.log((value.uno));

            } else{
              acc[index].receiveTurn.push({turn: value.receiveTurn, uno: value.uno})
            }
            return acc
          },[])
          .map((value,index)=>{
          return(
            <>
              <div>
              <div>
              <Link to={`/test/${value.pfID}`} style={{textDecoration: "none"}} id="select-stage">
            <div id="select-deposit">
              <h3 className="stage-h3">{value.pfName}</h3>
              {value.interest}
            </div>
              <ul>
                {[...Array(Number(value.pfEntry))].map((_,index) =>{
                  const receiveTurnIndex = value.receiveTurn.findIndex(item => item.turn === index+1)
                  const uno = receiveTurnIndex !== -1? value.receiveTurn[receiveTurnIndex].uno:null
                  return(
                    <li key={index} id="rec-turn">
                      {/*{value.receiveTurn===index+1?"참": index+1}*/}
                      {uno === null? index+1 : "참"}
                    </li>
                  )
                })}
              </ul>
              <div id="stage-payInfo">
                <p>약정금 :<strong>{formatNum(Number(value.deposit))}</strong> | 월 입금액 : <strong>{formatNum(Number(value.payment))}</strong></p>
              </div>
            </Link>
              </div>
              </div>
              </>
          )
          })}
          </div>
      </div>
      <h1>스테이지 조회</h1>
      <div>
        <button class={deposit==='전체'? 'btn-deposit':'sel-deposit'} onClick={handleButtonClick} value='전체'>전체</button>
        <button class={deposit=== 70? 'btn-deposit':'sel-deposit'} onClick={handleButtonClick} value='70'>~70만원</button>
        <button class={deposit=== 150? 'btn-deposit':'sel-deposit'} onClick={handleButtonClick} value='150'>100~150만원</button>
        <button class={deposit=== 250? 'btn-deposit':'sel-deposit'} onClick={handleButtonClick} value='250'>200~250만원</button>
        <button class={deposit=== 350? 'btn-deposit':'sel-deposit'} onClick={handleButtonClick} value='350'>280~350만원</button>
      </div>

      <div>
        <select class='sel-int' onChange={selectInterest}>
          <option value='관심사'>관심사</option>
          <option value='목돈'>목돈</option>
          <option value='여행'>여행</option>
          <option value='전자제품'>전자제품</option>
          <option value='패션잡화'>패션잡화</option>
          <option value='취미'>취미</option>
          <option value='웨딩'>웨딩</option>
          <option value='자동차'>자동차</option>
        </select>
      </div>


      <div class="stage-wrap">
        <div class="stage">
          {stage.slice((curPage - 1) * list, curPage * list)
                .reduce((acc,value) =>{
                  const index = acc.findIndex(item => item.pfID === value.pfID)
                  if(index === -1){
                    acc.push({
                      pfName: value.pfName,
                      pfID : value.pfID,
                      receiveTurn:[{turn:value.receiveTurn,uno: value.uno}],
                      deposit:value.deposit,
                      payment : value.payment ,
                      pfEntry : value.pfEntry ,
                      startFlag : value.startFlag,
                      interest:value.interest})
                    console.log((value.uno));

                  } else{
                    acc[index].receiveTurn.push({turn: value.receiveTurn, uno: value.uno})
                  }
                  return acc
                },[])
                .map((value, index) => {
                  if(interest ==='관심사'){
                    return(
              <div key={index} >
                {/*startFlag가 대기중일때만 Link동작하게 하는 코드 시작*/}
                {value.startFlag ==='대기중'?(
                <Link to={`/stageSelect/${value.pfID}`} style={{textDecoration: "none"}} id="select-stage">
                  <div id="select-deposit">
                    <h3 class="stage-h3">{value.pfName}</h3>
                      {value.interest}
                  </div>

                  <ul>
                    {[...Array(Number(value.pfEntry))].map((_,index) =>{
                      const receiveTurnIndex = value.receiveTurn.findIndex(item => item.turn === index+1)
                      const uno = receiveTurnIndex !== -1? value.receiveTurn[receiveTurnIndex].uno:null
                      return(
                        <li key={index} id="rec-turn">
                          {/*{value.receiveTurn===index+1?"참": index+1}*/}
                          {uno === null? index+1 : "참"}
                        </li>
                      )
                    })}
                  </ul>

                  <div id="stage-payInfo">
                    <p>약정금 :<strong>{formatNum(Number(value.deposit))}</strong> | 월 입금액 : <strong>{formatNum(Number(value.payment))}</strong></p>
                  </div>
                </Link>
                )
                :
                  // 대기중이 아닐때 보여지는 코드
                  (<div class='stage-ing'>
                    <div id="select-deposit">
                      <h3 className="stage-h3">{value.pfName}</h3>
                     {value.interest}
                    </div>
                    <div class ='all-attend'>
                      <p>전원 참여</p>
                      <p>스테이지 진행중입니다</p>
                    </div>
                    <div id="stage-payInfo">
                      <p>약정금 :<strong>{value.deposit}</strong> | 월 입금액 : <strong>{value.payment}</strong></p>
                    </div>
                  </div>)}
                {/*startFlag가 대기중일때만 Link동작하게 하는 코드 끝*/}
              </div>)}
                  else if(value.interest === interest){
                    return(
                      <div key={index} >
                        {/*startFlag가 대기중일때만 Link동작하게 하는 코드 시작*/}
                        {/*&& value.interest==={}*/}
                        {value.startFlag ==='대기중'?(
                            <Link to={`/test/${value.pfID}`} style={{textDecoration: "none"}} id="select-stage">
                              <div id="select-deposit">
                                <h3 class="stage-h3">{value.pfName}</h3>
                                {value.interest}
                              </div>

                              <ul>
                                {[...Array(Number(value.pfEntry))].map((_,index) =>{
                                  const receiveTurnIndex = value.receiveTurn.findIndex(item => item.turn === index+1)
                                  const uno = receiveTurnIndex !== -1? value.receiveTurn[receiveTurnIndex].uno:null
                                  return(
                                    <li key={index} id="rec-turn">
                                      {/*{value.receiveTurn===index+1?"참": index+1}*/}
                                      {uno === null? index+1 : "참"}
                                    </li>
                                  )
                                })}
                              </ul>

                              <div id="stage-payInfo">
                                <p>약정금 :<strong>{value.deposit}</strong> | 월 입금액 : <strong>{value.payment}</strong></p>
                              </div>
                            </Link>
                          )
                          :
                          // 대기중이 아닐때 보여지는 코드
                          (<div class='stage-ing'>
                            <div id="select-deposit">
                              <h3 className="stage-h3">{value.pfName}</h3>
                              {value.interest}
                            </div>
                            <div class ='all-attend'>
                              <p>전원 참여</p>
                              <p>스테이지 진행중입니다</p>
                            </div>
                            <div id="stage-payInfo">
                              <p>약정금 :<strong>{value.deposit}</strong> | 월 입금액 : <strong>{value.payment}</strong></p>
                            </div>
                          </div>)}
                        {/*startFlag가 대기중일때만 Link동작하게 하는 코드 끝*/}
                      </div>)}
          })}
        </div>
        <p class='more-stage'>
           <button class='more-stage-btn' onClick={() => handlePageClick({target: {value: curPage}})}> 스테이지 더보기 </button>
        </p>
      </div>

    </>
  );}



export default StageList;