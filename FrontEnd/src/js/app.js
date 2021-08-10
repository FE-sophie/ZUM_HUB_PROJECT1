import SubPage from '../components/SubPage.js';
import Main from '../components/Main.js';
import Header from '../components/Header.js';
import Detail from '../components/Detail.js';
import Best from '../components/Best.js';
import Error from '../components/Error.js';
import Loading from '../components/Loading.js';

import {
  getMainDataApi,
  getBestDataApi,
  getDataApi,
  postBookMarkApi,
} from '../modules/api/dataApi.js';
import appStore, {
  FINISH_LOADING,
  GET_LOADING,
  POST_BOOKMARK,
  GET_APP_VIEW,
  GET_SUB_VIEW,
  GET_DETAIL_VIEW,
  NOT_FOUND,
} from '../store/appStore.js';

const { dispatch, subscribe, getState } = appStore;

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

//URL 변경 감지 함수
const historyRouterPush = async pathName => {
  window.history.pushState({}, pathName, window.location.origin + pathName);

  const path = pathName.replace('/', '').replace('#', '');
  if (!path) {
    //로딩 시작
    dispatch({ type: GET_LOADING });
    //로컬스토리지 데이터 조회

    let mainData = JSON.parse(localStorage.getItem('main')) || {};
    let bestData = JSON.parse(localStorage.getItem('best')) || [];
    if (!Object.keys(mainData).length) {
      appRender('loading', path);
      mainData = await getMainDataApi();
      bestData = await getBestDataApi();
      localStorage.setItem('main', JSON.stringify(mainData));
      localStorage.setItem('best', JSON.stringify(bestData));
    } else {
      appRender('header', path);
    }
    //데이터 받아서 상태 없데이트
    dispatch({
      type: GET_APP_VIEW,
      payload: {
        main: mainData,
        best: bestData,
      },
    });

    //로딩 끝
    dispatch({ type: FINISH_LOADING });

    //렌더링
    appRender('home', path);
  } else {
    //로컬스토리지 데이터 조회 없으면 빈배열 넘겨줌(에러방지)
    //북마크페이지 데이터는 로컬스토리지에서 조회
    let subData = JSON.parse(localStorage.getItem(path)) || [];

    //로딩 시작
    dispatch({ type: GET_LOADING });

    //로컬스토리지 데이터 조회 후 데이터 있으면 요청 방지
    if (subData.length) {
      appRender('header', path);
    } else {
      if (path !== 'bookmark') {
        appRender('loading', path);
        subData = await getDataApi(path, 'sub');
      } else {
        appRender('header', path);
      }
    }
    //무한 스크롤 구현을 위한 카운터 조회
    let { count } = getState().sub;

    // 데이터 업데이트 후 상태 업데이트
    dispatch(
      {
        type: GET_SUB_VIEW,
        payload: { path, data: subData.splice(count * 12, 12) || [], count: 0 },
      },
      path,
    );

    //로딩 끝
    dispatch({ type: FINISH_LOADING });

    //렌더링
    appRender('sub', path);
  }
};
