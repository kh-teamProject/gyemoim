import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Paging from "../../component/Paging";
import classes from "../css/admin/AccountManagement.module.css";

const AccountManagement = () => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const [memberInfo, setMemberInfo] = useState([]);
  const [totalMemberCount, setTotalMemberCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("");

  useEffect(() => {
    axios
      .get("/getMember")
      .then((res) => {
        setMemberInfo(res.data);
      })
      .catch((error) => {
        console.log("회원관리 페이지 에러" + error);
      });
  }, [searchType]);

  useEffect(() => {
    axios
      .get("/getTotalMember")
      .then((res) => {
        setTotalMemberCount(res.data);
      })
      .catch((error) => {
        console.log("총 회원 수 가져오기 에러" + error);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [roleFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, setSearchType]);

  const getDataForCurrentPage = () => {
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

  const Search = async (searchType, searchKeyword) => {
    await axios
      .get(`/searchMember`, {
        params: {
          searchType: searchType,
          searchKeyword: searchKeyword,
        },
      })
      .then((res) => {
        setMemberInfo(res.data);
      })
      .catch((error) => {
        console.log("검색 에러:", error);
      });
  };

  const changeSearchType = (e) => {
    setSearchType(e.target.value);
    if (e.target.value === "") {
      setMemberInfo([]);
    }
  };

  const changeSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    Search(searchType, searchKeyword);
  };

  return (
    <>
      <h1>회원 리스트</h1>
      <p className={classes.memberTotal}>총 회원 수 : {totalMemberCount}명</p>
      <div className={classes.roleOption}>
        <select value={roleFilter || undefined} onChange={handleMembershipFilter}>
          <option value="">전체</option>
          <option value="가회원">가회원</option>
          <option value="정회원">정회원</option>
          <option value="관리자">관리자</option>
        </select>
      </div>
      <div className={classes.searchMember}>
        <select value={searchType || undefined} onChange={changeSearchType}>
          <option value="">검색 옵션 선택</option>
          <option value="uNo">회원번호</option>
          <option value="email">이메일</option>
          <option value="name">이름</option>
        </select>
        <span>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchKeyword}
            onChange={changeSearchKeyword}
          />
        </span>
        <button type="button" onClick={handleSearch}>
          검색
        </button>
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