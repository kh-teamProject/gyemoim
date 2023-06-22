import React from "react";
import {Link} from "react-router-dom";

import classes from '../../../page/css/StageList.modlue.css';

const RecommendList = ({recommend, roll}) => {
  const name = recommend.length > 0 ? recommend[0].name : '';
  return (
    <div>
      <h2>{name}님을 위한 추천 계모임</h2>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        {recommend
          .map((value, index) => {
            const rollItem = (roll.filter((item) => item.pfID === value.pfID));
            const formattedDeposit = (value.deposit / 10000).toFixed(0) + '만';
            return (
              <div key={index}>
                <Link to={`/stageSelect/${value.pfID}`} style={{textDecoration: "none"}} id="select-stage">
                  <div id="select-deposit">
                    <h3 className="stage-h3">{value.pfName}</h3>
                    <div className='speechImg'>
                      <img src={require('../../assert/images/gyemoim_speech.png')} alt="speech"/>
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
                            : <img src={require('../../images/egg002.png')} alt="egg"/>
                          }
                        </li>
                      );
                    })}
                  </ul>
                  <div id="stage-payInfo">
                    <p>약정금 :<strong>{formattedDeposit}원</strong> | 이율 : <strong>{value.pfRate}%</strong></p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecommendList;