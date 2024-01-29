## 폴더구조

- 📦src
-  ┣ 📂component  // 컴포넌트 폴더
-  ┣ 📂hooks  // React-query 폴더 -> 이름Queries.tsx
-  ┣ 📂layout  // 기본 레이아웃 폴더 (네비게이션바)
-  ┣ 📂model  // 타입 폴더 -> 이름Types.txs
-  ┣ 📂pages  // 페이지 폴더
-  ┃ ┣ 📂HomePage  // 페이지이름 -> 이름Page.tsx
-  ┣ 📂recoil // recoil 파일
-  ┃ ┣ 📂atoms  // atom 파일 -> 이름AtomState.tsx
-  ┃ ┗ 📂selectors  // selectors 파일 -> 이름AtomSelector.tsx
-  ┗ 📂utils // util 관련 파일

## 커밋 규칙

- feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
- fix : 기능에 대한 버그 수정
- build : 빌드 관련 수정
- chore : 패키지 매니저 수정, 그 외 기타 수정 
- docs : 문서(주석) 수정
- style : 코드 스타일, 포맷팅에 대한 수정
- refactor : 기능의 변화가 아닌 코드 리팩터링
- release : 버전 릴리즈
- merge : 병합