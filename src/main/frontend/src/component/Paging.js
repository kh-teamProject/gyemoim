import {useState} from "react";
import Pagination from "react-js-pagination";

import './css/Paing.css';

const Paging = ({page, itemsCountPerPage, count, onChange}) => {

  return (
    <>
      <Pagination
        activePage={page}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={onChange}
        itemClass={'page-item'}
        linkClass={'page-link'}
      />
    </>
  );
};

export default Paging;