package com.team.gyemoim.service;

import com.team.gyemoim.dto.BankHistoryDTO;
import com.team.gyemoim.dto.InterestDTO;
import com.team.gyemoim.dto.MyPageDTO;
import com.team.gyemoim.mapper.AccountMapper;
import com.team.gyemoim.vo.ExpenditureVO;
import com.team.gyemoim.vo.MyAccountVO;
import com.team.gyemoim.vo.MyAccountHistoryVO;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

  private final AccountMapper accountMapper;
  private final PasswordEncoder passwordEncoder;


  // Create
  // 계모임 계좌에 잔액 충전 이력저장
  @Override
  public void deposit(BankHistoryDTO bankHistoryDTO) {
    accountMapper.deposit(bankHistoryDTO);
  }

  // 계모임 계좌 개설
  @Override
  public void createMyAccount(MyPageDTO dto) {
    List<MyAccountVO> myAccountList = accountMapper.getMyAccount(dto.getUNo());
    if (myAccountList.isEmpty()) {
      accountMapper.createMyAccount(dto);
    }
  }

  // 지출목록 생성
  @Override
  public void createExpenditure(MyPageDTO dto) {
    List<ExpenditureVO> expenditureList = accountMapper.getExpenditure(dto.getUNo());
    if (expenditureList.isEmpty()) {
      accountMapper.createExpenditure(dto);
    }
  }

  // Read
  // 내 정보 가져오기
  @Override
  public HashMap<String, Object> getMyInfo(Integer uNo) {
    return accountMapper.getMyInfo(uNo);
  }

  // 비밀번호 확인을위한 정보 가져오기
  @Override
  public String getPassword(Integer uNo) {
    return accountMapper.getPassword(uNo);
  }

  // 계모임 계좌 정보 가져오기
  public List<MyAccountVO> getMyAccount(Integer uNo) {
    return accountMapper.getMyAccount(uNo);
  }

  // 내 계모임 계좌 거래내역 가져오기
  @Override
  public List<MyAccountHistoryVO> getMyAccountHistory(Integer uNo) {
    return accountMapper.getMyAccountHistory(uNo);
  }

  // 지출 데이터 있는지 확인
  @Override
  public List<ExpenditureVO> getExpenditure(Integer uNo) {
    return accountMapper.getExpenditure(uNo);
  }

  // 비밀번호 체크
  @Override
  public boolean checkedPwd(Integer uNo, String password) {
    String dbPassword = accountMapper.checkedPwd(uNo, password);
    return passwordEncoder.matches(password, dbPassword);
  }

  // Update
  @Override
  public void myInfoModify(MyPageDTO myPageDTO) {
    accountMapper.myInfoModify(myPageDTO);
  }

  // 내 관심사 수정하기
  @Override
  public void interestUpdate(InterestDTO interestDTO) {
    accountMapper.interestUpdate(interestDTO);
  }

  // 계모임 계좌 정보 수정
  @Override
  public void myAccountUpdate(BankHistoryDTO bankHistoryDTO) {
    accountMapper.myAccountUpdate(bankHistoryDTO);
  }

  // 지출 내역 수정
  @Override
  public void updateExpenditure(MyPageDTO dto) {
    accountMapper.updateExpenditure(dto);
  }

  // Delete

  // 회원 탈퇴
  @Override
  public void memberDelete(Integer uNo) {
    accountMapper.memberDelete(uNo);
  }

}
