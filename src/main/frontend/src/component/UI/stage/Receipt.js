import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Receipt = () => {
  const [receiptData, setReceiptData] = useState([]);

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await axios.get('/Receipt?pfRate=${pfRate}');
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

export default Receipt;