<br>
<br>
<br>

# 👩‍💻 ZUM_HUB_PROJECT1 - 줌 프론트엔드 신입 과제

<br>
<br>
<br>


## 1. 줌허브 자바스크립트로 SPA 구현  프로젝트
줌허브 UI를 참고하여 자바스크립트로 SPA 구현하는 프로젝트입니다. 프론트엔드부분에서는 라이브러리 없이 Vanillar JavaScript로만 구현하였습니다. 메인페이지,서브페이지(라이프,푸드,여행,컬쳐),상세페이지로 구성되어있습니다. 즐겨찾기 버튼 기능이 추가되었고 무한스크롤,레이지 로딩을 통해 UX 개선 및 렌더링 최적화가 필요합니다. 백엔드는 express, cheerio(크롤링) 을 사용하여 구현하였습니다. 
<br>
<br>
<br>
<br>

## 2. 기술스택
- front-end
   - vanilla javascript
   - webpack
   - babel
- back-end
   - node.js
   - express.js

<br>
<br>

## 3. 기능적 요구사항

### (1) 메뉴

- HOME
- 라이프
- 푸드
- 여행
- 컬쳐
- 즐겨찾기

### (2) 메인페이지(Home)

- 라이프, 푸드, 여행, 컬처의 상위 4개 컨텐츠를 노출한다. (총 12개)
   - `썸네일` `타이틀` `설명` `매체사` `즐겨찾기 아이콘(★/☆)` 등이 보여져야 한다.
- 실시간 TOP 12
   - `순위` `제목` `매체사`  등이 보여져야 한다.

### (3) 서브페이지(라이프, 푸드, 여행, 컬쳐)

- 각 서브페이지에 대한 컨텐츠 보여주기
   - `썸네일` `타이틀` `설명` `매체사` `즐겨찾기 아이콘(★/☆)` 등이 보여져야 한다.
- 한 줄에 4개의 카드(콘텐츠)가 보여줘야 한다.
- 서브페이지 진입시 12개의 카드가 노출된다.
- 무한 스크롤 기능을 구한하여 최대 40개의 카드가 노출되도록 한다.

### (4) 상세페이지

- 메인페이지 및 서브페이지에서 카드를 클릭하면 상세페이지로 진입한다.
   - `타이틀` `매체사` `상세내용` 등이 보여져야 한다.
- 페이지 하단에 `목록` `즐겨찾기` 버튼이 존재한다.

### (5) 즐겨찾기 페이지

- 즐겨찾기로 지정된 컨텐츠가 보여진다.
- 제일 최근에 즐겨찾기한 순서대로 보여져야 한다.
<br>
<br>
<br>

## 4. 컨벤션 

- 네이밍규칙: Hungarian notation
- 컴포넌트 파일 이름 : Camel case


<br>
<br>
<br>

