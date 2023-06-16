import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useLocation} from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Receipt = () => {

  const [pf, setPf] = useState([]);
  const [pfData, setPfData] = useState([]);
  const [receipt, setReceipt] = useState([]);
  const [receiptData, setReceiptData] = useState([]);
  const [receiveTurnList, setReceiveTurnList] = useState([]);

  const location = useLocation();
  const pfIDNum = location.pathname.split('/');

  useEffect(() => {
    console.log(pfIDNum);
    const pfID = pfIDNum[pfIDNum.length - 1];

    axios.get('/Receipt', {
          params: {
            pfID: pfID
          }
        })
        .then((res) => {
          console.log(res.data.pf);
          setPf(res.data.pf);
          console.log(res.data.receipt);
          setReceipt(res.data.receipt);


        const pfData = {
          pfID: pfID
        };
        setPfData(pfData);

        const receiveTurnList = res.data.receipt.map((item) => item.receiveTurn);
        console.log("receiveTurnList 리스트 : " + receiveTurnList);
        setReceiveTurnList(receiveTurnList);

        const upaymentList = res.data.receipt.map((item) => item.upayment);
        const utotalPaymentList = res.data.receipt.map((item) => item.utotalPayment);
        const utotalReceiptsList = res.data.receipt.map((item) => item.utotalReceipts);
        const urateList = res.data.receipt.map((item) => item.urate);
        const ureceiptList = res.data.receipt.map((item) => item.ureceipt);

        const receiptData = res.data.receipt.map((item) => ({
          receiveTurn: item.receiveTurn,
          uPayment: item.upayment,
          utotalPayment: item.utotalPayment,
          utotalReceipts: item.utotalReceipts,
          urate: item.urate,
          ureceipt: item.ureceipt
        }));
        setReceiptData(receiptData);

        })
        .catch((error)=>{
          console.log(error);
        });
  }, []);

  return (
    <TableContainer component={Paper}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', marginRight: '50px' }}>
        <button
          style={{
            border: '1px solid #4169E1',
            height: '46px',
            fontSize: '16px',
            width: '15%',
            fontWeight: 'bold',
            margin: '1px 0',
            transition: 'background-color 0.3s',
            backgroundColor: '#4169E1',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#FFFFFF';
            e.target.style.color = '#4169E1';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#4169E1';
            e.target.style.color = '#FFFFFF';
          }}
        >
          이율표 보기
        </button>
      </div>
      <div style={{ marginTop: '16px' }}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>순번</TableCell>
            <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>월 입금액</TableCell>
            <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>총 입금액</TableCell>
            <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>실 지급금</TableCell>
            <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>적용 이율</TableCell>
            <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>실 이자</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {receiveTurnList.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">{item}</TableCell>
              <TableCell align="center">{receiptData[index].uPayment}</TableCell>
              <TableCell align="center">{receiptData[index].utotalPayment}</TableCell>
              <TableCell align="center">{receiptData[index].utotalReceipts}</TableCell>
              <TableCell align="center">{receiptData[index].urate}</TableCell>
              <TableCell align="center">{receiptData[index].ureceipt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </TableContainer>
  );
};

export default Receipt;
