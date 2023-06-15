# ‘계모임 플랫폼’ Project

## Contact & Channels
* <b>프로젝트 소개</b> | 고객 수입/지출 데이터 분석 기반으로 추천 가능한 계모임 플랫폼을 만들어 곗돈을 투명하게 관리하겠다는 계획을 구체화했습니다.
* <b>프로젝트 기간</b> | 2023.05월 ~ 2023.06 (약 30일)
* <b>개발 인원</b> | 민재홍, 김찬희, 권오수, 이현지, 김지연, 이유진, 길현지
* <b>프로젝트 목표</b> | Spring 프레임워크를 기반으로 하여 다양한 기술과 환경에서 실용적인 웹을 개발하는 것을 목표로 하였습니다. 

## 기술활용
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> <img src="https://img.shields.io/badge/jpa-6DB33F?style=for-the-badge&logo=jpa&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
<img src="https://img.shields.io/badge/thymeleaf-005F0F?style=for-the-badge&logo=thymeleaf&logoColor=white"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jQuery&logoColor=white">
<img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white"> <img src="https://img.shields.io/badge/apachetomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/intellijidea-000000?style=for-the-badge&logo=intellijidea&logoColor=white">


계모임에서는 계주 먹튀라는 사례가 흔하게 나오는점을 고려해서 <br/>
돈을 들고 도망갈 수 없는 시스템을 고려하여 시작한 계모임 금융 플팻폼 구현 프로젝트 입니다. <br/><br/>
 `2023.05.01 ~ 2023.06.10` 동안 `Spring Boot` | `React` | `MyBatis` | `Oracle` 을 사용해 구현했습니다..
 
이 프로젝트를 통해 이루고자 한 목표는 `Spring에서 제공하는 프레임워크를 직접 사용해 보기`였습니다.<br/>
프로젝트 구현 과정 동안 로그인 적용 게시판 기능구현과 예외처리를 고민하며 코드를 작성했습니다.



# 📚 목차
* [프로젝트 설치 및 실행방법](#프로젝트-설치-및-실행방법)
* [프로젝트 구조](#-프로젝트-구조)
* [사용 기술](#-사용-기술)
* [구현 기능](#-구현-기능)
* [API 명세서](#-API-명세서)
* [ERD 설계](#-ERD-설계)
* [프로젝트 수행 일정표 WBS](#프로젝트-수행-일정표-wbs)
* [트러블슈팅](#-트러블슈팅)



# 프로젝트 설치 및 실행방법
<br/><br/><br/>



# 🎃 프로젝트 구조
### 📌 Backend
<img width="575" alt="backend-project-structure" src="">

### 🥕 Frontend
<img width="574" alt="frontend-project-structure" src="https://user-images.githubusercontent.com/43202607/183297579-ddaad9a7-3d2b-467f-8519-c639e0feb8f3.png">
<br/><br/><br/>


# 🕹 사용 기술
### 📌 Backend
|기술|버전|
|----|----|
|Java|11|
|Spring Boot|2.7.11|
|Spring Security|2.7.2|
|JSON Web Token(JWT)|0.9.1|
|MyBatis|2.3.0|
|Oracle JDBC Driver|ojdbc8|
|Redis|
|Commons IO|2.11.0|
|Commons FileUpload|1.3.1|
|JAXB API|2.3.1|


<br/>


### 🥕 Frontend
|기술|버전|
|----|----|
|React|18.2.0|
|Axios|1.3.6|
|Moment|2.29.4|
|JWT-Decode|3.1.2|
|Js-Cookie|3.0.5|
|React-DOM|18.2.0|
|React-Icons|4.8.0|
|React-JS-Pagination|3.0.3|
|React-PDF|6.2.2|
|React-router|6.3.0|
|React-Router-DOM|6.10.0|
|Redux Toolkit|1.9.5|


<br/><br/><br/>
# 🎢 구현 기능
* 회원 기능
  * 회원가입
  * 로그인/로그아웃
  * 이메일 찾기, 임시 비밀번호 전송, 비밀번호 변경
  * 마이페이지
* 게시판 기능
  * 모든 게시글 및 특정회게시글 조회
  * 게시글 검색 (제목, 내용, 작성자)
  * 게시글 작성 및 첨부파일 업로드 [회원]
  * 게시글 수정 [회원, 게시글 작성자]
  * 게시글 삭제 [회원, 게시글 작성자]
* 댓글 기능
  * 댓글 조회
  * 댓글 작성 [회원]
  * 댓글 수정 [회원, 댓글 작성자]
  * 댓글 삭제 [회원, 댓글 작성자]
* 운영자 기능
  * 회원 정보 조회
  * 스테이지 정보 조회
<br/><br/><br/>  
  
  
# 🤙🏻 API 명세서
HTTP 메서드를 통해 행위를 명시할 수 있도록 RESTful 방식으로 설계했습니다. <br/><br/>

<img width="997" alt="api-definition" src="">
<br/><br/><br/>


# 🕸 ERD 설계
![gyemoimERD](https://github.com/kh-teamProject/gyemoim/assets/117277248/fd7a4970-6879-426f-8766-00a12bfe6b4d)
### 1) Member
<img width="1024" alt="gyemoimMemberERD" src="https://github.com/kh-teamProject/gyemoim/assets/117277248/2ec7347f-cbfa-4167-a894-2b2592e22a20">
<br/>

### 2) Board
<img width="1024" alt="gyemoimBoardERD" src="https://github.com/kh-teamProject/gyemoim/assets/117277248/cfffadca-8eb0-49e0-b6c3-87405b378788">
<br/>

### 3) Solution
<img width="1024" alt="gyemoimSolutionERD" src="https://github.com/kh-teamProject/gyemoim/assets/117277248/635ac549-e19c-4832-88bf-9d9aa7a34de2">
<br/><br/><br/>


# [프로젝트 수행 일정표 WBS](https://docs.google.com/spreadsheets/d/e/2PACX-1vRrqM36ijbuIGb2SEILdGGQ2E-CXSkyVRFJcyLrvE0kfDVzWHr1Sp140nQmISjqnw/pubhtml?gid=1857947579&single=true)

### 1주차
<img width="1024" alt="WBS_1Week" src="https://github.com/kh-teamProject/gyemoim/assets/117277248/e3f1d277-8de8-4fad-a2d1-02ab9af8c8ff"><br/>
<br/>

### 2주차
<img width="1024" alt="WBS_2Week" src="https://github.com/kh-teamProject/gyemoim/assets/117277248/33fe392f-b17d-4099-ab01-f38e54ad2e0b">
<br/>

### 3주차
<img width="1024" alt="WBS_3Week" src="https://github.com/kh-teamProject/gyemoim/assets/117277248/da6b7abf-9f28-4db0-b50c-9a98081b0836">
<br/><br/><br/>


# 👾 트러블슈팅
### 조회수 중복 카운팅 예방

게시글 조회수 중복 카운팅 예방을 위해 `read_history` 테이블을 두어 구현했다. 

`Cookie` 의 경우 하나의 도메인 당 사용할 수 있는 개수가 제한되기 때문에, 여러 게시글을 조회하면 제한 개수를 넘어버릴 것이라 예상했다. 그래서 사용자가 이미 읽은 게시글인지 확인할 수 있도록 서버에서 `사용자 아이디` `게시글` `조회 시간` 을 두어 체크했다.

https://github.com/khyunji99/Project_gyemoim/blob/70ab648ca6beefe8be1c391e70e099de7eab6549/src/main/java/com/team/gyemoim/controller/BoardController.java#L64-L81

조회수라는 데이터를 관리하지 않고 읽은 글, 읽지 않은 글 로 관리될 수 있도록 구현하는 방법 좋을 것 같다. 

