package com.team.gyemoim.service;


import com.team.gyemoim.dto.HomeListDTO;

import java.util.List;

public interface HomeService {

 List<HomeListDTO> getPfHomeList();
 List<HomeListDTO> getPfRollList();
}
