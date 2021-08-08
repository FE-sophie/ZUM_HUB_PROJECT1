import SubPage from '../components/SubPage.js';
import Main from '../components/Main.js';
import Header from '../components/Header.js';
import Detail from '../components/Detail.js';
import Best from '../components/Best.js';

import {
  getBestDataApi,
  getMainDataApi,
  getDataApi,
  postBookMarkApi,
} from '../modules/api/dataApi.js';
import appStore, {
  POST_BOOKMARK,
  GET_APP_VIEW,
  GET_SUB_VIEW,
  GET_DETAIL_VIEW,
} from '../store/appStore.js';

const { dispatch, subscribe, getState } = appStore;

const appRender = (type, path) => {
  let state = getState();
  const $app = document.querySelector('#app');

  if (type === 'home') {
    //초기 홈화면
    $app.innerHTML = Header(state) + Main(state) + Best(state);

    //헤더 네비게이션 이벤트 핸들링
    const $appNavBar = document.querySelector('.navBar');
    $appNavBar.addEventListener('click', ({ target }) => {
      if (!target.matches('li')) return;
      const pathName = target.getAttribute('route');

      historyRouterPush(pathName);

      //네비게시연 클릭시 active클래스 추가
      [...$appNavBar.children].forEach(el => el.classList.remove('active'));
      target.classList.add('active');
    });

    //로고 클릭시 이벤트
    const $logo = document.querySelector('.logo');
    historyRouterPush('/');

    $logo.addEventListener('click', e => {
      [...$appNavBar.children].forEach((el, i) => {
        if (!i) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    });
  } else {
    //노트 찾기
    const $header = document.querySelector('.header');
    const $main = document.querySelector('.main');
    const $sub = document.querySelector('.sub');
    const $best = document.querySelector('.best');

    //새 렌더링시 기존 html 요소 제거
    $main && $main.remove();
    $sub && $sub.remove();
    $best && $best.remove();

    //페이지에 따른 렌더링 구현
    if (type === 'sub') {
      $header.insertAdjacentHTML('afterend', SubPage(state, path));
    } else if (type === 'main') {
      $header.insertAdjacentHTML('afterend', Main(state) + Best(state));
    } else {
      $header.insertAdjacentHTML('afterend', Detail);
    }
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
      dispatch({ type: POST_BOOKMARK, payload: res });
    }),
  );
};

//윈도우 로드시 처리할 내용
window.onload = async () => {
  appRender('home');
  subscribe(GET_APP_VIEW, () => appRender('main'));
  subscribe(GET_DETAIL_VIEW, () => appRender('detail'));
};

//히스토리 함수
const historyRouterPush = async pathName => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  const path = pathName.replace('/', '').replace('#', '');
  if (!path) {
    appRender('main');
    return;
  } else {
    const data = await getDataApi(path, 'sub');
    if (path !== 'bookmark') {
      dispatch(
        {
          type: GET_SUB_VIEW,
          payload: { path, data: data },
        },
        path,
      );
    }
    appRender('sub', path);
  }
};
