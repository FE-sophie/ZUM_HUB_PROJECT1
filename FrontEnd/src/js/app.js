import SubPage from '../components/SubPage.js';
import Main from '../components/Main.js';
import Header from '../components/Header.js';
import Detail from '../components/Detail.js';
import Best from '../components/Best.js';
import Error from '../components/Error.js';

import {
  getMainDataApi,
  getBestDataApi,
  getDataApi,
  postBookMarkApi,
} from '../modules/api/dataApi.js';
import appStore, {
  GET_LOADING,
  POST_BOOKMARK,
  GET_APP_VIEW,
  GET_SUB_VIEW,
  GET_DETAIL_VIEW,
  NOT_FOUND,
} from '../store/appStore.js';
import Loading from '../components/Loading.js';

const { dispatch, subscribe, getState } = appStore;

const appRender = (type, path) => {
  //상태 불러오기
  let state = getState();

  //app 요소 찾기
  const $app = document.querySelector('#app');

  //app에 header 추가
  $app.innerHTML = Header(state, path);

  const $header = document.querySelector('.header');

  const $main = document.querySelector('.main');
  const $sub = document.querySelector('.sub');
  const $best = document.querySelector('.best');
  const $loading = document.querySelector('.loading');
  const $error = document.querySelector('.error');

  $main && $main.remove();
  $sub && $sub.remove();
  $best && $best.remove();
  $loading && $loading.remove();
  $error && $Error.remove();

  if (type === 'home') {
    //초기 홈화면
    $app.insertAdjacentHTML('beforeend', Main(state) + Best(state));
  }
  //페이지에 따른 렌더링 구현
  else if (type === 'loading') {
    $header.insertAdjacentHTML('afterend', Loading(state));
  } else if (type === 'error') {
    $header.insertAdjacentHTML('afterend', Error(state));
  } else if (type === 'sub') {
    $header.insertAdjacentHTML('afterend', SubPage(state, path));
  } else {
    $header.insertAdjacentHTML('afterend', Detail(state));
  }

  //네비게이션 라우트 핸들링 이벤트핸들러
  const $appNavBar = document.querySelector('.navBar');
  $appNavBar.addEventListener('click', ({ target }) => {
    if (!target.matches('li')) return;
    const pathName = target.getAttribute('route');
    historyRouterPush(pathName);
  });

  //로고 클릭시 이벤트
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
// subscribe(GET_APP_VIEW, () => appRender('home', hash));

//   subscribe(GET_DETAIL_VIEW, () => appRender('detail', hash));
//   subscribe(NOT_FOUND, () => appRender('error', hash));

//윈도우 로드시 처리할 내용

window.onload = () => {
  const hash = window.location.hash;
  historyRouterPush(hash);
};

window.addEventListener('popstate', () => {
  const hash = window.location.hash;
  historyRouterPush(hash);
});

//히스토리 함수
const historyRouterPush = async pathName => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  const path = pathName.replace('/', '').replace('#', '');
  if (!path) {
    let mainData = JSON.parse(localStorage.getItem('main'));
    dispatch({
      type: GET_APP_VIEW,
      payload: {
        main: Object.keys(mainData).length ? mainData : await getMainDataApi(),
        best: await getBestDataApi(),
      },
    });
    appRender('home', path);
  } else {
    let subData = JSON.parse(localStorage.getItem(path)) || [];
    if (path !== 'bookmark') {
      !subData.length && (await getDataApi(path, 'sub'));
    }
    let { count } = getState().sub;
    dispatch(
      {
        type: GET_SUB_VIEW,
        payload: { path, data: subData.splice(count * 12, 12) || [], count: 0 },
      },
      path,
    );
    appRender('sub', path);
  }
};
