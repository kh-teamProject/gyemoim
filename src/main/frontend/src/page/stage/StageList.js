import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import classes from '../css/StageList.modlue.css';
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {useSelector} from "react-redux";
import RecommendList from "../../component/UI/stage/RecommendList";

const StageList = () => {
  // 계모임 값 뿌리기
  const [stage, setStage] = useState([]);
  // roll 값 뿌리기
  const [roll, setRoll] = useState([]);
  // 약정금 버튼으로 스테이지 세팅하는 State
  const [deposit, setDeposit] = useState('전체');
  // 관심사 기반으로 스테이지 세팅하는 State
  const [interest, setInterest] = useState('관심사');
  //로그인 여부 체크
  const checkedLogin = useSelector((state) => state.checkedLogin);

  //페이징 가보자고~
  const [curPage, setCurPage] = useState(1); //현재페이지
  const [totalPage, setTotalPage] = useState(0); //전체 페이지 수
  const [list, setList] = useState(10);//현재 스테이지 수

  // 약정금 기반으로 조회하는 함수
  const handleButtonClick = (event) => {
    if (event.target.value === '전체') {
      setDeposit(event.target.value);
    } else {
      let i = Number(event.target.value);
      setDeposit(i);
    }
    setCurPage(1); //페이지 버튼 클릭시 현재 페이지를 1로 초기화
    setList(10);
    setInterest(interest);
  };
  //관심사 목록기반으로 조회하는 함수
  const selectInterest = (event) => {
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
      setList(list + 10);
    }
  };

//숫자를 천단위마다 쉼표로 끊어서 표시
  const formatNum = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };


  useEffect(() => {
    // 버튼 클릭으로 스테이지 조회하는 구문
    if (deposit === '전체') {
      axios
        .get('/stagelist', {})
        .then((res) => {
          setStage(res.data.PF);
          setRoll(res.data.Roll);
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
          setStage(res.data);
          setTotalPage(Math.ceil(res.data.length / list)); //전체 페이지 수 계산

        })
        .catch((error) => {
          console.log(error);
        });
    }
    //checkedLogin 이 존재한다면
    // 추천테이블 작동 코드 돌아감
    if (checkedLogin) {
      //추천기능 변수와 state
      const token = jwtDecode(Cookies.get('Set-Cookie'));
      const uNo = token.uNo;
      axios
        .get('/recommend', {
          params: {
            uno: uNo
          },
        })
        .then((res) => {
          setRecommend(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [deposit, checkedLogin]);

  //추천테이블 값 뿌리는 스테이트
  const [recommend, setRecommend] = useState([])

  return (
    <>
      {checkedLogin&&
      <RecommendList recommend={recommend} roll={roll}/>
      }

      <h1>스테이지 조회</h1>
      <div>
        <button className={deposit === '전체' ? 'btn-deposit' : 'sel-deposit'} onClick={handleButtonClick} value='전체'>전체
        </button>
        <button className={Number(deposit) === 70 ? 'btn-deposit' : 'sel-deposit'} onClick={handleButtonClick} value='70'>~70만원
        </button>
        <button className={Number(deposit)  === 150 ? 'btn-deposit' : 'sel-deposit'} onClick={handleButtonClick}
                value='150'>100~150만원
        </button>
        <button className={Number(deposit)  === 250 ? 'btn-deposit' : 'sel-deposit'} onClick={handleButtonClick}
                value='250'>200~250만원
        </button>
        <button className={Number(deposit)  === 350 ? 'btn-deposit' : 'sel-deposit'} onClick={handleButtonClick}
                value='350'>280~350만원
        </button>
      </div>

      <div>
        <select className='sel-int' onChange={selectInterest}>
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


      <div className="stage-wrap">
        <div className="stage">
          {stage.slice((curPage - 1) * list, curPage * list)
            .map((value, index) => {
              const rollItem = (roll.filter((item) => item.pfID===value.pfID));
              const formattedDeposit = (value.deposit / 10000).toFixed(0) + '만';
              //내가 참여한 스테이지를 클릭한 경우 찬희언니 페이지로 보내버려
              if (checkedLogin) {
                const token = jwtDecode(Cookies.get('Set-Cookie'));
                const loggedInUno = token.uNo;
                if (interest === '관심사') {
                  return (
                    <div key={index}>
                      {/*startFlag가 대기중일때만 Link동작하게 하는 코드 시작*/}
                      {value.startFlag === '대기중' ? (
                          <Link to={`/stageSelect/${value.pfID}`} style={{textDecoration: "none"}} id="select-stage">
                            <div id="select-deposit">
                              <h3 className="stage-h3">{value.pfName}</h3>
                              <div className='speechImg'>
                                <img src={require('../../component/assert/images/gyemoim_speech.png')} alt="speech"/>
                                <span>{value.interest}</span>
                              </div>
                            </div>
                            <ul className='stageListUl'>
                              {[...Array(Number(value.pfEntry))].map((_, index) => {
                                const receiveTurnIndex = rollItem.findIndex(item => item.receiveTurn === index + 1)
                                const uno = receiveTurnIndex !== -1 ? rollItem[receiveTurnIndex].uno : null
                                return (
                                  <li key={index} id="rec-turn">
                                    {[uno].includes(loggedInUno) ? (
                                      <div onClick={() => window.location.href = `/stage/${value.pfID}`}
                                           style={{cursor: 'pointer'}}>
                                        {uno === null
                                          ? index + 1
                                          : <img src={require('../../component/images/egg002.png')} alt="egg"/>
                                        }
                                      </div>
                                    ) : (
                                      <span>{uno === null
                                        ? index + 1
                                        : <img src={require('../../component/images/egg002.png')} alt="egg"/>
                                      }</span>
                                    )}
                                  </li>
                                )
                              })}
                            </ul>
                            <div id="stage-payInfo">
                              <p>약정금 :<strong>{formattedDeposit}원</strong> | 이율
                                : <strong>{value.pfRate}%</strong></p>
                            </div>
                          </Link>)
                        :
                        // 대기중이 아닐때 보여지는 코드
                        (
                          <div className='stage-ing'>
                            <div>
                            <div id="select-deposit">
                              <h3 className="stage-h3">{value.pfName}</h3>
                              <div className='speechImg'>
                                <img src={require('../../component/assert/images/gyemoim_speech.png')} alt="speech"/>
                                <span>{value.interest}</span>
                              </div>
                            </div>
                            <div id="stage-payInfo">
                              <p>약정금 :<strong>{formattedDeposit}원</strong> | 이율 : <strong>{value.pfRate}%</strong></p>
                            </div>
                          </div>
                            <div className='all-attend'>
                              <p>전원 참여</p>
                              <p>스테이지 진행중입니다</p>
                            </div>
                          </div>
                        )}
                      {/*startFlag가 대기중일때만 Link동작하게 하는 코드 끝*/}
                    </div>)
                } else if (value.interest === interest) {
                  return (
                    <div key={index}>
                      {/*startFlag가 대기중일때만 Link동작하게 하는 코드 시작*/}
                      {value.startFlag === '대기중' ? (
                          <Link to={`/stageSelect/${value.pfID}`} style={{textDecoration: "none"}} id="select-stage">
                            <div id="select-deposit">
                              <h3 className="stage-h3">{value.pfName}</h3>
                              <div className='speechImg'>
                                <img src={require('../../component/assert/images/gyemoim_speech.png')} alt="speech"/>
                                <span>{value.interest}</span>
                              </div>
                            </div>

                            <ul className='stageListUl'>
                              {[...Array(Number(value.pfEntry))].map((_, index) => {
                                const receiveTurnIndex = rollItem.findIndex(item => item.receiveTurn === index + 1)
                                const uno = receiveTurnIndex !== -1 ? rollItem[receiveTurnIndex].uno : null
                                return (
                                  <li key={index} id="rec-turn">
                                    {uno === null
                                      ? index + 1
                                      : <img src={require('../../component/images/egg002.png')} alt="egg"/>
                                    }
                                  </li>
                                )
                              })}
                            </ul>

                            <div id="stage-payInfo">
                              <p>약정금 :<strong>{formattedDeposit}원</strong> | 이율 : <strong>{value.pfRate}%</strong></p>
                            </div>
                          </Link>
                        )
                        :
                        // 대기중이 아닐때 보여지는 코드
                        (<div className='stage-ing'>
                          <div id="select-deposit">
                            <h3 className="stage-h3">{value.pfName}</h3>
                            <div className='speechImg'>
                              <img src={require('../../component/assert/images/gyemoim_speech.png')} alt="speech"/>
                              <span>{value.interest}</span>
                            </div>
                          </div>
                          <div className='all-attend'>
                            <p>전원 참여</p>
                            <p>스테이지 진행중입니다</p>
                          </div>
                          <div id="stage-payInfo">
                            <p>약정금 :<strong>{formattedDeposit}원</strong> | 이율 : <strong>{value.pfRate}%</strong></p>
                          </div>
                        </div>)}
                      {/*startFlag가 대기중일때만 Link동작하게 하는 코드 끝*/}
                    </div>)}
                }
              //로그인 안되었을경우
              else {
                if (interest === '관심사') {
                  return (
                    <div key={index}>
                      {/*startFlag가 대기중일때만 Link동작하게 하는 코드 시작*/}
                      {value.startFlag === '대기중' ? (
                          <Link to={`/stageSelect/${value.pfID}`} style={{textDecoration: "none"}} id="select-stage">
                            <div id="select-deposit">
                              <h3 className="stage-h3">{value.pfName}</h3>
                              <div className='speechImg'>
                                <img src={require('../../component/assert/images/gyemoim_speech.png')} alt="speech"/>
                                <span>{value.interest}</span>
                              </div>
                            </div>
                            <ul className='stageListUl'>
                              {[...Array(Number(value.pfEntry))].map((_, index) => {
                                const receiveTurnIndex = rollItem.findIndex(item => item.receiveTurn === index + 1)
                                const uno = receiveTurnIndex !== -1 ? rollItem[receiveTurnIndex].uno : null
                                return (
                                  <li key={index} id="rec-turn">
                                    {uno === null
                                      ? index + 1
                                      : <img src={require('../../component/images/egg002.png')} alt="egg"/>
                                    }
                                  </li>
                                )
                              })}
                            </ul>
                            <div id="stage-payInfo">
                              <p>약정금 :<strong>{formattedDeposit}원</strong> | 이율
                                : <strong>{value.pfRate}%</strong></p>
                            </div>
                          </Link>
                        )
                        :
                        // 대기중이 아닐때 보여지는 코드
                        (<div className='stage-ing'>
                          <div id="select-deposit">
                            <h3 className='stage-h3'>{value.pfName}</h3>
                            <div className='speechImg'>
                              <img src={require('../../component/assert/images/gyemoim_speech.png')} alt="speech"/>
                              <span>{value.interest}</span>
                            </div>
                          </div>
                          <div className='all-attend'>
                            <p>전원 참여</p>
                            <p>스테이지 진행중입니다</p>
                          </div>
                          <div id="stage-payInfo">
                            <p>약정금 :<strong>{formattedDeposit}원</strong> | 이율 : <strong>{value.pfRate}%</strong></p>
                          </div>
                        </div>)}
                      {/*startFlag가 대기중일때만 Link동작하게 하는 코드 끝*/}
                    </div>)
                } else if (value.interest === interest) {
                  return (
                    <div key={index}>
                      {/*startFlag가 대기중일때만 Link동작하게 하는 코드 시작*/}
                      {value.startFlag === '대기중' ? (
                          <Link to={`/stageSelect/${value.pfID}`} style={{textDecoration: "none"}} id="select-stage">
                            <div id="select-deposit">
                              <h3 className="stage-h3">{value.pfName}</h3>
                              <div className='speechImg'>
                                <img src={require('../../component/assert/images/gyemoim_speech.png')} alt="speech"/>
                                <span>{value.interest}</span>
                              </div>
                            </div>

                            <ul className='stageListUl'>
                              {[...Array(Number(value.pfEntry))].map((_, index) => {
                                const receiveTurnIndex = rollItem.findIndex(item => item.receiveTurn === index + 1)
                                const uno = receiveTurnIndex !== -1 ? rollItem[receiveTurnIndex].uno : null
                                return (
                                  <li key={index} id="rec-turn">
                                    {uno === null
                                      ? index + 1
                                      : <img src={require('../../component/images/egg002.png')} alt="egg"/>
                                    }
                                  </li>
                                )
                              })}
                            </ul>

                            <div id="stage-payInfo">
                              <p>약정금 :<strong>{formattedDeposit}원</strong> | 이율 : <strong>{value.pfRate}%</strong></p>
                            </div>
                          </Link>
                        )
                        :
                        // 대기중이 아닐때 보여지는 코드
                        (<div className='stage-ing'>
                          <div id="select-deposit">
                            <h3 className="stage-h3">{value.pfName}</h3>
                            <div className='speechImg'>
                              <img src={require('../../component/assert/images/gyemoim_speech.png')} alt="speech"/>
                              <span>{value.interest}</span>
                            </div>
                          </div>
                          <div className='all-attend'>
                            <p>전원 참여</p>
                            <p>스테이지 진행중입니다</p>
                          </div>
                          <div id="stage-payInfo">
                            <p>약정금 :<strong>{formattedDeposit}원</strong> | 이율 : <strong>{value.pfRate}%</strong></p>
                          </div>
                        </div>)}
                      {/*startFlag가 대기중일때만 Link동작하게 하는 코드 끝*/}
                    </div>)
                }

              }

          })}
        </div>
        <p className='more-stage'>
          <button className='more-stage-btn' onClick={() => handlePageClick({target: {value: curPage}})}> 스테이지 더보기
          </button>
        </p>
      </div>

    </>
  );
}


export default StageList;
