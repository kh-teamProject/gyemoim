package com.team.gyemoim.service;

import com.team.gyemoim.dto.BankHistoryDTO;
import com.team.gyemoim.dto.InterestDTO;
import com.team.gyemoim.dto.MyPageDTO;
import com.team.gyemoim.vo.ExpenditureVO;
import com.team.gyemoim.vo.MyAccountVO;
import com.team.gyemoim.vo.MyAccountHistoryVO;

import java.util.HashMap;
import java.util.List;

public interface AccountService {

  // Create
  // 계모임 계좌에 잔액 충전하기
  void deposit(BankHistoryDTO bankHistoryDTO);

  // 회원 지출테이블 데이터 생성
  void createExpenditure(MyPageDTO dto);

  // Read
  // 내 정보 가져오기
  HashMap<String, Object> getMyInfo(Integer uNo);

  // 비밀번호 체크를 위한 가져오기
  String getPassword(Integer uNo);

  // 계모임 계좌 정보 가져오기
  List<MyAccountVO> getMyAccount(Integer uNo);

  // 지출 데이터 있는지 확인
  List<ExpenditureVO> getExpenditure(Integer uNo);

  // Update
  // 내 정보 수정하기
  void myInfoModify(MyPageDTO dto);

  // 내 관심사 수정
  void interestUpdate(InterestDTO interestDTO);

  // 계모임 계좌 정보 수정
  void myAccountUpdate(BankHistoryDTO bankHistoryDTO);

  // 내 계모임 계좌 거래내역 가져오기
  List<MyAccountHistoryVO> getMyAccountHistory(Integer uNo);


  // Delete

  // 회원 탈퇴
  void memberDelete(Integer uNo);

  void updateExpenditure(MyPageDTO dto);
}
