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

import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";


const OneReceipt = ({ selectedRollData }) => {
  const [receiptData, setReceiptData] = useState([]);

  const location = useLocation();
  const pfIDNum = location.pathname.split('/');

  let userRole;
  let uNo;
  /* 로그인 상태일때만 토큰 생성 */
            if (Cookies.get('Set-Cookie') !== undefined) {
            const token = Cookies.get("Set-Cookie");
            uNo = jwtDecode(token).uNo;
            userRole = jwtDecode(token).userRole;
            }
//            else{
//                 alert('로그인이 필요합니다.');
//                 }


  const [selectedButton, setSelectedButton] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const pfID = pfIDNum[pfIDNum.length - 1];

    axios
      .get('/Receipt', {
        params: {
          pfID: pfID,
        },
      })
      .then((res) => {
        const receiptData = res.data.receipt.filter((item) => item.receiveTurn === selectedRollData.receiveTurn);
        setReceiptData(receiptData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedRollData]);

  const checkedLogin = useSelector((state) => state.checkedLogin);


     const handleClick = (value) => {
          setSelectedButton(value);
          const pfID = pfIDNum[pfIDNum.length - 1];
          console.log("userRole = " + userRole);

          axios.post('/stageIn', null, {
            params: {
              uNo: uNo,
              receiveTurn: value,
              pfID: pfID
            }
          })
            .then(response => {
                 navigate('/stage/' + pfID);
            })
            .catch((error) => {
              // 에러 처리
              console.log("axios error = " + error.message);
            });


          };


  return (
    <TableContainer component={Paper}>
      <div style={{ marginTop: '16px' }}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>
                순번
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>
                월 입금액
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>
                총 입금액
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>
                실 지급금
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>
                적용 이율
              </TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#F0F0F0' }}>
                실 이자
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receiptData.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.receiveTurn}</TableCell>
                <TableCell align="center">{item.upayment}</TableCell>
                <TableCell align="center">{item.utotalPayment}</TableCell>
                <TableCell align="center">{item.utotalReceipts}</TableCell>
                <TableCell align="center">{item.urate}</TableCell>
                <TableCell align="center">{item.ureceipt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginRight: '50px' }}>
        {receiptData.map((item, index) => (
         (userRole == '정회원' || userRole == '관리자'  ? (<button
                                         key={index}
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
                                           onClick={() => handleClick(item.receiveTurn)}
                                           >
                                               참여하기
                                         </button>) : <></>)

      ))}
          </div>
          <div style={{ marginTop: '20px' }}></div>
    </TableContainer>
  );
}

export default OneReceipt;