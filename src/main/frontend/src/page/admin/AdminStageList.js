import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "../css/AdminStageList.module.css";

const AdminStageList = () => {
  const [stageListTable, setStageListTable] = useState([]);
  const [startFlag, setStartFlag] = useState("전체");
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const itemsPerPage = 10;


  useEffect(() => {
    try {
      axios
        .get("/admin/stage/list", {})
        .then((res) => {
          console.log(res.data.Stage);
          setStageListTable(res.data.Stage);
          setTotalPage(Math.ceil(res.data.Stage.length / itemsPerPage));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);


  const selectStartFlag = (event) => {
    setStartFlag(event.target.value);
    setCurPage(1);
  };

  const handlePageClick = (event) => {
    const targetPage = Number(event.target.value);
    if (targetPage > 0 && targetPage <= totalPage) {
      setCurPage(targetPage);
    }
  };


  const getCurrentStageList = () => {
    const startIndex = (curPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return stageListTable
      .filter((value) => {
        if (startFlag === "전체") {
         if(value.startFlag === "대기중"){
               value.endDate = "-";
               return true;
               }
        } else if (startFlag === "대기중") {
          return value.startFlag === "대기중";
        } else if (startFlag === "참여중") {
          return value.startFlag === "참여중";
        } else if (startFlag === "완료") {
          return value.startFlag === "완료";
        }
        return true;
      })
      .slice(startIndex, endIndex);
  };


 const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (event, pfID) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedIds((prevIds) => [...prevIds, pfID]);
       console.log(pfID);
    } else {
      setSelectedIds((prevIds) => prevIds.filter((id) => id !== pfID));
        console.log(pfID);
    }
  };

const handleSendData = async () => {
  try {
    const response = await axios.post("/admin/stage/list", null, {
      params: {
        pfID: selectedIds[0],
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
    <div>
      <h2>스테이지 리스트</h2>

    <div className={styles.width}>
     <div  className={styles.head}>

     <div  className={styles.slice2}>
      <button onClick={handleSendData}>일괄처리</button>
     </div>

      <div className={styles.slice}>
        <select onChange={selectStartFlag} >
          <option value="전체">전체</option>
          <option value="대기중">대기중</option>
          <option value="참여중">참여중</option>
          <option value="완료">완료</option>
        </select>
      </div>
      </div>

      <div className={styles.width}>
        <table className={styles.table} style={{width: '100rem'}} >
        <colgroup>
        <col style={{width: '3%'}} />
        <col style={{width: '3%'}} />
         <col style={{width: '10%'}} />
          <col style={{width: '10%'}} />

            <col style={{width: '5%'}} />
             <col style={{width: '10%'}} />
              <col style={{width: '10%'}} />
               <col style={{width: '10%'}} />
        </colgroup>
          <thead>
            <tr>
            <th><input type="checkbox" /></th>
              <th>번호</th>
              <th>이름</th>
              <th>약정금</th>

              <th>상태</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>버튼</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentStageList().map((value, index) => (
              <tr key={index}>
               <td>
               <input type="checkbox"
                         checked={selectedIds.includes(value.pfID)}
                          onChange={(event) =>
                          handleCheckboxChange(event, value.pfID)
                         }
                           />
                 </td>
                <td>{value.pfID}</td>
                <td>{value.pfName}</td>
                <td>{value.deposit.toLocaleString()}원</td>

                <td>{value.startFlag}</td>
                <td>{value.startDate}</td>
                <td>{value.endDate}</td>
                <td>
                  <Link to={`/admin/stage/detail/${value.pfID}`}>
                      <button className={styles.buttonSmall} >상세보기</button>
                   </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.margin1}>
        {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            value={page}
            onClick={handlePageClick}
            className={page === curPage ? styles.buttonPageSelect : ''}
          >
            {page}
          </button>
        ))}
      </div>
      </div>
    </div>
    </>
  );
};

export default AdminStageList;
