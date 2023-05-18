package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.BankHistoryDTO;
import com.team.gyemoim.dto.InterestDTO;
import com.team.gyemoim.dto.MyPageDTO;
import com.team.gyemoim.vo.MyAccount;
import com.team.gyemoim.vo.MyAccountHistory;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface AccountMapper {

  // Create
  // 계모임 계좌 잔액 충전 이력 저장
  void deposit(BankHistoryDTO bankHistoryDTO);

  // Reade
  // 내 정보 불러오기
  HashMap<String, Object> getMyInfo(Integer uNo);

  // 비밀번호 체크를 위한 가져오기
  String getPassword(Integer uNo);

  // 계모임 계좌 정보 가져오기
  List<MyAccount> getMyAccount(Integer uNo);

  // Update
  // 내 정보 수정하기
  void myInfoModify(MyPageDTO dto);

  // 관심사 수정
  void interestUpdate(InterestDTO interestDTO);

  // 계모임 계좌 정보 수정
  void myAccountUpdate(BankHistoryDTO bankHistoryDTO);

  // 내 계모임 계좌 거래내역 가져오기
  List<MyAccountHistory> getMyAccountHistory(Integer uNo);

  // Delete



}