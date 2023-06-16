import React from "react";
import { Link } from "react-router-dom";

import classes from '../../../page/css/StageList.modlue.css';

const RecommendList = ({ recommend, formatNum }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {recommend
          .reduce((acc, value) => {
            const index = acc.findIndex((item) => item.pfID === value.pfID);
            if (index === -1) {
              acc.push({
                pfName: value.pfName,
                pfID: value.pfID,
                receiveTurn: [{ turn: value.receiveTurn, uno: value.uno }],
                deposit: value.deposit,
                payment: value.payment,
                pfEntry: value.pfEntry,
                startFlag: value.startFlag,
                interest: value.interest
              });
            } else {
              acc[index].receiveTurn.push({ turn: value.receiveTurn, uno: value.uno });
            }
            return acc;
          }, [])
          .map((value, index) => {
            return (
              <div key={index}>
                <Link to={`/test/${value.pfID}`} style={{ textDecoration: "none" }} id="select-stage">
                  <div id="select-deposit">
                    <h3 className="stage-h3">{value.pfName}</h3>
                    <div className='speechImg'>
                      <img src={require('../../assert/images/gyemoim_speech.png')} alt="speech"/>
                      <span>{value.interest}</span>
                    </div>
                  </div>
                  <ul className='stageListUl'>
                    {[...Array(Number(value.pfEntry))].map((_, index) => {
                      const receiveTurnIndex = value.receiveTurn.findIndex((item) => item.turn === index + 1);
                      const uno = receiveTurnIndex !== -1 ? value.receiveTurn[receiveTurnIndex].uno : null;
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
                    <p>
                      약정금 :<strong>{formatNum(Number(value.deposit))}</strong> | 월 입금액 :{" "}
                      <strong>{formatNum(Number(value.payment))}</strong>
                    </p>
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