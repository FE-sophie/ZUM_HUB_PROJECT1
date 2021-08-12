// import { getBestDataApi, getMainDataApi } from '../modules/api/dataApi.js';
import Store from './Store.js';

export const POST_BOOKMARK = 'ADD_BOOKMARK';
export const GET_APP_VIEW = 'GET_APP_VIEW';
export const GET_SUB_VIEW = 'GET_SUB_VIEW';
export const GET_DETAIL_VIEW = 'GET_DETAIL_VIEW';
export const GET_LOADING = 'GET_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';
export const NOT_FOUND = 'NOT_FOUND';
export const GET_HEADER = 'GET_HEADER';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case NOT_FOUND: {
      return { ...state, error: true };
    }
    case GET_HEADER: {
      const { path, page } = payload;
      return { ...state, path, page };
    }
    case GET_LOADING: {
      const { path, page } = payload;
      return { ...state, loading: true, error: false, path, page, detail: '' };
    }
    case FINISH_LOADING: {
      const { page } = payload;
      return { ...state, loading: false, error: false, page };
    }
    case POST_BOOKMARK: {
      let bookmark = JSON.parse(localStorage.getItem('bookmark'));
      return {
        ...state,
        sub: { ...state.sub, bookmark },
        error: false,
      };
    }
    case GET_APP_VIEW: {
      const { main, best, path } = payload;
      return { ...state, main, best, path, error: false };
    }
    case GET_SUB_VIEW: {
      const { path, data, count } = payload;
      return {
        ...state,
        sub: { ...state.sub, [path]: data, count },
        error: false,
        path,
      };
    }
    case GET_DETAIL_VIEW: {
      const { path, data } = payload;
      return { ...state, path, detail: data, error: false };
    }
    default:
      return state;
  }
};
const mainObj = { life: [], food: [], trip: [], culture: [] };

const initialState = {
  header: [
    { title: '홈', route: '/' },
    { title: '라이프', route: '#/life' },
    { title: '푸드', route: '#/food' },
    { title: '여행', route: '#/trip' },
    { title: '컬처', route: '#/culture' },
    { title: '즐겨찾기', route: '#/bookmark' },
  ],
  main: mainObj,
  sub: { life: [], food: [], trip: [], culture: [], bookmark: [], count: 0 },
  best: [],
  detail: '',
  error: false,
  loading: false,
  path: '',
  page: '',
};

const appStore = Store.createStore(initialState, reducer);

export default appStore;
