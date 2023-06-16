import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useLocation} from "react-router-dom";
import classes from "../../css/ReceiptTurn.module.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OneReceipt from '../../UI/stage/OneReceipt';


const ReceiptTurn = () => {
  const [pf, setPf] = useState([]);
  const [pfData, setPfData] = useState({});
  const [partiData, setPartiData] = useState([]);
  const [roll, setRoll] = useState([]);
  const [rollData, setRollData] = useState([]);


  const [pfEntry, setPfEntry] = useState('');
  const [parti, setParti] = useState([]);
  const [partRoll, setPartRoll] = useState([]);


  const [turnRoll, setTurnRoll] = useState([]);

  const [selectedTurn, setSelectedTurn] = useState(null);
  const [selectedRollData, setSelectedRollData] = useState(null);

  console.log('pfEntry  : ', pfEntry);
  console.log('parti  : ', parti);
  console.log('partRoll  : ', partRoll);

  console.log('turnRoll  : ', turnRoll);

  const location = useLocation();
  const pfIDNum = location.pathname.split('/');
  const pfID = pfIDNum[pfIDNum.length - 1];
  useEffect(() => {
    axios.get('/Parti', {
      params: {
        pfID :pfID
      }
    })
     .then((res) => {
            console.log(res.data);
            setPf(res.data.pf);
            setRoll(res.data.roll);

            setPartRoll(res.data.partiRoll);
            setParti(res.data.parti);

            setTurnRoll(res.data.turnRoll);


            const pfEntryItem = res.data.parti.map((item) => item.pfEntry);
            const pfEntry = pfEntryItem.join(' ');
            setPfEntry(pfEntry);


            const pfNameList = res.data.pf.map((item) => item.pfName);
            const pfEntryList = res.data.pf.map((item) => item.pfEntry);
            const depositList = res.data.pf.map((item) => item.deposit);
            const receiveTurnList = res.data.pf.map((item) => item.receiveTurn);

            setPfData({
                 ...res.data.pf[0]
            });

            const unoList = res.data.parti.map((item) => item.uno);

            const partiData = {
              uno: unoList.join('')
            };
            setPartiData(partiData);


            const RollData = {

            };
            setRollData(rollData);

          })
          .catch((error)=>{
            console.log(error);
          });

       }, []);

       const handleClickTurn = (index) => {
           const receiveTurnIndex = turnRoll.findIndex((item) => item.receiveTurn === index + 1);
           if (receiveTurnIndex !== -1) {
             const selectedRollData = turnRoll[receiveTurnIndex];
             setSelectedTurn(index + 1);
             setSelectedRollData(selectedRollData);
           }
         };
    return (
        <div class="stage-wrap" >
         <div style={{ marginTop: '50px' }}>
          </div>
           <div className={classes.stageSelectOrder}>
            <div>참여 순번을 선택해 주세요.</div>
             <p>회원님의 참여 가능 번호 중에서 참여하실 번호를 클릭해주세요.</p>
           </div>
           <div style={{ marginTop: '20px' }}></div>
           <ul className={classes.memberOrder}>
             {Array.from({ length: pfEntry }, (_, index) => {
               const receiveTurnIndex = partRoll.findIndex((item) => item.receiveTurn === index + 1);
               const name =
                 receiveTurnIndex !== -1 ? partRoll[receiveTurnIndex].name : '●';

                 const selectedClass = selectedTurn === index + 1 ? classes.selected : '';

               return (
                 <li
                   key={index}
                   className={`${classes.memList} ${selectedClass}`}
                   onClick={() => handleClickTurn(index)}
                 >
                   <span>
                   { name === '●'
                       ? <>
                       {index + 1}
                       </>
                       : <>
                       ●
                       </>
                   }
                   </span>
                 </li>
               );
             })}
       </ul>
       <div style={{ marginTop: '30px' }}></div>
       <OneReceipt selectedRollData={selectedRollData} />
       </div>
   );
}

export default ReceiptTurn;