import InterestChart from "../component/chart/InterestChart";
import classes from './css/admin/AdminHome.module.css';
import ExpenditureChart from "../component/chart/ExpenditureChart";

const AdminHome = () => {

  return (
    <>
      <section className={classes.chartWrap}>
        <article className={classes.interestChart}>
          <h2>{'<관심사 비율>'}</h2>
          <InterestChart />
        </article>
        <article className={classes.expenditureChart}>
          <h2>{'<지출내역 평균>'}</h2>
          <ExpenditureChart />
        </article>
      </section>
    </>
  );
};

export default AdminHome;