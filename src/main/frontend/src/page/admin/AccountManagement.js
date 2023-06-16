import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

import Paging from "../../component/Paging";
import classes from "../css/admin/AccountManagement.module.css";

const AccountManagement = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const [memberInfo, setMemberInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지당 아이템 수
  const [roleFilter, setRoleFilter] = useState(null); // 가회원/정회원/관리자 필터

  useEffect(() => {
    axios
        .get("/getMember")
        .then((res) => {
          console.log(res.data);
          setMemberInfo(res.data);
        })
        .catch((error) => {
          console.log("회원관리 페이지 에러" + error);
        });
  }, []);

  useEffect(() => {
    // Reset current page when membership filter changes
    setCurrentPage(1);
  }, [roleFilter]);

  const getDataForCurrentPage = () => {
    // Apply membership filter if set
    const filteredMembers = roleFilter
        ? memberInfo.filter((member) => member.userRole === roleFilter)
        : memberInfo;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMembers.slice(startIndex, endIndex);
  };

  const pageChangeHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMembershipFilter = (event) => {
    setRoleFilter(event.target.value);
  };

  return (
      <>
        <h1>회원 리스트</h1>
        <div className={classes.roleOption}>
          <select value={roleFilter} onChange={handleMembershipFilter}>
            <option value="">전체</option>
            <option value="가회원">가회원</option>
            <option value="정회원">정회원</option>
            <option value="관리자">관리자</option>
          </select>
        </div>
        <table className={`${classes["detailsInquiry-table"]}`}>
          <colgroup>
            <col style={{ width: "9%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
          <tr>
            <th>회원번호</th>
            <th>이메일</th>
            <th>이름</th>
            <th>회원구분</th>
            <th>가입날짜</th>
            <th>탈퇴여부</th>
            <th>/</th>
          </tr>
          </thead>
          <tbody>
          {getDataForCurrentPage().map((value) => (
              <tr key={value.uno}>
                <td>{value.uno}</td>
                <td>{value.email}</td>
                <td>{value.name}</td>
                <td>{value.userRole}</td>
                <td>
                  {new Date(value.enrollDate).toLocaleString("ko-KR", options)}
                </td>
                <td>{value.isLeave}</td>
                <td>
                  <NavLink to={"/admin/account/modify/" + value.uno}>
                    수정하기
                  </NavLink>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        <Paging
            page={currentPage}
            itemsCountPerPage={itemsPerPage}
            count={memberInfo.length}
            onChange={pageChangeHandler}
        />
      </>
  );
};

export default AccountManagement;