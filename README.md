# HONEY-BOX

## 1. 프로젝트 소개

- TMDB API를 활용한 영화 검색 사이트입니다.
- 영화, TV 프로그램, 인물을 탐색해볼 수 있습니다.
- 회원가입 밒 로그인 하여 원하는 영화 혹은 TV프로그램을 관심목록에 저장할 수 있습니다.
- 주된 기능으로는 회원가입, 로그인, 관심 목록, 검색 기능이 있습니다.
  <br><br>

## 2. 결과물

- 배포 사이트: [HONEY-BOX](https://honeybox.vercel.app)
  <br><br>

## 3. 기술 스택

<img src="https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=fff"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/zustand-6492FE?style=for-the-badge&logo=zulip&logoColor=white"> <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
<br><br>

## 4. 주요 기능

- intersection observer를 활용해 컨텐트가 보이면 화면에 나타나게 구현
- canvas를 활용한 평점 표시
- react-query와 intersection observer를 사용한 무한 스크롤 커스텀 훅
- 선택한 장르와 정렬 방법을 쿼리 스트링으로 적용
- 관심 목록 등록 기능(로그인 필요)
- 에러 등의 이유로 컨텐츠를 불러오지 못했을시 다시 시도(error.tsx, refetch 활용)
- next-auth를 활용한 세션 관리 및 소셜 로그인
- 회원가입 후 자동 로그인
- react-query를 활용한 데이터 캐싱
- react-query를 활용한 optimistic update(낙관적 업데이트)

## 5. 페이지별 기능

### 메인 페이지

- Trending 그리고 Popular한 컨텐츠와 예고편을 보여줌
- intersection observer를 활용해 컨텐트가 보이면 화면에 나타나게 구현
- canvas를 활용한 평점 표시

### Popular, Top Rated 영화 및 TV 페이지

- 유명하거나 평점 높은 컨텐츠를 보여줌
- 정렬 기능 구현(유명한 순, 최신 순, 평점 순)
- 장르에 따른 필터 기능 구현
- 선택한 장르와 정렬 방법을 쿼리 스트링으로 활용
- 무한 스크롤 적용

### 영화 밒 TV 상세 페이지

- 제목, 줄거리, 출연진 등 컨텐츠의 상세 정보를 보여줌
- canvas를 활용한 평점 표시
- 관심 목록 등록 가능(로그인 필요)

### Popular 인물 및 인물 상세 페이지

- 유명한 배우들을 보여줌
- 무한 스크롤 적용
- 배우의 이름 생년월일 등의 기본 정보를 보여줌
- 배우의 활동 정보를 년도 별로 정리

### 검색 페이지

- 키워드를 바탕으로 검색 결과를 보여줌
- 영화, TV, 인물 3가지 경우를 따로 적용

### 마이 페이지

- 본인 정보와 관심 목록으로 들옥한 컨텐츠를 보여줌
- 개봉 년도 및 평점에 따른 정렬 기능 구현
- 로그아웃 및 회원 탈퇴 가능

### 로그인 및 회원가입 페이지

- 회원가입 밒 로그인 하여 원하는 영화 혹은 TV프로그램을 관심목록에 등록 가능
- 소셜 로그인 가능(Google, Kakao, Github)
- 회원가입 후 자동 로그인 기능 구현
- callback url을 적용하여 로그인 후, 로그인 하기 전 페이지로 이동
