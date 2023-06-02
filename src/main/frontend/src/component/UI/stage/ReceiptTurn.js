import classes from "../../css/ReceiptTurn.module.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const ReceiptBut = () => {
  return (
      <div className="PartiNum">
        <div className={classes.PartiNum}>
          <div className="stageSelectOrder">
            <div className={classes.stageSelectOrder}>
              <div>참여 순번을 선택해 주세요.</div>
              <p>회원님의 참여 가능 번호 중에서 참여하실 번호를 클릭해주세요.</p>
              <div className="stageAttendList">
                <span style={ {color : '#0d6efd', fontSize : '45px', letterSpacing : '10px', lineHeight : '200%'} }>①</span>
                <span style={ {color : '#0d6efd', fontSize : '45px', letterSpacing : '10px', lineHeight : '200%'} }>②</span>
                <span style={ {color : '#0d6efd', fontSize : '45px', letterSpacing : '10px', lineHeight : '200%'} }>③</span>
                <span style={ {color : '#0d6efd', fontSize : '45px', letterSpacing : '10px', lineHeight : '200%'} }>④</span>
                <span style={ {color : '#0d6efd', fontSize : '45px', letterSpacing : '10px', lineHeight : '200%'} }>⑤</span>
                <span style={ {color : '#0d6efd', fontSize : '45px', letterSpacing : '10px', lineHeight : '200%'} }>⑥</span>
                <span style={ {color : '#0d6efd', fontSize : '45px', letterSpacing : '10px', lineHeight : '200%'} }>⑦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}



const ReceiptT = () => {
  const [receiptData, setReceiptData] = useState([]);

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await axios.get('/Receipt?pfRate=1.86'); // 변경: 실제 API 엔드포인트 URL로 대체
        const { data } = response;
        setReceiptData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReceiptData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">순번</TableCell>
            <TableCell align="center">월 입금액</TableCell>
            <TableCell align="center">총 입금액</TableCell>
            <TableCell align="center">실 지급금</TableCell>
            <TableCell align="center">적용 이율</TableCell>
            <TableCell align="center">실 이자</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {receiptData.map((row) => (
            <TableRow key={row.receiveTurn}>
              <TableCell align="center">{row.receiveTurn}</TableCell>
              <TableCell align="center">{row.uPayment}</TableCell>
              <TableCell align="center">{row.uTotalPayment}</TableCell>
              <TableCell align="center">{row.uTotalReceipts}</TableCell>
              <TableCell align="center">{row.pfRate}</TableCell>
              <TableCell align="center">{row.uInterest}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


const ReceiptTurn = () => {
  return (
  <>
    <ReceiptBut/>
    <ReceiptT/>
  </>
  );
}



export default ReceiptTurn;