package com.team.gyemoim.service;


import com.team.gyemoim.dto.HomeListDTO;
import com.team.gyemoim.dto.HomeNoticeDTO;

import java.util.List;

public interface HomeService {

 List<HomeListDTO> getPfHomeList();
 List<HomeListDTO> getPfRollList();

 Integer getAllPfList();
 Integer getAllWaitingPfList();

 Integer getAllPartPfList();

 Integer getAllCompletePfList();

 List<HomeNoticeDTO> getNoticeHomeList();
}
