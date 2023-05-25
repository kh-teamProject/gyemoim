import {useEffect, useState} from "react";
import axios from "axios";


const AdminStageDetail = () => {

const [stageListTable, setStageListTable] = useState([]);

//페이징
const [curPage, setCurPage] = useState(1); //현재페이지
const [totalPage, setTotalPage] = useState(0); //전체 페이지 수
const [list, setList ] = useState(10);//현재 스테이지 수



//페이징 함수
const handlePageClick = (event) => {
const targetPage = Number(event.target.value); //클릭한 페이지
if (targetPage > 0 && targetPage <= totalPage) {
  //클릭한 타겟페이지가 0보다 크고 totalPage보다 작거나 같으면 -> 즉, 클릭한 페이지가 유효범위에 있을때
  setCurPage(targetPage); //현재페이지를 클릭페이지로 설정
  setList(list+10);
}
};

useEffect(() => {
  try {
    axios
      .get("/admin/stage/detail", {})
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

      <p>스테이지 등급 / 이율 / 시작일 / 종료일(종료되었다면)</p>


                  <div>
                    <table>

                      <thead>
                        <tr>
                        <td>이름</td>
                        <td>약정금</td>
                          <td>등급</td>
                          <td>이율</td>
                          <td>관심사</td>
                          <td>상태</td>
                          <td>시작일</td>
                          <td>종료일</td>
                        </tr>
                      </thead>

                      <tbody>
                        {stageListTable.map((value, index) => (
                          <tr key={index}>
                          <td>{value.pfName}</td>
                          <td>{value.deposit.toLocaleString()}원</td>
                           <td>{value.prank}</td>
                           <td>{value.pfRate}%</td>
                           <td>{value.interest}</td>
                            <td>{value.startFlag}</td>
                           <td>{value.startDate}</td>
                           <td>{value.endDate}</td>
                          </tr>
                        ))}
                      </tbody>

                    </table>
                     </div>

    </>
  );
};

export default AdminStageDetail;