import {useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import { PDFViewer, Document, Page, View , Text, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: 'SpoqaHanSans_R',
  src:
    'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansRegular.ttf',
});
Font.register({
  family: 'SpoqaHanSans_L',
  src:
    'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
});

const StageReport = (props) => {
    const token = jwtDecode(Cookies.get('Set-Cookie'));
    const uNo = token.uNo;

    const [pf, setPf] = useState([]);
    const [roll, setRoll] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [member, setMember] = useState([]);

    const [pfData, setPfData] = useState([]);
    const [rollData, setRollData] = useState([]);
    const [memData, setMemData] = useState([]);

    const location = useLocation();
    const pfIDNum = location.pathname.split('/');

   useEffect(() => {
      axios.get('/StageReport', {
        params: {
          uNo: uNo,
          pfID: pfIDNum[pfIDNum.length -1]
        }
      })
        .then((res) => {
        setPf(res.data.pf);
        setRoll(res.data.roll);
        setSchedule(res.data.import);
        setMember(res.data.memberInfo);

        //pfData
        const depositList = res.data.pf.map((item) => item.deposit);
        const pfNameList = res.data.pf.map((item) => item.pfName);
        const startDateList = res.data.pf.map((item) => {
          const startDateData = moment(item.startDate).format('YYYY.MM.DD');
          return startDateData;
        });
        const endDateList = res.data.pf.map((item) => {
          const endDateData = moment(item.endDate).format('YYYY.MM.DD');
          return endDateData;
        });
        const depositWithComma = depositList
          .map((value) => (value / 10000).toFixed(0) + '만')
          .toString()
          .replace(/\B(?=(\d{4})+(?!\d))/g, ',');
        const pfRateList = res.data.pf.map((item) => item.pfRate);
        const pfEntryList = res.data.pf.map((item) => item.pfEntry);
        const stageBalanceList = res.data.pf.map((item) => item.stageBalance);

        const pfData = {
        deposit: depositWithComma,
        pfRate: pfRateList.join(''),
        pfName: pfNameList.join(''),
        startDate: startDateList.join(''),
        endDate: endDateList.join(''),
        pfEntry: pfEntryList.join(''),
        stageBalance: stageBalanceList.join('')
        };
        setPfData(pfData);

        //rollData
        const RollDepositCnt = res.data.roll.map((item) => item.depositCnt);
        const RollUno = res.data.roll.map((item) => item.uno);
        const RollReceiveTurn = res.data.roll.map((item) => item.receiveTurn);
        const RollUPayment = res.data.roll.map((item) => item.upayment);
        const RollMyBalance = res.data.roll.map((item) => item.myBalance);
        const RollPaymentCheck = res.data.roll.map((item) => item.paymentCheck);
        const RollUTotalReceipts = res.data.roll.map((item) => item.utotalReceipts);
        const RollUTotalReceiptsWithComma = RollUTotalReceipts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        const RollUTotalPayment = res.data.roll.map((item) => item.utotalPayment);
        const RollRollUTotalPaymentWithComma = RollUTotalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")


        const rollData = {
        depositCnt: RollDepositCnt.join(''),
        uNo: RollUno.join(''),
        receiveTurn: RollReceiveTurn.join(''),
        uPayment: RollUPayment.join(''),
        myBalance: RollMyBalance.join(''),
        paymentCheck: RollPaymentCheck.join(''),
        uTotalReceipts: RollUTotalReceiptsWithComma,
        uTotalPayment: RollRollUTotalPaymentWithComma
        };
        setRollData(rollData);

        //memData
        const MemName = res.data.memberInfo.map((item) => item.name);
        const MemEmail = res.data.memberInfo.map((item) => item.email);
        const MemPhone = res.data.memberInfo.map((item) => item.phone);
        const MemEnrollDate = res.data.memberInfo.map((item) => {
          const enrollDateData = moment(item.enrollDate).format('YYYY.MM.DD');
          return enrollDateData;
        });
        const memData = {
        name: MemName.join(''),
        email: MemEmail.join(''),
        phone: MemPhone.join(''),
        enrollDate: MemEnrollDate.join('')
        };
        setMemData(memData);
        })


        .catch((error) => {
          console.log(error);

        });
    }, []);


  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={[styles.bold, styles.title]}>결산보고서</Text>

          //회원정보 테이블
          <Text style={[styles.light, styles.tableDiv]}>{'<'}회원 정보{'>'}</Text>
           <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.tableGray]}>
                      <Text style={[styles.tableCell, styles.light]}>이름</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={[styles.tableCell, styles.light]}>{memData.name}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableGray]}>
                      <Text style={[styles.tableCell, styles.light]}>이메일</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={[styles.tableCell, styles.light]}>{memData.email}</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.tableGray]}>
                      <Text style={[styles.tableCell, styles.light]}>전화번호</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={[styles.tableCell, styles.light]}>{memData.phone}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableGray]}>
                      <Text style={[styles.tableCell, styles.light]}>가입일</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={[styles.tableCell, styles.light]}>{memData.enrollDate}</Text>
                    </View>
                  </View>
           </View>

           // 스테이지 정보
          <Text style={[styles.light, styles.tableDiv, styles.gap]}>{'<'}스테이지 정보{'>'}</Text>
          <View style={styles.table}>
                 <View style={styles.tableRow}>
                   <View style={[styles.tableCol, styles.tableGray]}>
                     <Text style={[styles.tableCell, styles.light]}>스테이지 이름</Text>
                   </View>
                   <View style={styles.tableThreeCol}>
                     <Text style={[styles.tableCell, styles.light]}>{pfData.pfName}</Text>
                   </View>
                 </View>

                 <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.tableGray]}>
                      <Text style={[styles.tableCell, styles.light]}>스테이지 기간</Text>
                    </View>
                    <View style={styles.tableThreeCol}>
                      <Text style={[styles.tableCell, styles.light]}>{pfData.startDate} ~ {pfData.endDate}</Text>
                    </View>
                 </View>

                 <View style={styles.tableRow}>
                   <View style={[styles.tableCol, styles.tableGray]}>
                     <Text style={[styles.tableCell, styles.light]}>이율(세후)</Text>
                   </View>
                   <View style={styles.tableCol}>
                     <Text style={[styles.tableCell, styles.light]}>{pfData.pfRate}%</Text>
                   </View>
                   <View style={[styles.tableCol, styles.tableGray]}>
                    <Text style={[styles.tableCell, styles.light]}>약정금</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.light]}>{pfData.deposit}원</Text>
                  </View>
                 </View>

                 <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.tableGray]}>
                  <Text style={[styles.tableCell, styles.light]}>참여 인원</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={[styles.tableCell, styles.light]}>{pfData.pfEntry}명</Text>
                </View>
                <View style={[styles.tableCol, styles.tableGray]}>
                 <Text style={[styles.tableCell, styles.light]}>나의 순번</Text>
               </View>
               <View style={styles.tableCol}>
                 <Text style={[styles.tableCell, styles.light]}>{rollData.receiveTurn}번</Text>
               </View>
              </View>
                <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.tableGray]}>
                  <Text style={[styles.tableCell, styles.light]}>총 입금액</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={[styles.tableCell, styles.light]}>{rollData.uTotalPayment}원</Text>
                </View>
                <View style={[styles.tableCol, styles.tableGray]}>
                 <Text style={[styles.tableCell, styles.light]}>실 지급액</Text>
               </View>
               <View style={styles.tableCol}>
                 <Text style={[styles.tableCell, styles.light]}>{rollData.uTotalReceipts}원</Text>
               </View>
              </View>


          </View>

         // 수익 정보
          <Text style={[styles.light, styles.tableDiv, styles.gap]}>{'<'}수익 정보{'>'}</Text>
          <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, styles.tableGray]}>
                    <Text style={[styles.tableCell, styles.light]}>실 이득</Text>
                  </View>
                  <View style={styles.tableThreeCol}>
                    <Text style={[styles.tableCell, styles.light]}>실이득</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.tableGray]}>
                      <Text style={[styles.tableCell, styles.light]}>수익</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={[styles.tableCell, styles.light]}>12345원</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableGray]}>
                     <Text style={[styles.tableCell, styles.light]}>수익률</Text>
                   </View>
                   <View style={styles.tableCol}>
                     <Text style={[styles.tableCell, styles.light]}>10%</Text>
                   </View>
              </View>
          </View>
          <Text style={[styles.light, styles.tableDiv, styles.gap]}>*예측 은행이자 : </Text>
          <Text style={[styles.light, styles.tableDiv, styles.gap]}>=p* r * ((1+r)^n-1 )</Text>
          <Text style={[styles.light, styles.tableDiv, styles.gap]}>p: 월불입액</Text>
          <Text style={[styles.light, styles.tableDiv, styles.gap]}>r: 이자</Text>
          <Text style={[styles.light, styles.tableDiv, styles.gap]}>n: 기간</Text>

        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
    page: {
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 60,
        backgroundColor: "white",
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        display: "block",
    },
    text: {
        fontSize: 12,
        textAlign: "center",
    },
  viewer: {
    flex: 1,
  },
  bold: {
    fontFamily: 'SpoqaHanSans_R',
  },
  light: {
      fontFamily: 'SpoqaHanSans_L',
    },
  english: {},
  tableDiv:{
    fontSize: 9,
    marginTop: 15,
  },
  table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderTopWidth: 1,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row"
    },
    tableCol: {
      width: "25%",
      padding: "3 0",
      borderStyle: "solid",
      borderBottomWidth: 1,

    },
    tableThreeCol:{
      width: "75%",
      padding: "3 0",
      borderStyle: "solid",
      borderBottomWidth: 1,
    },
    tableCell: {
      margin: "auto",
      fontSize: 11
    },
    tableGray: {
        backgroundColor: "#eee",
    },
    textLeft:{
        textAlign: "left",
    }
});


export default StageReport;
