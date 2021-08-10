import SubPage from '../components/SubPage.js';
import Main from '../components/Main.js';
import Header from '../components/Header.js';
import Detail from '../components/Detail.js';
import Best from '../components/Best.js';
import Error from '../components/Error.js';
import Loading from '../components/Loading.js';
import appStore, { POST_BOOKMARK } from '../store/appStore.js';
import { postBookMarkApi } from '../modules/api/dataApi.js';
const { dispatch, subscribe, getState } = appStore;
import { historyRouterPush } from './main.js';
const appRender = (type, path) => {
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
  if (type === 'loading' || type === 'header') {
    $loading && $loading.remove();

    //app에 header 추가
    $app.innerHTML = Header(state, path);

    //로딩 페이지 렌더링
    if (type === 'loading') {
      const $header = document.querySelector('.header');
      $header.insertAdjacentHTML('afterend', Loading(state));
    }

    //네비게이션 버튼 클릭시 URL 변경 이벤트 핸들러 등록
    const $appNavBar = document.querySelector('.navBar');

    $appNavBar.addEventListener('click', ({ target }) => {
      if (!target.matches('li')) return;
      const pathName = target.getAttribute('route');
      historyRouterPush(pathName);
    });

    //로고 클릭시 홈으로 이동 이벤트 핸들러 등록
    const $logo = document.querySelector('.logo');

    $logo.addEventListener('click', e => {
      [...$appNavBar.children].forEach((el, i) => {
        if (!i) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
        historyRouterPush('/');
      });
    });
  }
  if (type === 'home') {
    //초기 홈화면
    if (!$loading) {
      $header.insertAdjacentHTML('afterend', Main(state) + Best(state));
    } else {
      setTimeout(() => {
        $loading.remove();
        $header.insertAdjacentHTML('afterend', Main(state) + Best(state));
      }, 800);
    }
  }
  if (type === 'sub') {
    if (!$loading) {
      $header.insertAdjacentHTML('afterend', SubPage(state, path));
    } else {
      setTimeout(() => {
        $loading.remove();
        $header.insertAdjacentHTML('afterend', SubPage(state, path));
      }, 800);
    }
  }
  if (type === 'home' || type === 'sub') {
    //북마크 이벤트 핸들러 등록
    const $bookmark = document.querySelectorAll('.bookmark');
    $bookmark.forEach(el =>
      el.addEventListener('click', async ({ target }) => {
        let id = '';
        if (!target.matches('.bookmark')) {
          id = target.parentNode.parentNode.id;
        } else {
          id = target.parentNode.id;
        }
        const res = await postBookMarkApi(id.split('ID'));
        console.log('요청결과', res);
        dispatch({ type: POST_BOOKMARK, payload: res });
      }),
    );
  }
  if (type === 'detail') {
    // $header.insertAdjacentHTML('afterend', Detail(state));
  }

  //북마크 이벤트 핸들러 등록
  const $bookmark = document.querySelectorAll('.bookmark');
  $bookmark.forEach(el =>
    el.addEventListener('click', async ({ target }) => {
      let id = '';
      if (!target.matches('.bookmark')) {
        id = target.parentNode.parentNode.id;
      } else {
        id = target.parentNode.id;
      }
      const res = await postBookMarkApi(id.split('ID'));
      console.log('요청결과', res);
      dispatch({ type: POST_BOOKMARK, payload: res });
    }),
  );
};

//윈도우 로드시 처리할 내용
window.onload = e => {
  //새로고침 발생시 해시 조회후 라우팅 변경(홈으로 이동x)
  const hash = window.location.hash;
  historyRouterPush(hash);
};
window.addEventListener('popstate', () => {
  //새로고침 발생시 해시 조회후 라우팅 변경(홈으로 이동x)
  const hash = window.location.hash;
  historyRouterPush(hash);
});

export default appRender;
