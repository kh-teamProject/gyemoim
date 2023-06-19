package com.team.gyemoim.mapper;

import com.team.gyemoim.dto.BankHistoryDTO;
import com.team.gyemoim.dto.InterestDTO;
import com.team.gyemoim.dto.MyPageDTO;
import com.team.gyemoim.vo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface AccountMapper {

  // Create
  // 계모임 계좌 잔액 충전 이력 저장
  void deposit(BankHistoryDTO bankHistoryDTO);

  // 정회원으로 변경시 myAccount 계모임계좌 생성
  void createMyAccount(MyPageDTO myPageDTO);

  // Reade
  // 내 정보 불러오기
  HashMap<String, Object> getMyInfo(Integer uNo);

  // 비밀번호 체크를 위한 가져오기
  String getPassword(Integer uNo);

  // 계모임 계좌 정보 가져오기
  List<MyAccountVO> getMyAccount(Integer uNo);

  // 비밀번호 체크
  String checkedPwd(@Param("uNo") Integer uNo, @Param("password") String password);

  List<PFVO> getMyPfList(String startFlag, Integer uNo);

  // Update
  // 내 정보 수정하기
  void myInfoModify(MyPageDTO dto);

  // 관심사 수정
  void interestUpdate(InterestDTO interestDTO);

  // 계모임 계좌 정보 수정
  void myAccountUpdate(BankHistoryDTO bankHistoryDTO);

  // 내 계모임 계좌 거래내역 가져오기
  List<MyAccountHistoryVO> getMyAccountHistory(Integer uNo);



  // Delete

  // 회원 탈퇴
  void memberDelete(Integer uNo);

  void createExpenditure(MyPageDTO dto);

  List<ExpenditureVO> getExpenditure(Integer uNo);

  void updateExpenditure(MyPageDTO dto);

  List<RollVO> getStageRollList(Integer pfID);
}
