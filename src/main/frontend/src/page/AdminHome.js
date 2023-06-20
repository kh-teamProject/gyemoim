import InterestChart from "../component/chart/InterestChart";
import classes from './css/admin/AdminHome.module.css';
import ExpenditureChart from "../component/chart/ExpenditureChart";
import MemberRoleChart from "../component/chart/MemberRoleChart";
import SalesPieChart from "../component/UI/stage/SalesPieChart";

const AdminHome = () => {

  return (
    <>
      <section className={classes.chartWrap}>
        <article className={classes.userRoleChart}>
          <h2>{'<회원 권한 비율>'}</h2>
          <MemberRoleChart/>
        </article>
        <article className={classes.interestChart}>
          <h2>{'<회원 관심사 비율>'}</h2>
          <InterestChart/>
        </article>
        <article className={classes.expenditureChart}>
          <h2>{'<회원 지출내역 평균>'}</h2>
          <ExpenditureChart/>
        </article>
      </section>
      <div>
        <SalesPieChart/>
      </div>
    </>
  );
};

export default AdminHome;