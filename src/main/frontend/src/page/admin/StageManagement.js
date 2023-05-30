import {Link} from "react-router-dom";

const StageManagement = () => {

  return (
    <>
      <h1>스테이지 관리 페이지</h1>

      <Link to={`detail`}>스테이지 디테일</Link>
      {/*<Link to={`admin/stage/detail/${value.pfID}`}></Link>*/}
    </>
  );
};

export default StageManagement;