<br>
<br>
<br>

# 👩‍💻 ZUM_HUB_PROJECT1 

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

- 함수 및 식별자 네이밍규칙: Camel case
- 컴포넌트 파일 이름 : PascalCase
<br>
<br>
<br>
## 5.고민해본 내용과 추후 고민해볼 내용 (작성중인 내용으로 추후 내용이 수정되거나 추가될 수 있습니다.)

1. Vanilla JavaScript로 SPA를 구현할 때 URL 처리는 어떻게 할 것인가?
    - hash(#) 방식과 PJAX 방식에 대한 선택을 고민했고 페이지에 대한 고유한 URL이 존재하여 history 관리가 가능하고 SEO 대응을 위해 PJAX 방식 선택
    - 새로 고침 시에 페이지에 대한 요청을 하고 서버에서는 content-type에 따라 index.html을 내려주고 이후에 json 데이터를 받거나 로컬스토리지에 저장된 데이터를 바탕으로
    페이지를 리렌더링하는 방식
2. 중복코드를 어떻게 하면 줄일 수 있나?
    - 식별자를 불필요하게 두 번 이상 선언한 경우 이를 확인하고 수정할 것 (피드백 받은 내용)
    - 컴포넌트 기반 설계 시 최대한 중복해서 사용하는 구성요소가 어떤 요소인가를 고민하여 구성 요소를 나누고 이렇게 나누어진 컴포넌트들을 합성하여 UI를 형성
    - 이벤트 위임을 사용해 상위요소에 이벤트핸들러 바인딩하여 하위요소의 이벤트를 캐치하게 함
    - 상속에 대해서 생각해볼 것 (피드백 받은 내용)
3. 데이터의 흐름
    - 상태 업데이트가 필요한 경우 이를 구현하는 과정에서 데이터가 이동하는 흐름이 단방향으로 흐르는지 확인해볼 것 (피드백 받은 내용)
<br>
<br>
<br>

