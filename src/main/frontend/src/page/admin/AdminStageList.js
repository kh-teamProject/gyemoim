import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const AdminStageList = () => {

//스테이지 리스트
const [stageListTable, setStageListTable] = useState([]);

//페이징
const [curPage, setCurPage] = useState(1); //현재페이지
const [totalPage, setTotalPage] = useState(0); //전체 페이지 수
const [list, setList ] = useState(10);//현재 스테이지 수

// 상태
const [startFlag, setStartFlag] = useState();



//페이징 함수
const handlePageClick = (event) => {
const targetPage = Number(event.target.value); //클릭한 페이지
if (targetPage > 0 && targetPage <= totalPage) {
  //클릭한 타겟페이지가 0보다 크고 totalPage보다 작거나 같으면 -> 즉, 클릭한 페이지가 유효범위에 있을때
  setCurPage(targetPage); //현재페이지를 클릭페이지로 설정
  setList(list+10);
}
};

//상태 기반으로 조회 함수
  const selectStartFlag = (event) =>{
    console.log(event.target.value);
    setStartFlag(event.target.value);
    setList(10);
  }

//스테이지 리스트 조회 함수
useEffect(() => {
  try {
    axios
      .get("/admin/stage/list", {})
      .then((res) => {
        console.log(res.data.Stage);
        setStageListTable(res.data.Stage);
        setTotalPage(Math.ceil(res.data.Stage.length / list)); //전체 페이지 수 계산
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}, []);



  return (
    <>
      <h1>스테이지 페이지</h1>

      <h2>스테이지 기본 정보</h2>


                <div>
                <select  onChange={selectStartFlag} >
                  <option value='대기중'>대기중</option>
                  <option value='참여중'>참여중</option>
                  <option value='완료'>완료</option>
                </select>
                </div>

                  <div>
                    <table>

                      <thead>
                      <div>
                        <tr>
                        <td>번호</td>
                        <td>이름</td>
                        <td>약정금</td>
                          <td>등급</td>
                          <td>상태</td>
                          <td>시작일</td>
                          <td>종료일</td>
                        </tr>
                        </div>
                      </thead>

                      <tbody>
                        {stageListTable
                     .filter(value => {
                          if (startFlag === '대기중') {
                            return value.startFlag === '대기중';
                          } else if (startFlag === '참여중') {
                            return value.startFlag === '참여중';
                          } else if (startFlag === '완료') {
                            return value.startFlag === '완료';
                          }
                          return true; // 기본적으로 모든 데이터를 보여주도록 설정
                        })


                        .map((value, index) => (
                        <Link to={`/admin/stage/detail/${value.pfID}`}>
                        <div>
                          <tr key={index}>
                          <td>{value.pfID}</td>
                          <td>{value.pfName}</td>
                          <td>{value.deposit.toLocaleString()}원</td>
                           <td>{value.prank}</td>
                            <td>{value.startFlag}</td>
                           <td>{value.startDate}</td>
                           <td>{value.endDate}</td>
                          </tr>
                          </div>
                          </Link>
                        ))}
                      </tbody>

                    </table>
                     </div>

    </>
  );
};

export default AdminStageList;