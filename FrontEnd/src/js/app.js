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
    $app.innerHTML = Header(state) + Main(state) + Best(state);
    const $appNavBar = document.querySelector('.navBar');
    $appNavBar.addEventListener('click', ({ target }) => {
      if (!target.matches('li')) return;
      const pathName = target.getAttribute('route');
      const $main = document.querySelector('.main');
      historyRouterPush(pathName, $main);

      [...$appNavBar.children].forEach(el => el.classList.remove('active'));
      target.classList.add('active');
    });
    const $logo = document.querySelector('.logo');

    $logo.addEventListener('click', e => {
      window.history.pushState({}, '/', window.location.origin + '/');
      [...$appNavBar.children].forEach((el, i) => {
        if (!i) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    });
  } else {
    const $header = document.querySelector('.header');
    if (type === 'sub') {
      const $main = document.querySelector('.main');
      const $sub = document.querySelector('.sub');
      const $best = document.querySelector('.best');
      $main && $main.remove();
      $sub && $sub.remove();
      $best && $best.remove();
      $header.insertAdjacentHTML('afterend', SubPage(state, path));
    } else if (type === 'main') {
      $header.insertAdjacentHTML('afterend', Main(state) + Best(state));
    } else {
      $header.insertAdjacentHTML('afterend', Detail);
    }
  }
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

window.onload = async () => {
  appRender('home');

  subscribe(GET_APP_VIEW, () => appRender('main'));
  subscribe(GET_DETAIL_VIEW, () => appRender('detail'));
};

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
