import SubPage from '../components/SubPage.js';
import Main from '../components/Main.js';
import Header from '../components/Header.js';
import Detail from '../components/Detail.js';
import Best from '../components/Best.js';
import Error from '../components/Error.js';
import Loading from '../components/Loading.js';
import appStore, {
  POST_BOOKMARK,
  GET_LOADING,
  GET_HEADER,
  GET_DETAIL_VIEW,
  GET_SUB_VIEW,
  GET_APP_VIEW,
  FINISH_LOADING,
} from '../store/appStore.js';
import { postBookMarkApi } from '../modules/api/dataApi.js';
const { dispatch, subscribe, getState } = appStore;
import { historyRouterPush } from './main.js';
const appRender = () => {
  //상태 불러오기
  let state = getState();

  //app 요소 찾기
  const $app = document.querySelector('#app');

  const $header = document.querySelector('.header');
  const $main = document.querySelector('.main');
  const $sub = document.querySelector('.sub');
  const $best = document.querySelector('.best');
  const $error = document.querySelector('.error');
  const $loading = document.querySelector('.loading');

  $main && $main.remove();
  $sub && $sub.remove();
  $best && $best.remove();
  $error && $Error.remove();

  if (state.page === 'loading' || state.page === 'header') {
    //app에 header 추가
    $app.innerHTML = Header(state);
    $loading && $loading.remove();
    //로딩 페이지 렌더링
    if (state.page === 'loading') {
      const $header = document.querySelector('.header');
      $header.insertAdjacentHTML('afterend', Loading(state));
    }
  } else {
    //메인 페이지 서브페이지 렌더링
    if (state.page === 'home' || state.page === 'sub') {
      // $sub && $sub.remove();
      if (!$loading) {
        state.page === 'home' && $header.insertAdjacentHTML('afterend', Main(state) + Best(state));
        state.page === 'sub' && $header.insertAdjacentHTML('afterend', SubPage(state));
      } else {
        //메인
        state.page === 'home' &&
          setTimeout(() => {
            $loading.remove();
            $header.insertAdjacentHTML('afterend', Main(state) + Best(state));
          }, 800);
        //서브
        state.page === 'sub' &&
          setTimeout(() => {
            $loading.remove();
            $header.insertAdjacentHTML('afterend', SubPage(state));
          }, 800);
      }
    }
    //디테일
    if (state.page === 'detail') {
      setTimeout(() => {
        $loading && $loading.remove();
        $header.insertAdjacentHTML('afterend', Detail(state));
      }, 800);
    }
    navigationHandler();
    articleEventHandler();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  subscribe(GET_LOADING, () => appRender());
  subscribe(GET_HEADER, () => appRender());
  subscribe(FINISH_LOADING, () => appRender());
  historyRouterPush(hash);
});
window.addEventListener('popstate', () => {
  //새로고침 발생시 해시 조회후 라우팅 변경(홈으로 이동x)
  const hash = window.location.hash;
  historyRouterPush(hash);
});

//이벤트 핸들러
const navigationHandler = () => {
  //네비게이션 메뉴 클릭시 url 변경
  const $appNavBar = document.querySelector('.navBar');
  $appNavBar.addEventListener('click', ({ target }) => {
    if (!target.matches('li')) return;
    const pathName = target.getAttribute('route');
    historyRouterPush(pathName);
  });

  //로고 클릭시 홈으로 이동 이벤트 핸들러 등록
  const $logo = document.querySelector('.logo');
  $logo.addEventListener('click', () => {
    historyRouterPush('/');
  });
};

const articleEventHandler = () => {
  const $article = document.querySelectorAll('.articleWrapper');
  [...$article].forEach(el => {
    el.addEventListener('click', async ({ target }) => {
      //상세페이지로 이동 이벤트 핸들러
      if (!target.matches('.bookmark>*')) {
        let pathName = target.parentNode.parentNode.getAttribute('route').split('/');
        pathName = pathName ? pathName : target.parentNode.getAttribute('route').split('/');
        historyRouterPush(`#/detail/${pathName[0]}/${pathName[1]}/${pathName[2]}`);
      }

      //북마크 이벤트 핸들러 등록
      if (target.matches('.bookmark>*')) {
        const id = target.parentNode.parentNode.id;
        const res = await postBookMarkApi(id.split('ID'));
        dispatch({ type: POST_BOOKMARK, payload: res });
      }
    });
  });
};

export default appRender;
