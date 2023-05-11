package com.team.gyemoim;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GyemoimApplicationTests {


	@Test
	void contextLoads() {
	}

/*
	@Test
	void testBoardInsert(){
		String title = "";
		String content = "";
		for(int i = 0;i<50;i++){
			title = "TEST0"+i;
			content = "내용입니다....."+i;
			BoardCreateRequest req = new BoardCreateRequest();
			req.setBid(1234);
			req.setUNo(1);
			req.setTitle(title);
			req.setContent(content);
			service.createBoard(req);
		}

	}
*/


}
