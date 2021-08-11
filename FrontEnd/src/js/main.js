import appRender from './app.js';

import {
  getMainDataApi,
  getBestDataApi,
  getDataApi,
  getDetailApi,
} from '../modules/api/dataApi.js';

import appStore, {
  FINISH_LOADING,
  GET_LOADING,
  GET_APP_VIEW,
  GET_SUB_VIEW,
  GET_DETAIL_VIEW,
  NOT_FOUND,
} from '../store/appStore.js';

const { dispatch, subscribe, getState } = appStore;

//URL 변경 감지 함수
export const historyRouterPush = async (pathName, activeDetail) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);

  const path = pathName.replace('/', '').replace('#', '');

  //상세페이지
  if (path.includes('detail')) {
    dispatch({ type: GET_LOADING });
    appRender('loading', path);
    let url = path.replace('detail/', '').split('/');
    dispatch({
      type: GET_DETAIL_VIEW,
      payload: await getDetailApi(url),
    });
    //로딩 끝
    dispatch({ type: FINISH_LOADING });
    //렌더링
    appRender('detail', activeDetail);
  }
  //메인페이지
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

    //데이터 받아서 상태 업데이트
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
  }
  if (!path.includes('detail') && path) {
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
